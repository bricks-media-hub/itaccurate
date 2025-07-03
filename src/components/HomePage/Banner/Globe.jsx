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




import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

const Globe = ({ onDotClick }) => {
  const mountRef = useRef(null);
  const tooltipRef = useRef(null);
  const spriteRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const tooltip = tooltipRef.current;
    const width = mount.clientWidth, height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.2;
    controls.minPolarAngle = Math.PI / 3;
    controls.maxPolarAngle = Math.PI / 1.5;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const pointLight = new THREE.PointLight(0x66ccff, 2);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const radius = 3.1;

    // Globe wireframe
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x3399ff,
      wireframe: true,
      transparent: true,
      opacity: 0,
    });
    const globe = new THREE.Mesh(new THREE.SphereGeometry(2.8, 64, 64), wireMat);
    scene.add(globe);
    // globe.rotation.y = THREE.MathUtils.degToRad(240);
    // globe.rotation.x = THREE.MathUtils.degToRad(30); // optional slight tilt
    globe.rotation.x = Math.PI / 6; // ≈ 30 degrees forward


    // Dots
    // STEP 1: Create a circular glowing texture for the dots
    const createStarTexture = () => {
      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = size;

      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(
        size / 2, size / 2, 0,
        size / 2, size / 2, size / 2
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.4, 'rgba(173, 216, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(173, 216, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      return new THREE.CanvasTexture(canvas);
    };

    const dotTexture = createStarTexture();

    // STEP 2: Generate positions
    const dotCount = 150;
    const positions = new Float32Array(dotCount * 3);
    const dotPositionsArray = [];

    for (let i = 0; i < dotCount; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions.set([x, y, z], i * 3);
      dotPositionsArray.push(new THREE.Vector3(x, y, z));
    }

    const dotGeom = new THREE.BufferGeometry();
    dotGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // STEP 3: Material with glowing circular texture
    const dotMat = new THREE.PointsMaterial({
      map: dotTexture,
      color: 0xffffff,
      size: 0.15, // adjust for visibility
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const dots = new THREE.Points(dotGeom, dotMat);
    scene.add(dots);


    // Floating billboard "IT Accurate"
    const map = new THREE.TextureLoader().load(
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="256" height="64">
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="transparent"/>
      <text x="50%" y="50%" filter="url(#glow)"
        dominant-baseline="middle" text-anchor="middle"
        font-family="Helvetica" font-size="34"
        fill="#ffffff" stroke="#222222" stroke-width="2">
        IT Accurate
      </text>
    </svg>
  `)
    );

    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map,
      transparent: true,
      opacity: 1,
    }));
    sprite.position.set(0, 0, 0.8);
    sprite.scale.set(1.8, 0.5, 1);
    scene.add(sprite);


    // Lines setup
    const linesGroup = new THREE.Group();
    scene.add(linesGroup);
    let connections = [];
    const maxConnections = 8;
    const duration = 3.5;
    let timer = 0;

const createConnection = (i, j) => {
  const start = dotPositionsArray[i];
  const end = dotPositionsArray[j];
  const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(radius * 1.05);
  const curve = new THREE.QuadraticBezierCurve3(start, mid, end);

  const tubeGeo = new THREE.TubeGeometry(curve, 200, 0.01, 8, false);
  const tubeMat = new THREE.MeshBasicMaterial({
    color: 0x3b82f6, // Tailwind blue-500
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending,
  });

  const tube = new THREE.Mesh(tubeGeo, tubeMat);
  linesGroup.add(tube);

  const cometHead = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 16, 16),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
    })
  );
  linesGroup.add(cometHead);

  return {
    tube,
    cometHead,
    curve,
    progress: 0,
    tail: [],
  };
};


const updateConnections = (dt) => {
  timer += dt;
  if (timer > 1.5 && connections.length < maxConnections) {
    timer = 0;
    let i = Math.floor(Math.random() * dotCount);
    let j;
    do {
      j = Math.floor(Math.random() * dotCount);
    } while (j === i);
    connections.push(createConnection(i, j));
  }

  for (let k = connections.length - 1; k >= 0; k--) {
    const c = connections[k];
    c.progress += dt / 6.5; // 🔵 move slower

    if (c.progress >= 1) {
      linesGroup.remove(c.tube);
      linesGroup.remove(c.cometHead);
      c.tail.forEach(t => linesGroup.remove(t));
      connections.splice(k, 1);
    } else {
      const p = c.curve.getPoint(c.progress);
      c.cometHead.position.copy(p);

      // Make tail follow (like comet particles fading)
      const tailSegment = new THREE.Mesh(
        new THREE.SphereGeometry(0.025, 8, 8),
        new THREE.MeshBasicMaterial({
          color: 0x0606bf, // blue tail
          transparent: true,
          opacity: 0.25,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      tailSegment.position.copy(p);
      linesGroup.add(tailSegment);
      c.tail.push(tailSegment);

      // Limit tail length and fade old ones
      if (c.tail.length > 18) {
        const removed = c.tail.shift();
        linesGroup.remove(removed);
      }
      c.tail.forEach((seg, i) => {
        seg.material.opacity = 0.3 * ((i + 1) / c.tail.length); // fade tail
        const s = 0.025 * ((c.tail.length - i) / c.tail.length);
        seg.scale.set(s, s, s);
      });
    }
  }
};


    // Raycaster for hover/click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onPointerMove(e) {
      mouse.x = (e.clientX / width) * 2 - 1;
      mouse.y = -(e.clientY / height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObject(dots);
      if (hits.length) {
        const idx = hits[0].index;
        const pos = hits[0].point.clone().project(camera);
        tooltip.style.opacity = '1';
        tooltip.style.left = ((pos.x + 1) / 2 * width) + 'px';
        tooltip.style.top = ((-pos.y + 1) / 2 * height) + 'px';
        tooltip.textContent = `Node ${idx + 1}`;
      } else tooltip.style.opacity = '0';
    }

    function onClick() {
      raycaster.setFromCamera(mouse, camera);
      const clicks = raycaster.intersectObject(dots);
      if (clicks.length) {
        const idx = clicks[0].index;
        if (onDotClick) onDotClick(idx);
      }
    }

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('click', onClick);

    // Intro fade-in
    gsap.to([wireMat, dotMat], { opacity: 1, duration: 2, ease: 'power2.inOut' });

    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.1);
      updateConnections(dt);
      controls.update();
      sprite.lookAt(camera.position);
      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      mount.removeChild(renderer.domElement);
    };
  }, [onDotClick]);

  return (
    <div ref={mountRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          padding: '4px 8px',
          background: 'rgba(0,0,0,0.6)',
          color: '#fff',
          borderRadius: '4px',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.2s',
        }}
      />
    </div>
  );
};

export default Globe;



