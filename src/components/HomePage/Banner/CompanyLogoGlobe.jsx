// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// const CompanyLogoGlobe = () => {
//   const mountRef = useRef(null);
//   const [isMobile, setIsMobile] = useState(false);

//   const companyLogos = [
//     // { name: "TCS", logoPath: "/logos/tcs.svg" },
//     // { name: "Infosys", logoPath: "/logos/infosys.svg" },
//     // { name: "Accenture", logoPath: "/logos/accenture.svg" },
//     // { name: "EY", logoPath: "/logos/ey.svg" },
//     // { name: "Wipro", logoPath: "/logos/wipro.svg" },
//     // { name: "IBM", logoPath: "/logos/ibm.svg" },
//     // { name: "Google", logoPath: "/logos/google.svg" },
//     // { name: "TCS", logoPath: "/logos/tcs.png" },
//     // { name: "Infosys", logoPath: "/logos/infosys.png" },
//     // { name: "Accenture", logoPath: "/logos/accenture.png" },
//     // { name: "EY", logoPath: "/logos/ey.png" },
//     // { name: "Wipro", logoPath: "/logos/wipro.png" },
//     // { name: "IBM", logoPath: "/logos/ibm.png" },
//     // { name: "Google", logoPath: "/logos/google.png" },
//     { name: "SAP", logoPath: "/icons/sap.svg" },
//     { name: "Data Analytics", logoPath: "/icons/data-analytics.svg" },
//     { name: "DevOps", logoPath: "/icons/devops.svg" },
//     { name: "Full Stack Development", logoPath: "/icons/fullstack.svg" },
//     { name: "Data Science", logoPath: "/icons/data-science.svg" },
//     { name: "AWS", logoPath: "/icons/aws.svg" },
//     { name: "Data Engineering", logoPath: "/icons/data-engineer.svg" },
//     { name: "Salesforce", logoPath: "/icons/salesforce.svg" },
//     { name: "Business Analytics", logoPath: "/icons/business-analytics.svg" },
//     { name: "HR Management", logoPath: "/icons/hr-manage.svg" },
//     { name: "Python", logoPath: "/icons/python.svg" },
//     { name: "Service Now", logoPath: "/icons/service.svg" },
//     { name: "Share", logoPath: "/icons/share.svg" },
//     { name: "MERN Stack", logoPath: "/icons/mern-stack.png" },
//     { name: "Java Full Stack", logoPath: "/icons/java-fullstack.png" },
//     { name: "Python Full Stack", logoPath: "/icons/python-fullstack.png.png" },
//   ];

//   useEffect(() => {
//     // Check if mobile
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   useEffect(() => {
//     if (!mountRef.current) return;

//     const mount = mountRef.current;
//     let scene, renderer, camera, controls, globe, wireframe, logoGroup;
//     let animationFrameId;

//     const initScene = () => {
//       // Scene
//       scene = new THREE.Scene();

//       // Renderer
//       renderer = new THREE.WebGLRenderer({
//         alpha: true,
//         antialias: true,
//         powerPreference: "high-performance",
//       });
//       renderer.setSize(mount.clientWidth, mount.clientHeight);
//       renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//       mount.appendChild(renderer.domElement);

//       // Camera
//       camera = new THREE.PerspectiveCamera(
//         50,
//         mount.clientWidth / mount.clientHeight,
//         0.1,
//         1000
//       );
//       camera.position.set(0, 0, isMobile ? 5 : 4);

//       // Controls
//       controls = new OrbitControls(camera, renderer.domElement);
//       controls.enableZoom = isMobile ? false : false;
//       controls.enablePan = false;
//       controls.enableDamping = true;
//       controls.dampingFactor = 0.08;
//       controls.autoRotate = true;
//       controls.autoRotateSpeed = isMobile ? 0.8 : 1.2;
//       controls.minPolarAngle = Math.PI / 3;
//       controls.maxPolarAngle = Math.PI / 1.5;

//       // Lighting
//       scene.add(new THREE.AmbientLight(0xffffff, 0.9));
//       const pointLight = new THREE.PointLight(0xffffff, 2);
//       pointLight.position.set(5, 5, 5);
//       scene.add(pointLight);
//       scene.add(new THREE.AmbientLight(0xffffff, 0.3));

//       const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//       directionalLight.position.set(5, 3, 5);
//       scene.add(directionalLight);

//       // Globe
//       globe = new THREE.Mesh(
//         new THREE.SphereGeometry(isMobile ? 1.8 : 1.4, 64, 64),
//         new THREE.MeshStandardMaterial({
//           color: new THREE.Color("#6C63FF"),
//           emissive: new THREE.Color("#a5b4fc"),
//           emissiveIntensity: 0.4,
//           roughness: 0.3,
//           metalness: 0.5,
//           transparent: true,
//           opacity: 0.95,
//         })
//       );
//       scene.add(globe);

//       // Wireframe
//       wireframe = new THREE.Mesh(
//         new THREE.SphereGeometry((isMobile ? 1.8 : 1.4) + 0.001, 64, 64),
//         new THREE.MeshBasicMaterial({
//           color: "#ffffff",
//           wireframe: true,
//           transparent: true,
//           opacity: 0.08,
//           depthWrite: false,
//         })
//       );
//       scene.add(wireframe);

//       // Logo Group
//       logoGroup = new THREE.Group();
//       scene.add(logoGroup);
//     };

//     const createTexture = async (svgPath, name) => {
//       return new Promise((resolve) => {
//         const loader = new THREE.TextureLoader();
//         loader.load(
//           svgPath,
//           (texture) => {
//             texture.encoding = THREE.sRGBEncoding;
//             resolve(texture);
//           },
//           undefined,
//           () => {
//             // Fallback if image fails to load
//             const canvas = document.createElement("canvas");
//             canvas.width = isMobile ? 128 : 256;
//             canvas.height = isMobile ? 64 : 128;
//             const ctx = canvas.getContext("2d");
//             ctx.fillStyle = "#000000cc";
//             ctx.fillRect(0, 0, canvas.width, canvas.height);
//             ctx.font = `bold ${isMobile ? 16 : 24}px Arial`;
//             ctx.fillStyle = "#fff";
//             ctx.textAlign = "center";
//             ctx.fillText(
//               name,
//               canvas.width / 2,
//               canvas.height / 2 + (isMobile ? 5 : 10)
//             );
//             const texture = new THREE.CanvasTexture(canvas);
//             texture.encoding = THREE.sRGBEncoding;
//             resolve(texture);
//           }
//         );
//       });
//     };

//     const placeLogos = async () => {
//       const totalLogos = isMobile ? 20 : 30;
//       const radius = isMobile ? 1.8 : 1.4;
//       const logoSize = isMobile ? 0.35 : 0.45;

//       for (let i = 0; i < totalLogos; i++) {
//         const company = companyLogos[i % companyLogos.length];
//         const phi = Math.acos(-1 + (2 * i) / totalLogos);
//         const theta = Math.sqrt(totalLogos * Math.PI) * phi;

//         const x = radius * Math.sin(phi) * Math.cos(theta);
//         const y = radius * Math.sin(phi) * Math.sin(theta);
//         const z = radius * Math.cos(phi);

//         const texture = await createTexture(company.logoPath, company.name);

//         const geometry = new THREE.BoxGeometry(logoSize, logoSize * 0.5, 0.05);

//         const materials = [
//           new THREE.MeshBasicMaterial({ color: 0x222222 }),
//           new THREE.MeshBasicMaterial({ color: 0x222222 }),
//           new THREE.MeshBasicMaterial({ color: 0x333333 }),
//           new THREE.MeshBasicMaterial({ color: 0x333333 }),
//           new THREE.MeshBasicMaterial({
//             map: texture,
//             transparent: true,
//             opacity: 1,
//           }),
//           new THREE.MeshBasicMaterial({ color: 0x111111 }),
//         ];

//         const card = new THREE.Mesh(geometry, materials);
//         const offset = isMobile ? 0.15 : 0.18;
//         const pos = new THREE.Vector3(x, y, z)
//           .normalize()
//           .multiplyScalar(radius + offset);
//         card.position.copy(pos);
//         card.lookAt(new THREE.Vector3(0, 0, 0));
//         logoGroup.add(card);
//       }
//     };

//     // Raycasting for hover
//     const raycaster = new THREE.Raycaster();
//     const mouse = new THREE.Vector2();
//     let hovered = null;

//     const onMouseMove = (event) => {
//       if (isMobile) return;

//       mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//       mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//     };

//     const onTouchMove = (event) => {
//       if (!isMobile) return;

//       // Only prevent default if interacting with logos (optional improvement)
//       // event.preventDefault();

//       const touch = event.touches[0];
//       mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
//       mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
//     };

//     // window.addEventListener('touchmove', onTouchMove, { passive: true });

//     window.addEventListener("mousemove", onMouseMove);
//     // Animation
//     const animate = () => {
//       animationFrameId = requestAnimationFrame(animate);
//       controls.update();

//       // Raycasting for hover effects
//       raycaster.setFromCamera(mouse, camera);
//       const intersects = raycaster.intersectObjects(logoGroup.children);

//       if (intersects.length > 0) {
//         if (hovered !== intersects[0].object) {
//           if (hovered) hovered.scale.set(1, 1, 1);
//           hovered = intersects[0].object;
//           hovered.scale.set(1.2, 1.2, 1.2);
//         }
//       } else if (hovered) {
//         hovered.scale.set(1, 1, 1);
//         hovered = null;
//       }

//       // Make logos face camera
//       if (logoGroup) {
//         logoGroup.children.forEach((child) => {
//           child.lookAt(camera.position);
//         });
//       }

//       renderer.render(scene, camera);
//     };

//     const onResize = () => {
//       const { clientWidth, clientHeight } = mount;
//       camera.aspect = clientWidth / clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(clientWidth, clientHeight);
//     };
//     window.addEventListener("resize", onResize);

//     // Initialize everything
//     initScene();
//     placeLogos().then(() => {
//       animate();
//     });

//     // Cleanup
//     return () => {
//       window.removeEventListener("resize", onResize);
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("touchmove", onTouchMove);

//       if (animationFrameId) cancelAnimationFrame(animationFrameId);
//       if (mount && mount.contains(renderer.domElement)) {
//         mount.removeChild(renderer.domElement);
//       }

//       if (scene) {
//         scene.traverse((object) => {
//           if (object.isMesh) {
//             object.geometry?.dispose();
//             if (Array.isArray(object.material)) {
//               object.material.forEach((m) => m.dispose());
//             } else {
//               object.material?.dispose();
//             }
//           }
//         });
//       }
//     };
//   }, [isMobile]);

//   return (
//     <div
//       ref={mountRef}
//       className="w-full h-[400px] md:h-[500px] bg-transparent"
//     />
//   );
// };

// export default CompanyLogoGlobe;





import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CompanyLogoGlobe = () => {
  const mountRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const companyLogos = [
    { name: "SAP", logoPath: "/icons/sap.svg" },
    { name: "Data Analytics", logoPath: "/icons/data-analytics.svg" },
    { name: "DevOps", logoPath: "/icons/devops.svg" },
    { name: "Full Stack Development", logoPath: "/icons/fullstack.svg" },
    { name: "Data Science", logoPath: "/icons/data-science.svg" },
    { name: "AWS", logoPath: "/icons/aws.svg" },
    { name: "Data Engineering", logoPath: "/icons/data-engineer.svg" },
    { name: "Salesforce", logoPath: "/icons/salesforce.svg" },
    { name: "Business Analytics", logoPath: "/icons/business-analytics.svg" },
    { name: "HR Management", logoPath: "/icons/hr-manage.svg" },
    // { name: "Python", logoPath: "/icons/python.svg" },
    { name: "Service Now", logoPath: "/icons/service.svg" },
    { name: "Share", logoPath: "/icons/share.svg" },
    { name: "MERN Stack", logoPath: "/icons/mern-stack.png" },
    { name: "Java Full Stack", logoPath: "/icons/java-fullstack.png" },
    { name: "Python Full Stack", logoPath: "/icons/python-fullstack.png" },
  ];

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

    const initScene = () => {
      // scene + renderer
      scene = new THREE.Scene();
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setClearColor(0x000000, 0);
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);

      camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 1000);
      camera.position.set(0, 0, isMobile ? 5 : 4);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.autoRotate = true;
      controls.autoRotateSpeed = isMobile ? 0.8 : 1.2;
      controls.minPolarAngle = Math.PI / 3;
      controls.maxPolarAngle = Math.PI / 1.5;

      // lights
      scene.add(new THREE.AmbientLight(0xffffff, 0.9));

      // globe
      globe = new THREE.Mesh(
        new THREE.SphereGeometry(isMobile ? 1.8 : 1.4, 64, 64),
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

      // optional wireframe
      wireframe = new THREE.Mesh(
        new THREE.SphereGeometry((isMobile ? 1.8 : 1.4) + 0.002, 64, 64),
        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, opacity: 0.08, transparent: true })
      );
      scene.add(wireframe);

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
      const radius = isMobile ? 1.8 : 1.4;
      const size = isMobile ? 0.45 : 0.55;
      const offset = size * 0.6; // push out beyond sphere

      for (let i = 0; i < total; i++) {
        const { name, logoPath } = companyLogos[i];
        const phi = Math.acos(-1 + (2 * i) / total);
        const theta = Math.sqrt(total * Math.PI) * phi;
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        const texture = createTexture(logoPath);
        const geom = new THREE.PlaneGeometry(size, size * 0.6);
        const mat = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
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
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, [isMobile]);

  return <div ref={mountRef} className="w-full h-[400px] md:h-[500px] bg-transparent" />;
};

export default CompanyLogoGlobe;






// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
// import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
// import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

// const CompanyLogoGlobe = () => {
//   const mountRef = useRef(null);
//   const [isMobile, setIsMobile] = useState(false);

//   const companyLogos = [
//     { name: "SAP", logoPath: "/icons/sap.svg" },
//     { name: "Data Analytics", logoPath: "/icons/data-analytics.svg" },
//     { name: "DevOps", logoPath: "/icons/devops.svg" },
//     { name: "Full Stack Development", logoPath: "/icons/fullstack.svg" },
//     { name: "Data Science", logoPath: "/icons/data-science.svg" },
//     { name: "AWS", logoPath: "/icons/aws.svg" },
//     { name: "Data Engineering", logoPath: "/icons/data-engineer.svg" },
//     { name: "Salesforce", logoPath: "/icons/salesforce.svg" },
//     { name: "Business Analytics", logoPath: "/icons/business-analytics.svg" },
//     { name: "HR Management", logoPath: "/icons/hr-manage.svg" },
//     { name: "Python", logoPath: "/icons/python.svg" },
//     { name: "Service Now", logoPath: "/icons/service.svg" },
//     { name: "Share", logoPath: "/icons/share.svg" },
//     { name: "MERN Stack", logoPath: "/icons/mern-stack.png" },
//     { name: "Java Full Stack", logoPath: "/icons/java-fullstack.png" },
//     { name: "Python Full Stack", logoPath: "/icons/python-fullstack.png" },
//   ];

//   // Detect mobile viewport
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth <= 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   useEffect(() => {
//     if (!mountRef.current) return;
//     const mount = mountRef.current;

//     // Three.js scene essentials
//     let scene, renderer, camera, controls, globe, wireframe, logoGroup;
//     let composer;
//     let animationFrameId;

//     const initScene = () => {
//       scene = new THREE.Scene();

//       renderer = new THREE.WebGLRenderer({
//         alpha: true,
//         antialias: true,
//         powerPreference: "high-performance",
//       });
//       renderer.setSize(mount.clientWidth, mount.clientHeight);
//       renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//       renderer.outputEncoding = THREE.sRGBEncoding;
//       mount.appendChild(renderer.domElement);

//       camera = new THREE.PerspectiveCamera(
//         50,
//         mount.clientWidth / mount.clientHeight,
//         0.1,
//         1000
//       );
//       camera.position.set(0, 0, isMobile ? 5 : 4);

//       controls = new OrbitControls(camera, renderer.domElement);
//       controls.enableZoom = false;
//       controls.enablePan = false;
//       controls.enableDamping = true;
//       controls.dampingFactor = 0.08;
//       controls.autoRotate = true;
//       controls.autoRotateSpeed = isMobile ? 0.8 : 1.2;
//       controls.minPolarAngle = Math.PI / 3;
//       controls.maxPolarAngle = Math.PI / 1.5;

//       // Lighting
//       scene.add(new THREE.AmbientLight(0xffffff, 0.9));
//       const pointLight1 = new THREE.PointLight(0xffffff, 2);
//       pointLight1.position.set(5, 5, 5);
//       scene.add(pointLight1);
//       const pointLight2 = new THREE.PointLight(0xffffff, 1);
//       pointLight2.position.set(-5, -5, -5);
//       scene.add(pointLight2);
//       const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//       directionalLight.position.set(5, 3, 5);
//       scene.add(directionalLight);

//       // Bloom composer for glow
//       composer = new EffectComposer(renderer);
//       composer.addPass(new RenderPass(scene, camera));
//       const bloom = new UnrealBloomPass(
//         new THREE.Vector2(mount.clientWidth, mount.clientHeight),
//         1.2, // strength
//         0.4, // radius
//         0.85 // threshold
//       );
//       composer.addPass(bloom);

//       // Globe mesh
//       globe = new THREE.Mesh(
//         new THREE.SphereGeometry(isMobile ? 1.8 : 1.4, 64, 64),
//         new THREE.MeshStandardMaterial({
//           color: new THREE.Color("#6C63FF"),
//           emissive: new THREE.Color("#a5b4fc"),
//           emissiveIntensity: 0.4,
//           roughness: 0.3,
//           metalness: 0.5,
//           transparent: true,
//           opacity: 0.95,
//         })
//       );
//       scene.add(globe);

//       // Wireframe overlay
//       wireframe = new THREE.Mesh(
//         new THREE.SphereGeometry((isMobile ? 1.8 : 1.4) + 0.001, 64, 64),
//         new THREE.MeshBasicMaterial({
//           color: "#ffffff",
//           wireframe: true,
//           transparent: true,
//           opacity: 0.08,
//           depthWrite: false,
//         })
//       );
//       scene.add(wireframe);

//       // Group to hold logos
//       logoGroup = new THREE.Group();
//       scene.add(logoGroup);
//     };

//     // Load a texture from an SVG (or fallback to canvas text)
//     const createTexture = async (svgPath, name) => {
//       return new Promise((resolve) => {
//         const loader = new THREE.TextureLoader();
//         loader.load(
//           svgPath,
//           (texture) => {
//             texture.encoding = THREE.sRGBEncoding;
//             texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
//             resolve(texture);
//           },
//           undefined,
//           () => {
//             const canvas = document.createElement("canvas");
//             canvas.width = 512;
//             canvas.height = 256;
//             const ctx = canvas.getContext("2d");
//             ctx.fillStyle = "#000000cc";
//             ctx.fillRect(0, 0, canvas.width, canvas.height);
//             ctx.font = `bold ${isMobile ? 24 : 32}px Arial`;
//             ctx.fillStyle = "#fff";
//             ctx.textAlign = "center";
//             ctx.fillText(name, canvas.width / 2, canvas.height / 2 + 10);
//             const texture = new THREE.CanvasTexture(canvas);
//             texture.encoding = THREE.sRGBEncoding;
//             resolve(texture);
//           }
//         );
//       });
//     };

//     // Evenly distribute and place logos
//     const placeLogos = async () => {
//       const totalLogos = companyLogos.length;
//       const radius = isMobile ? 1.8 : 1.4;
//       const logoSize = isMobile ? 0.45 : 0.55;

//       for (let i = 0; i < totalLogos; i++) {
//         const company = companyLogos[i];
//         const phi = Math.acos(-1 + (2 * i) / totalLogos);
//         const theta = Math.sqrt(totalLogos * Math.PI) * phi;
//         const x = radius * Math.sin(phi) * Math.cos(theta);
//         const y = radius * Math.sin(phi) * Math.sin(theta);
//         const z = radius * Math.cos(phi);

//         const texture = await createTexture(company.logoPath, company.name);

//         // Box for slight thickness
//         const depth = logoSize * 0.1;
//         const geometry = new THREE.BoxGeometry(logoSize, logoSize * 0.6, depth);
//         const material = new THREE.MeshStandardMaterial({
//           map: texture,
//           transparent: true,
//           side: THREE.DoubleSide,
//           emissive: new THREE.Color(0xffffff),
//           emissiveIntensity: 0.2,
//           roughness: 0.4,
//           metalness: 0.6,
//         });
//         const logo = new THREE.Mesh(geometry, material);

//         // Add a rim light per logo
//         const lamp = new THREE.PointLight(0xffffff, 0.5, logoSize * 5);
//         lamp.position.set(0, 0, depth * 2);
//         logo.add(lamp);

//         // Position & orient on globe
//         const pos = new THREE.Vector3(x, y, z).normalize().multiplyScalar(radius + 0.18);
//         logo.position.copy(pos);
//         logo.quaternion.setFromUnitVectors(
//           new THREE.Vector3(0, 0, 1),
//           pos.clone().normalize()
//         );

//         logoGroup.add(logo);
//       }
//     };

//     // Animation loop
//     const animate = () => {
//       animationFrameId = requestAnimationFrame(animate);
//       controls.update();
//       composer.render();
//     };

//     // Handle resize
//     const onResize = () => {
//       camera.aspect = mount.clientWidth / mount.clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(mount.clientWidth, mount.clientHeight);
//       composer.setSize(mount.clientWidth, mount.clientHeight);
//     };
//     window.addEventListener("resize", onResize);

//     // Kick things off
//     initScene();
//     placeLogos().then(() => animate());

//     // Cleanup
//     return () => {
//       window.removeEventListener("resize", onResize);
//       if (animationFrameId) cancelAnimationFrame(animationFrameId);
//       if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
//       scene.traverse((obj) => {
//         if (obj.isMesh) {
//           obj.geometry.dispose();
//           if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
//           else obj.material.dispose();
//         }
//       });
//     };
//   }, [isMobile]);

//   return (
//     <div
//       ref={mountRef}
//       className="w-full h-[400px] md:h-[500px] bg-transparent"
//     />
//   );
// };

// export default CompanyLogoGlobe;
