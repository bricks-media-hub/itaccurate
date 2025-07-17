import React, { useEffect, useRef, useState, useMemo } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

extend({ ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

export function Globe({ globeConfig, data }) {
  const globeRef = useRef(null);
  const groupRef = useRef();
  const [isInitialized, setIsInitialized] = useState(false);

  const defaultProps = useMemo(() => ({
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  }), [globeConfig]);

  useEffect(() => {
    if (!groupRef.current) return;
    
    globeRef.current = new ThreeGlobe();
    groupRef.current.add(globeRef.current);
    setIsInitialized(true);

    return () => {
      if (groupRef.current && globeRef.current) {
        groupRef.current.remove(globeRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    const globeMaterial = globeRef.current.globeMaterial();
    globeMaterial.color = new Color(defaultProps.globeColor);
    globeMaterial.emissive = new Color(defaultProps.emissive);
    globeMaterial.emissiveIntensity = defaultProps.emissiveIntensity;
    globeMaterial.shininess = defaultProps.shininess;
  }, [isInitialized, defaultProps]);

  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    const points = data.flatMap(arc => [
      { size: defaultProps.pointSize, order: arc.order, color: arc.color, lat: arc.startLat, lng: arc.startLng },
      { size: defaultProps.pointSize, order: arc.order, color: arc.color, lat: arc.endLat, lng: arc.endLng }
    ]);

    const uniquePoints = points.filter((point, index, self) =>
      index === self.findIndex(p => 
        p.lat === point.lat && p.lng === point.lng
      )
    );

    // REMOVED hexPolygonsData since we don't have globe.json
    globeRef.current
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude);

    globeRef.current
      .arcsData(data)
      .arcStartLat(d => d.startLat)
      .arcStartLng(d => d.startLng)
      .arcEndLat(d => d.endLat)
      .arcEndLng(d => d.endLng)
      .arcColor(d => d.color)
      .arcAltitude(d => d.arcAlt || 0.1)
      .arcStroke(() => 0.32)
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap(d => d.order)
      .arcDashGap(15)
      .arcDashAnimateTime(defaultProps.arcTime);

    globeRef.current
      .pointsData(uniquePoints)
      .pointColor(d => d.color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(defaultProps.pointSize);

    globeRef.current
      .ringsData([])
      .ringColor(() => defaultProps.polygonColor)
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings
      );
  }, [isInitialized, data, defaultProps]);

  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    const interval = setInterval(() => {
      if (!data.length) return;
      
      const ringCount = Math.min(5, Math.floor(data.length / 2));
      const indices = Array.from({ length: data.length }, (_, i) => i);
      
      const ringsData = [];
      for (let i = 0; i < ringCount; i++) {
        const randomIndex = Math.floor(Math.random() * indices.length);
        const arc = data[indices[randomIndex]];
        ringsData.push({
          lat: arc.startLat,
          lng: arc.startLng,
          color: arc.color,
        });
        indices.splice(randomIndex, 1);
      }

      globeRef.current.ringsData(ringsData);
    }, 2000);

    return () => clearInterval(interval);
  }, [isInitialized, data]);

  return <group ref={groupRef} />;
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(new Color(0x000000), 0);
  }, [gl, size]);

  return null;
}

export function World({ globeConfig, data }) {
  // Memoize camera to prevent unnecessary re-creations
  const camera = useMemo(() => {
    const cam = new PerspectiveCamera(50, aspect, 180, 1800);
    cam.position.z = cameraZ;
    return cam;
  }, []);

  return (
    <Canvas>
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-200, 500, 200)}
      />
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <Globe globeConfig={globeConfig} data={data} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotateSpeed={globeConfig.autoRotateSpeed || 0.5}
        autoRotate={globeConfig.autoRotate !== false}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}

// Utility functions (no need to export)
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}