import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Globe = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // Camera
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 4);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
    controls.minPolarAngle = Math.PI / 3;
    controls.maxPolarAngle = Math.PI / 1.5;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const pointLight = new THREE.PointLight(0x00ffff, 1.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Globe Mesh
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(1.4, 64, 64), // Changed from 1.5 to 1.0
      new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        wireframe: true,
        opacity: 0.15,
        transparent: true,
        shininess: 80
      })
    );
    scene.add(globe);

    // Dots (Glowing Points)
    const dotCount = 1500;
    const radius = 1.55; // Changed from 1.55 to 1.05
    const dotGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(dotCount * 3);
    const colors = new Float32Array(dotCount * 3);

    for (let i = 0; i < dotCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions.set([x, y, z], i * 3);
      colors.set([0.2, 0.9, 1.0], i * 3); // cyan-like glow
    }

    dotGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    dotGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const dotMaterial = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      opacity: 0.9,
      transparent: true,
      sizeAttenuation: true,
    });

    const dots = new THREE.Points(dotGeometry, dotMaterial);
    scene.add(dots);

    // Render Loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Responsive Resize
    const handleResize = () => {
      const { clientWidth, clientHeight } = mount;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} className="w-full h-full" />
  );
};

export default Globe;