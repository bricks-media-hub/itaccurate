// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// const Globe = () => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     const mount = mountRef.current;
//     const scene = new THREE.Scene();

//     // Renderer
//     const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//     renderer.setSize(mount.clientWidth, mount.clientHeight);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     mount.appendChild(renderer.domElement);

//     // Camera
//     const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 1000);
//     camera.position.set(0, 0, 4);

//     // Controls
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableZoom = false;
//     controls.enablePan = false;
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.08;
//     controls.autoRotate = true;
//     controls.autoRotateSpeed = 1.2;
//     controls.minPolarAngle = Math.PI / 3;
//     controls.maxPolarAngle = Math.PI / 1.5;

//     // Lights
//     scene.add(new THREE.AmbientLight(0xffffff, 0.7));
//     const pointLight = new THREE.PointLight(0x00ffff, 1.5);
//     pointLight.position.set(5, 5, 5);
//     scene.add(pointLight);

//     // Globe Mesh
//     const globe = new THREE.Mesh(
//       new THREE.SphereGeometry(1.4, 64, 64), // Changed from 1.5 to 1.0
//       new THREE.MeshPhongMaterial({
//         color: 0x00ffff,
//         wireframe: true,
//         opacity: 0.15,
//         transparent: true,
//         shininess: 80
//       })
//     );
//     scene.add(globe);

//     // Dots (Glowing Points)
//     const dotCount = 1500;
//     const radius = 1.55; // Changed from 1.55 to 1.05
//     const dotGeometry = new THREE.BufferGeometry();
//     const positions = new Float32Array(dotCount * 3);
//     const colors = new Float32Array(dotCount * 3);

//     for (let i = 0; i < dotCount; i++) {
//       const theta = Math.random() * Math.PI * 2;
//       const phi = Math.acos(2 * Math.random() - 1);
//       const x = radius * Math.sin(phi) * Math.cos(theta);
//       const y = radius * Math.sin(phi) * Math.sin(theta);
//       const z = radius * Math.cos(phi);

//       positions.set([x, y, z], i * 3);
//       colors.set([0.2, 0.9, 1.0], i * 3); // cyan-like glow
//     }

//     dotGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
//     dotGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

//     const dotMaterial = new THREE.PointsMaterial({
//       size: 0.035,
//       vertexColors: true,
//       opacity: 0.9,
//       transparent: true,
//       sizeAttenuation: true,
//     });

//     const dots = new THREE.Points(dotGeometry, dotMaterial);
//     scene.add(dots);

//     // Render Loop
//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };
//     animate();

//     // Responsive Resize
//     const handleResize = () => {
//       const { clientWidth, clientHeight } = mount;
//       camera.aspect = clientWidth / clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(clientWidth, clientHeight);
//     };
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       mount.removeChild(renderer.domElement);
//     };
//   }, []);

//   return (
//     <div ref={mountRef} className="w-full h-full" />
//   );
// };

// export default Globe;


// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// const Globe = () => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     const mount = mountRef.current;
//     const scene = new THREE.Scene();

//     const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//     renderer.setSize(mount.clientWidth, mount.clientHeight);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     mount.appendChild(renderer.domElement);

//     const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 1000);
//     camera.position.set(0, 0, 5);

//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableZoom = false;
//     controls.enablePan = false;
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.1;
//     controls.autoRotate = true;
//     controls.autoRotateSpeed = 1.5;

//     // Lighting
//     scene.add(new THREE.AmbientLight(0xffffff, 0.5));
//     const directionalLight = new THREE.DirectionalLight(0x00ffff, 1);
//     directionalLight.position.set(5, 3, 5);
//     scene.add(directionalLight);

//     // Globe
//     const globe = new THREE.Mesh(
//       new THREE.SphereGeometry(1.5, 64, 64),
//       new THREE.MeshPhongMaterial({
//         color: 0x111111,
//         shininess: 10,
//         transparent: false,
//       })
//     );
//     scene.add(globe);

//     // Dots (Cities)
//     const dotCount = 300;
//     const dotPositions = [];
//     const dotGeometry = new THREE.BufferGeometry();
//     const positions = new Float32Array(dotCount * 3);
//     const colors = new Float32Array(dotCount * 3);
//     const radius = 1.52;

//     for (let i = 0; i < dotCount; i++) {
//       const theta = Math.random() * 2 * Math.PI;
//       const phi = Math.acos(2 * Math.random() - 1);
//       const x = radius * Math.sin(phi) * Math.cos(theta);
//       const y = radius * Math.sin(phi) * Math.sin(theta);
//       const z = radius * Math.cos(phi);

//       dotPositions.push(new THREE.Vector3(x, y, z));
//       positions.set([x, y, z], i * 3);
//       colors.set([0.1, 1.0, 1.0], i * 3);
//     }

//     dotGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
//     dotGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

//     const dotMaterial = new THREE.PointsMaterial({
//       size: 0.05,
//       vertexColors: true,
//       transparent: true,
//       opacity: 0.9
//     });

//     const dots = new THREE.Points(dotGeometry, dotMaterial);
//     scene.add(dots);

//     // Animated Curved Arcs
//     const arcCount = 40;
//     const arcs = [];

//     for (let i = 0; i < arcCount; i++) {
//       const start = dotPositions[Math.floor(Math.random() * dotCount)];
//       const end = dotPositions[Math.floor(Math.random() * dotCount)];

//       const control = start.clone().add(end).multiplyScalar(0.5);
//       control.normalize().multiplyScalar(2.2); // Curve above surface

//       const curve = new THREE.QuadraticBezierCurve3(start, control, end);
//       const curvePoints = curve.getPoints(50);
//       const curveGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);

//       const lineMaterial = new THREE.LineBasicMaterial({
//         color: 0x00ffff,
//         transparent: true,
//         opacity: 0.3,
//       });

//       const line = new THREE.Line(curveGeometry, lineMaterial);
//       scene.add(line);
//       arcs.push({ curve, progress: 0, speed: 0.004 + Math.random() * 0.003 });
//     }

//     // Glow
//     const glowGeometry = new THREE.SphereGeometry(1.7, 64, 64);
//     const glowMaterial = new THREE.MeshBasicMaterial({
//       color: 0x00ffff,
//       transparent: true,
//       opacity: 0.07,
//       side: THREE.BackSide
//     });
//     const glow = new THREE.Mesh(glowGeometry, glowMaterial);
//     scene.add(glow);

//     // Animation
//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();

//       // Animate arcs
//       arcs.forEach(({ curve, progress, speed }, i) => {
//         progress += speed;
//         if (progress > 1) {
//           progress = 0;
//         }

//         const points = [];
//         const maxSegments = 50;
//         const visibleSegments = Math.floor(progress * maxSegments);

//         for (let j = 0; j < visibleSegments; j++) {
//           points.push(curve.getPoint(j / maxSegments));
//         }

//         const geom = new THREE.BufferGeometry().setFromPoints(points);
//         scene.children = scene.children.filter(obj => !(obj.userData.arc && obj.userData.id === i));

//         const material = new THREE.LineBasicMaterial({ color: 0x00ffff, opacity: 0.6, transparent: true });
//         const line = new THREE.Line(geom, material);
//         line.userData = { arc: true, id: i };
//         scene.add(line);

//         arcs[i].progress = progress;
//       });

//       // Glow pulse
//       const t = Date.now() * 0.001;
//       glow.scale.setScalar(1 + Math.sin(t * 0.5) * 0.05);

//       renderer.render(scene, camera);
//     };

//     animate();

//     const handleResize = () => {
//       const { clientWidth, clientHeight } = mount;
//       camera.aspect = clientWidth / clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(clientWidth, clientHeight);
//     };
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       mount.removeChild(renderer.domElement);
//     };
//   }, []);

//   return <div ref={mountRef} className="w-full h-full" />;
// };

// export default Globe;



import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { isMobile } from 'react-device-detect';

const courseLogos = [
    { name: "SAP", texturePath: "/icons/sap.svg" },
    { name: "Data Analytics", texturePath: "/icons/data-analytics.svg" },
    { name: "DevOps", texturePath: "/icons/devops.svg" },
    { name: "Full Stack Development", texturePath: "/icons/fullstack.svg" },
    { name: "Data Science", texturePath: "/icons/data-science.svg" },
    { name: "AWS", texturePath: "/icons/aws.svg" },
    { name: "Data Engineering", texturePath: "/icons/data-engineer.svg" },
    { name: "Salesforce", texturePath: "/icons/salesforce.svg" },
    { name: "Business Analytics", texturePath: "/icons/business-analytics.svg" },
    { name: "HR Management", texturePath: "/icons/hr-manage.svg" },
    // { name: "Python", texturePath: "/icons/python.svg" },
    { name: "Service Now", texturePath: "/icons/service.svg" },
    { name: "Share", texturePath: "/icons/share.svg" },
    { name: "MERN Stack", texturePath: "/icons/mern-stack.png" },
    { name: "Java Full Stack", texturePath: "/icons/java-fullstack.png" },
    { name: "Python Full Stack", texturePath: "/icons/python-fullstack.png" },
];

const Globe = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(3, 2, 5);
    scene.add(directionalLight);

    // Globe
    const globeRadius = isMobile ? 1.8 : 1.4;
    const globe = new THREE.Mesh(
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
    scene.add(globe);

    // Optional Wireframe
    const wireframe = new THREE.Mesh(
      new THREE.SphereGeometry(globeRadius + 0.002, 64, 64),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        opacity: 0.08,
        transparent: true
      })
    );
    scene.add(wireframe);

    // Glow
    const glowGeometry = new THREE.SphereGeometry(globeRadius + 0.3, 64, 64);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.07,
      side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // City Dots
    const dotCount = 300;
    const dotPositions = [];
    const dotGeometry = new THREE.BufferGeometry();
    const dotPositionAttr = new Float32Array(dotCount * 3);
    const dotColorAttr = new Float32Array(dotCount * 3);

    for (let i = 0; i < dotCount; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = (globeRadius + 0.02) * Math.sin(phi) * Math.cos(theta);
      const y = (globeRadius + 0.02) * Math.sin(phi) * Math.sin(theta);
      const z = (globeRadius + 0.02) * Math.cos(phi);
      dotPositions.push(new THREE.Vector3(x, y, z));
      dotPositionAttr.set([x, y, z], i * 3);
      dotColorAttr.set([0.1, 1.0, 1.0], i * 3);
    }

    dotGeometry.setAttribute('position', new THREE.BufferAttribute(dotPositionAttr, 3));
    dotGeometry.setAttribute('color', new THREE.BufferAttribute(dotColorAttr, 3));

    const dotMaterial = new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.9 });
    const dots = new THREE.Points(dotGeometry, dotMaterial);
    scene.add(dots);

    // Curved Arcs
    const arcCount = 40;
    const arcs = [];

    for (let i = 0; i < arcCount; i++) {
      const start = dotPositions[Math.floor(Math.random() * dotCount)];
      const end = dotPositions[Math.floor(Math.random() * dotCount)];
      const control = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(globeRadius * 1.4);
      const curve = new THREE.QuadraticBezierCurve3(start, control, end);
      arcs.push({ curve, progress: 0, speed: 0.004 + Math.random() * 0.003 });
    }

    // Satellite Course Logos
    const logoSprites = [];
    const textureLoader = new THREE.TextureLoader();
    courseLogos.forEach((logo, i) => {
      const tex = textureLoader.load(logo.texturePath);
      const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(0.4, 0.4, 0.4);
      sprite.userData.angle = (i / courseLogos.length) * Math.PI * 2;
      sprite.userData.orbitRadius = globeRadius + 0.7;
      logoSprites.push(sprite);
      scene.add(sprite);
    });

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      // Animate arcs
      arcs.forEach((arc, i) => {
        arc.progress += arc.speed;
        if (arc.progress > 1) arc.progress = 0;
        const points = [];
        const visibleSegments = Math.floor(arc.progress * 50);
        for (let j = 0; j < visibleSegments; j++) {
          points.push(arc.curve.getPoint(j / 50));
        }
        const geom = new THREE.BufferGeometry().setFromPoints(points);
        scene.children = scene.children.filter(obj => !(obj.userData.arc && obj.userData.id === i));
        const material = new THREE.LineBasicMaterial({ color: 0x00ffff, opacity: 0.6, transparent: true });
        const line = new THREE.Line(geom, material);
        line.userData = { arc: true, id: i };
        scene.add(line);
      });

      // Animate logos
      logoSprites.forEach(sprite => {
        sprite.userData.angle += 0.01 * controls.autoRotateSpeed;
        const angle = sprite.userData.angle;
        const radius = sprite.userData.orbitRadius;
        sprite.position.set(
          radius * Math.cos(angle),
          0,
          radius * Math.sin(angle)
        );
      });

      // Glow pulse
      const t = Date.now() * 0.001;
      glow.scale.setScalar(1 + Math.sin(t * 0.5) * 0.05);

      renderer.render(scene, camera);
    };

    animate();

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

  return <div ref={mountRef} className="w-full h-full" />;
};

export default Globe;


