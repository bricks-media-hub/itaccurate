import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const CompanyLogoGlobe = () => {
  const mountRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const companyLogos = [
    { name: 'TCS', logoPath: '/logos/tcs.svg' },
    { name: 'Infosys', logoPath: '/logos/infosys.svg' },
    { name: 'Accenture', logoPath: '/logos/accenture.svg' },
    { name: 'EY', logoPath: '/logos/ey.svg' },
    { name: 'Wipro', logoPath: '/logos/wipro.svg' },
    { name: 'IBM', logoPath: '/logos/ibm.svg' },
    { name: 'Google', logoPath: '/logos/google.svg' },
    { name: 'TCS', logoPath: '/logos/tcs.png' },
    { name: 'Infosys', logoPath: '/logos/infosys.png' },
    { name: 'Accenture', logoPath: '/logos/accenture.png' },
    { name: 'EY', logoPath: '/logos/ey.png' },
    { name: 'Wipro', logoPath: '/logos/wipro.png' },
    { name: 'IBM', logoPath: '/logos/ibm.png' },
    { name: 'Google', logoPath: '/logos/google.png' },
  ];

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    let scene, renderer, camera, controls, globe, wireframe, logoGroup;
    let animationFrameId;

    const initScene = () => {
      // Scene
      scene = new THREE.Scene();

      // Renderer
      renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);

      // Camera
      camera = new THREE.PerspectiveCamera(
        50, 
        mount.clientWidth / mount.clientHeight, 
        0.1, 
        1000
      );
      camera.position.set(0, 0, isMobile ? 5 : 4);

      // Controls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = isMobile ? false : false;
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.autoRotate = true;
      controls.autoRotateSpeed = isMobile ? 0.8 : 1.2;
      controls.minPolarAngle = Math.PI / 3;
      controls.maxPolarAngle = Math.PI / 1.5;

      // Lighting
      scene.add(new THREE.AmbientLight(0xffffff, 0.9));
      const pointLight = new THREE.PointLight(0xffffff, 2);
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);
      scene.add(new THREE.AmbientLight(0xffffff, 0.3));

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 3, 5);
      scene.add(directionalLight);

      // Globe
      globe = new THREE.Mesh(
        new THREE.SphereGeometry(isMobile ? 1.8 : 1.4, 64, 64),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color('#6C63FF'),
          emissive: new THREE.Color('#a5b4fc'),
          emissiveIntensity: 0.4,
          roughness: 0.3,
          metalness: 0.5,
          transparent: true,
          opacity: 0.95,
        })
      );
      scene.add(globe);

      // Wireframe
      wireframe = new THREE.Mesh(
        new THREE.SphereGeometry((isMobile ? 1.8 : 1.4) + 0.001, 64, 64),
        new THREE.MeshBasicMaterial({
          color: '#ffffff',
          wireframe: true,
          transparent: true,
          opacity: 0.08,
          depthWrite: false,
        })
      );
      scene.add(wireframe);

      // Logo Group
      logoGroup = new THREE.Group();
      scene.add(logoGroup);
    };

    const createTexture = async (svgPath, name) => {
      return new Promise((resolve) => {
        const loader = new THREE.TextureLoader();
        loader.load(
          svgPath,
          (texture) => {
            texture.encoding = THREE.sRGBEncoding;
            resolve(texture);
          },
          undefined,
          () => {
            // Fallback if image fails to load
            const canvas = document.createElement('canvas');
            canvas.width = isMobile ? 128 : 256;
            canvas.height = isMobile ? 64 : 128;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#000000cc';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = `bold ${isMobile ? 16 : 24}px Arial`;
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'center';
            ctx.fillText(name, canvas.width / 2, canvas.height / 2 + (isMobile ? 5 : 10));
            const texture = new THREE.CanvasTexture(canvas);
            texture.encoding = THREE.sRGBEncoding;
            resolve(texture);
          }
        );
      });
    };

    const placeLogos = async () => {
      const totalLogos = isMobile ? 20 : 30;
      const radius = isMobile ? 1.8 : 1.4;
      const logoSize = isMobile ? 0.35 : 0.45;

      for (let i = 0; i < totalLogos; i++) {
        const company = companyLogos[i % companyLogos.length];
        const phi = Math.acos(-1 + (2 * i) / totalLogos);
        const theta = Math.sqrt(totalLogos * Math.PI) * phi;

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        const texture = await createTexture(company.logoPath, company.name);
        
        const geometry = new THREE.BoxGeometry(
          logoSize, 
          logoSize * 0.5, 
          0.05
        );
        
        const materials = [
          new THREE.MeshBasicMaterial({ color: 0x222222 }),
          new THREE.MeshBasicMaterial({ color: 0x222222 }),
          new THREE.MeshBasicMaterial({ color: 0x333333 }),
          new THREE.MeshBasicMaterial({ color: 0x333333 }),
          new THREE.MeshBasicMaterial({ 
            map: texture, 
            transparent: true,
            opacity: 1
          }),
          new THREE.MeshBasicMaterial({ color: 0x111111 }),
        ];

        const card = new THREE.Mesh(geometry, materials);
        const offset = isMobile ? 0.15 : 0.18;
        const pos = new THREE.Vector3(x, y, z)
          .normalize()
          .multiplyScalar(radius + offset);
        card.position.copy(pos);
        card.lookAt(new THREE.Vector3(0, 0, 0));
        logoGroup.add(card);
      }
    };

    // Raycasting for hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hovered = null;

    const onMouseMove = (event) => {
      if (isMobile) return;
      
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onTouchMove = (event) => {
      if (!isMobile) return;
      
      event.preventDefault();
      const touch = event.touches[0];
      mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: false });

    // Animation
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();

      // Raycasting for hover effects
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(logoGroup.children);

      if (intersects.length > 0) {
        if (hovered !== intersects[0].object) {
          if (hovered) hovered.scale.set(1, 1, 1);
          hovered = intersects[0].object;
          hovered.scale.set(1.2, 1.2, 1.2);
        }
      } else if (hovered) {
        hovered.scale.set(1, 1, 1);
        hovered = null;
      }

      // Make logos face camera
      if (logoGroup) {
        logoGroup.children.forEach((child) => {
          child.lookAt(camera.position);
        });
      }

      renderer.render(scene, camera);
    };

    const onResize = () => {
      const { clientWidth, clientHeight } = mount;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Initialize everything
    initScene();
    placeLogos().then(() => {
      animate();
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      if (mount && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      // Dispose of Three.js objects
      if (scene) {
        scene.traverse((object) => {
          if (object.isMesh) {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });
      }
    };
  }, [isMobile]);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-[400px] md:h-[500px] bg-transparent"
    />
  );
};

export default CompanyLogoGlobe;





// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// const CompanyLogoGlobe = () => {
//   const mountRef = useRef(null);

//   const companyLogos = [
//     { name: 'TCS', logoPath: '/logos/tcs.svg', lat: 20, lng: 72 },
//     { name: 'Infosys', logoPath: '/logos/infosys.svg', lat: 15, lng: 78 },
//     { name: 'Accenture', logoPath: '/logos/accenture.svg', lat: 48, lng: -3 },
//     { name: 'EY', logoPath: '/logos/ey.svg', lat: 40, lng: -74 },
//     { name: 'Wipro', logoPath: '/logos/wipro.svg', lat: -12, lng: 130 },
//     { name: 'IBM', logoPath: '/logos/ibm.svg', lat: 42, lng: -83 },
//     { name: 'Google', logoPath: '/logos/google.svg', lat: 37, lng: -122 },
//   ];

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

//     // Lighting
//     scene.add(new THREE.AmbientLight(0xffffff, 1.0));
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     directionalLight.position.set(-3, 3, 5);
//     scene.add(directionalLight);

//     // Globe
//     const globeTexture = new THREE.TextureLoader().load('/textures/globe-tiles.png');
//     const globeMaterial = new THREE.MeshPhongMaterial({
//       map: globeTexture,
//       color: 0xdddddd,
//       transparent: true,
//       opacity: 0.85,
//       shininess: 60,
//       emissive: 0x222222,
//       emissiveIntensity: 0.2,
//     });
//     const globe = new THREE.Mesh(new THREE.SphereGeometry(1.4, 64, 64), globeMaterial);
//     scene.add(globe);

//     // Group for logos
//     const logoGroup = new THREE.Group();
//     scene.add(logoGroup);
//     const radius = 1.41;

//     // Convert lat/lng to 3D position
//     const toCartesian = (lat, lng, r) => {
//       const phi = (90 - lat) * (Math.PI / 180);
//       const theta = (lng + 180) * (Math.PI / 180);
//       const x = -r * Math.sin(phi) * Math.cos(theta);
//       const y = r * Math.cos(phi);
//       const z = r * Math.sin(phi) * Math.sin(theta);
//       return new THREE.Vector3(x, y, z);
//     };

//     // Create texture from SVG or fallback
//     const createSVGTexture = (svgPath, companyName) => {
//       return new Promise((resolve) => {
//         const loader = new THREE.TextureLoader();
//         loader.load(
//           svgPath,
//           (texture) => resolve(texture),
//           undefined,
//           () => {
//             // Fallback: Text-based logo
//             const canvas = document.createElement('canvas');
//             canvas.width = 256;
//             canvas.height = 128;
//             const ctx = canvas.getContext('2d');

//             // White background
//             ctx.fillStyle = '#ffffff';
//             ctx.fillRect(0, 0, canvas.width, canvas.height);

//             // Shadowed black text
//             ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
//             ctx.shadowBlur = 6;
//             ctx.fillStyle = '#000000';
//             ctx.font = 'bold 28px Arial';
//             ctx.textAlign = 'center';
//             ctx.fillText(companyName, canvas.width / 2, canvas.height / 2 + 10);

//             resolve(new THREE.CanvasTexture(canvas));
//           }
//         );
//       });
//     };

//     // Load and place each logo
//     companyLogos.forEach((company) => {
//       const pos = toCartesian(company.lat, company.lng, radius);

//       createSVGTexture(company.logoPath, company.name).then((texture) => {
//         const material = new THREE.MeshBasicMaterial({
//           map: texture,
//           transparent: true,
//           side: THREE.DoubleSide,
//         });

//         const plane = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.25), material);
//         plane.position.copy(pos);
//         plane.position.multiplyScalar(1.01); // Push slightly outward

//         const lookVec = pos.clone().normalize();
//         plane.lookAt(lookVec.clone().multiplyScalar(2));
//         plane.userData.company = company.name;

//         logoGroup.add(plane);
//       });
//     });

//     // Hover logic
//     const raycaster = new THREE.Raycaster();
//     const mouse = new THREE.Vector2();
//     let hoveredObject = null;

//     const onMouseMove = (e) => {
//       mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
//       mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
//     };
//     window.addEventListener('mousemove', onMouseMove);

//     // Animate
//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();

//       raycaster.setFromCamera(mouse, camera);
//       const intersects = raycaster.intersectObjects(logoGroup.children);

//       if (intersects.length > 0) {
//         if (hoveredObject !== intersects[0].object) {
//           if (hoveredObject) {
//             hoveredObject.scale.set(0.5, 0.25, 0.1);
//             hoveredObject.material.emissiveIntensity = 0;
//           }
//           hoveredObject = intersects[0].object;
//           hoveredObject.scale.set(0.6, 0.3, 0.1);
//         }
//       } else if (hoveredObject) {
//         hoveredObject.scale.set(0.5, 0.25, 0.1);
//         hoveredObject = null;
//       }

//       renderer.render(scene, camera);
//     };
//     animate();

//     // Resize handler
//     const handleResize = () => {
//       const { clientWidth, clientHeight } = mount;
//       camera.aspect = clientWidth / clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(clientWidth, clientHeight);
//     };
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       window.removeEventListener('mousemove', onMouseMove);
//       mount.removeChild(renderer.domElement);
//     };
//   }, []);

//   return <div ref={mountRef} className="w-full h-full" />;
// };

// export default CompanyLogoGlobe;


