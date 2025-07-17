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

  // Only prevent default if interacting with logos (optional improvement)
  // event.preventDefault();

  const touch = event.touches[0];
  mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
};

// window.addEventListener('touchmove', onTouchMove, { passive: true });


    window.addEventListener('mousemove', onMouseMove);
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

  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  if (mount && mount.contains(renderer.domElement)) {
    mount.removeChild(renderer.domElement);
  }

  if (scene) {
    scene.traverse((object) => {
      if (object.isMesh) {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((m) => m.dispose());
        } else {
          object.material?.dispose();
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

