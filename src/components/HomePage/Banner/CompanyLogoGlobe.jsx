import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CompanyLogoGlobe = () => {
  const mountRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const companyLogos = [
    { name: "React", logoPath: "/globeLogos/react.png" },
    { name: "HTML5", logoPath: "/icons/html.svg" },
    { name: "AWS", logoPath: "/globeLogos/aws-colorpng.png" },
    { name: "C", logoPath: "/globeLogos/c.png" },
    { name: "C++", logoPath: "/globeLogos/cpp.png" },
    { name: "MySQL", logoPath: "/globeLogos/mysql.png" },
    { name: "Kubernetes", logoPath: "/globeLogos/kubernates.png" },
    { name: "Docker", logoPath: "/globeLogos/docker.png" },
    { name: "Node.js", logoPath: "/globeLogos/nodejs.png" },
    { name: "Express", logoPath: "/globeLogos/express.png" },
    { name: "Java", logoPath: "/globeLogos/java.png" },
    { name: ".NET", logoPath: "/globeLogos/dotnet.png" },
    { name: "C#", logoPath: "/globeLogos/csharp.png" },
    { name: "Python Full Stack", logoPath: "/icons/python-fullstack.png" },
    { name: "ASP.NET", logoPath: "/globeLogos/aspnet.png" },
    { name: "JavaScript", logoPath: "/globeLogos/javascript.png" },
    { name: "CSS3", logoPath: "/globeLogos/css.png" },
    { name: "GitHub", logoPath: "/globeLogos/github.png" },
    { name: "AI", logoPath: "/globeLogos/ai.png" },
    { name: "Excel", logoPath: "/globeLogos/excel.png" },
    { name: "DevOps", logoPath: "/globeLogos/devops.png" },
    { name: "Bootstrap", logoPath: "/globeLogos/bootstrap.png" },
    { name: "Django", logoPath: "/globeLogos/django.png" },
    { name: "Spring", logoPath: "/globeLogos/spring.png" },
    { name: "Hibernate", logoPath: "/globeLogos/hibernate.png" },
    { name: "Tableau", logoPath: "/globeLogos/tableau.png" },
  ];

  // globe size and logos on it
  const globeRadius = isMobile ? 1.1 : 1.3;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    let scene, renderer, camera, controls, globe, wireframe, logoGroup;
    let animationFrameId;

    // const initScene = () => {
    //   // scene + renderer
    //   scene = new THREE.Scene();
    //   renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    //   renderer.setClearColor(0x000000, 0);
    //   renderer.setSize(mount.clientWidth, mount.clientHeight);
    //   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    //   mount.appendChild(renderer.domElement);

    //   camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    //   camera.position.set(0, 0, isMobile ? 5 : 4);

    //   controls = new OrbitControls(camera, renderer.domElement);
    //   controls.enableZoom = false;
    //   controls.enablePan = false;
    //   controls.enableDamping = true;
    //   controls.dampingFactor = 0.08;
    //   controls.autoRotate = true;
    //   controls.autoRotateSpeed = isMobile ? 0.8 : 1.2;
    //   controls.minPolarAngle = 0;
    //   controls.maxPolarAngle = Math.PI ;
    //   controls.minAzimuthAngle = -Infinity;
    //   controls.maxAzimuthAngle =  Infinity;

    //   // lights
    //   scene.add(new THREE.AmbientLight(0xffffff, 0.9));

    //   // globe
    //   globe = new THREE.Mesh(
    //     new THREE.SphereGeometry(globeRadius, 64, 64),
    //     new THREE.MeshStandardMaterial({
    //       color: "#6C63FF",
    //       emissive: "#a5b4fc",
    //       emissiveIntensity: 0.4,
    //       roughness: 0.3,
    //       metalness: 0.5,
    //       transparent: true,
    //       opacity: 0.95,
    //     })
    //   );
    //   scene.add(globe);

    //   // optional wireframe
    //   wireframe = new THREE.Mesh(
    //     new THREE.SphereGeometry(globeRadius + 0.002, 64, 64),
    //     new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, opacity: 0.08, transparent: true })
    //   );
    //   scene.add(wireframe);

    //   // group for logos
    //   logoGroup = new THREE.Group();
    //   scene.add(logoGroup);
    // };

    const initScene = () => {
      // scene + renderer
      scene = new THREE.Scene();
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setClearColor(0x000000, 0);
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true; // Enable shadows
      renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Better quality shadows
      mount.appendChild(renderer.domElement);

      camera = new THREE.PerspectiveCamera(
        50,
        mount.clientWidth / mount.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, isMobile ? 5 : 4);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.autoRotate = true;
      controls.autoRotateSpeed = isMobile ? 0.8 : 1.2;
      controls.minPolarAngle = 0;
      controls.maxPolarAngle = Math.PI;
      controls.minAzimuthAngle = -Infinity;
      controls.maxAzimuthAngle = Infinity;

      // Enhanced lighting setup
      // Ambient light (soft overall illumination)
      scene.add(new THREE.AmbientLight(0xffffff, 0.5));

      // Hemisphere light (sky/ground lighting)
      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
      hemiLight.position.set(0, 1, 0);
      scene.add(hemiLight);

      // Directional light (main key light)
      const dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.position.set(5, 5, 5);
      dirLight.castShadow = true;
      dirLight.shadow.mapSize.width = 1024;
      dirLight.shadow.mapSize.height = 1024;
      dirLight.shadow.camera.near = 0.1;
      dirLight.shadow.camera.far = 20;
      scene.add(dirLight);

      // Point light (for rim/edge lighting)
      const pointLight = new THREE.PointLight(0xa5b4fc, 0.8, 10);
      pointLight.position.set(-3, -2, -4);
      scene.add(pointLight);

      // Another point light for additional highlights
      const pointLight2 = new THREE.PointLight(0x6c63ff, 0.5, 8);
      pointLight2.position.set(3, 1, 2);
      scene.add(pointLight2);

      // globe
      globe = new THREE.Mesh(
        new THREE.SphereGeometry(globeRadius, 64, 64),
        new THREE.MeshStandardMaterial({
          color: "#6C63FF",
          emissive: "#a5b4fc",
          emissiveIntensity: 0.4,
          roughness: 0.3,
          metalness: 0.5,
          transparent: true,
          opacity: 0.95,
        })
      );
      globe.castShadow = true; // Enable shadow casting
      globe.receiveShadow = true; // Enable shadow receiving
      scene.add(globe);

      // optional wireframe with glow effect
      wireframe = new THREE.Mesh(
        new THREE.SphereGeometry(globeRadius + 0.002, 64, 64),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
          opacity: 0.15,
          transparent: true,
        })
      );
      scene.add(wireframe);

      // Add a subtle glow effect around the globe
      const glowGeometry = new THREE.SphereGeometry(globeRadius + 0.05, 64, 64);
      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          glowColor: { type: "c", value: new THREE.Color(0xa5b4fc) },
          viewVector: { type: "v3", value: camera.position },
        },
        fragmentShader: `
      uniform vec3 glowColor;
      varying float intensity;
      void main() {
        vec3 glow = glowColor * intensity;
        gl_FragColor = vec4(glow, 0.3);
      }
    `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      scene.add(glow);

      // group for logos
      logoGroup = new THREE.Group();
      scene.add(logoGroup);
    };

    const createTexture = (path) => {
      const loader = new THREE.TextureLoader();
      const texture = loader.load(path);
      texture.encoding = THREE.sRGBEncoding;
      // maintain crisp quality
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      return texture;
    };

    const placeLogos = () => {
      const total = companyLogos.length;
      const radius = globeRadius;
      const size = isMobile ? 0.45 : 0.4;
      const offset = size * 0.6; // push out beyond sphere

      for (let i = 0; i < total; i++) {
        const { name, logoPath } = companyLogos[i];
        const phi = Math.acos(-1 + (2 * i) / total);
        const theta = Math.sqrt(total * Math.PI) * phi;
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        const texture = createTexture(logoPath);
        const geom = new THREE.PlaneGeometry(size, size * 0.8);
        const mat = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide,
        });
        const logo = new THREE.Mesh(geom, mat);

        // compute position so it never clips inside globe
        const normal = new THREE.Vector3(x, y, z).normalize();
        logo.position.copy(normal.multiplyScalar(radius + offset));

        // make face camera upright
        logo.userData.up = new THREE.Vector3(0, 1, 0);
        logo.lookAt(camera.position);
        logo.up.copy(logo.userData.up);

        logoGroup.add(logo);
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      // keep logos facing camera
      logoGroup.children.forEach((logo) => {
        logo.lookAt(camera.position);
        logo.up.copy(logo.userData.up);
      });
      renderer.render(scene, camera);
    };

    // resize handler
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    initScene();
    placeLogos();
    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (mount.contains(renderer.domElement))
        mount.removeChild(renderer.domElement);
      scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material))
            obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, [isMobile]);

  return (
    <div
      ref={mountRef}
      className="w-full h-[400px] md:h-[500px] bg-transparent md:-mt-3 -mt-8"
    />
  );
};

export default CompanyLogoGlobe;
