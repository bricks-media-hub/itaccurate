import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { FiArrowLeft, FiCompass, FiHome, FiNavigation, FiCloud } from 'react-icons/fi';

// Simple 3D Plane Component
function SimplePlane({ mouse }) {
  const mesh = useRef();
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = THREE.MathUtils.lerp(
        mesh.current.rotation.x,
        (mouse.current.y * Math.PI) / 20,
        0.1
      );
      mesh.current.rotation.y = THREE.MathUtils.lerp(
        mesh.current.rotation.y,
        (mouse.current.x * Math.PI) / 20,
        0.1
      );
      mesh.current.rotation.z = THREE.MathUtils.lerp(
        mesh.current.rotation.z,
        (mouse.current.x * Math.PI) / 40,
        0.1
      );
    }
  });

  return (
    <group>
      {/* Plane body */}
      <mesh ref={mesh} position={[0, -0.5, 0]}>
        <boxGeometry args={[2, 0.3, 0.5]} />
        <meshStandardMaterial color="#4f46e5" metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Wings */}
      <mesh position={[0, -0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[1.5, 0.1, 1.8]} />
        <meshStandardMaterial color="#6366f1" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Tail */}
      <mesh position={[0, -0.2, -0.8]}>
        <boxGeometry args={[0.2, 0.5, 0.2]} />
        <meshStandardMaterial color="#818cf8" metalness={0.4} roughness={0.4} />
      </mesh>
    </group>
  );
}

// Floating Clouds Background
function FloatingClouds() {
  const clouds = useRef([]);
  const dummy = useRef(new THREE.Object3D());
  
  useFrame((state) => {
    clouds.current.forEach((cloud, i) => {
      const t = state.clock.getElapsedTime() + i * 100;
      dummy.current.position.set(
        Math.sin(t * 0.1 + i) * 20,
        Math.cos(t * 0.15 + i) * 10,
        Math.sin(t * 0.2 + i) * 10
      );
      dummy.current.rotation.set(
        Math.sin(t * 0.1) * Math.PI,
        Math.cos(t * 0.15) * Math.PI,
        0
      );
      dummy.current.updateMatrix();
      clouds.current[i].setMatrixAt(i, dummy.current.matrix);
    });
    clouds.current.forEach(cloud => cloud.instanceMatrix.needsUpdate = true);
  });

  return (
    <instancedMesh ref={clouds} args={[null, null, 8]} position={[0, 0, -10]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#ffffff" transparent opacity={0.2} />
    </instancedMesh>
  );
}

const NotFoundPage = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const mouse = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleHoverStart = (button) => {
    setActiveButton(button);
    controls.start({
      scale: 1.05,
      transition: { duration: 0.2 }
    });
  };

  const handleHoverEnd = () => {
    setActiveButton(null);
    controls.start({
      scale: 1,
      transition: { duration: 0.2 }
    });
  };

  const buttonVariants = {
    hover: {
      y: -5,
      boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.5)",
      transition: { duration: 0.3 }
    },
    tap: {
      y: 0,
      scale: 0.98
    }
  };

  const iconVariants = {
    hover: { 
      rotate: -10,
      scale: 1.2
    },
    tap: {
      rotate: 0,
      scale: 1
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 0.3, 0],
              transition: {
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 5
              }
            }}
            className="absolute rounded-full bg-blue-400 dark:bg-purple-400"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Text Content */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full md:w-1/2 text-center md:text-left md:pr-10 z-10"
      >
        <motion.div
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="inline-block"
        >
          <motion.h1 
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-8xl sm:text-9xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 bg-[length:200%]"
          >
            404
          </motion.h1>
        </motion.div>
        
        <motion.h2 
          whileHover={{ scale: 1.02 }}
          className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100 flex items-center justify-center md:justify-start"
        >
          <FiCompass className="mr-3" /> Navigation Error
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8 text-gray-600 dark:text-gray-400 text-lg leading-relaxed"
        >
          The page you're looking for has either been moved or doesn't exist. 
          Our systems indicate this might be a routing issue. Please select one 
          of the options below to get back on track.
        </motion.p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onHoverStart={() => handleHoverStart('back')}
            onHoverEnd={handleHoverEnd}
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-blue-600 to-blue-500 text-white flex items-center justify-center gap-2"
          >
            <motion.span variants={iconVariants}>
              <FiArrowLeft />
            </motion.span>
            <span>Go Back</span>
          </motion.button>
          
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onHoverStart={() => handleHoverStart('home')}
            onHoverEnd={handleHoverEnd}
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-purple-600 to-purple-500 text-white flex items-center justify-center gap-2"
          >
            <motion.span variants={iconVariants}>
              <FiHome />
            </motion.span>
            <span>Return Home</span>
          </motion.button>
        </div>

        {/* Status Message */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg border border-blue-200 dark:border-gray-600 flex items-start"
        >
          <FiNavigation className="text-blue-500 dark:text-purple-400 mt-1 mr-3" />
          <div>
            <h4 className="font-medium text-blue-800 dark:text-blue-100">Navigation Advisory</h4>
            <p className="text-sm text-blue-600 dark:text-blue-200">
              {activeButton === 'back' 
                ? "Returning to previous waypoint..." 
                : activeButton === 'home'
                ? "Calculating route to homepage..."
                : "Ready for navigation commands."}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* 3D Plane Section - Fixed */}
      <motion.div 
        ref={canvasRef}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mt-10 md:mt-0 md:w-1/2 h-64 sm:h-96 w-full relative"
        style={{ minHeight: '400px' }}  // Ensure minimum height
      >
        <Canvas 
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            background: 'transparent'
          }}
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <SimplePlane mouse={mouse} />
          <FloatingClouds />
          <Environment preset="city" />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={false} 
          />
        </Canvas>
        
        {/* Fallback in case Canvas doesn't load */}
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
          <div className="text-center p-4">
            <FiCloud className="mx-auto text-4xl text-gray-400 mb-2" />
            <p className="text-gray-500 dark:text-gray-300">3D visualization loading...</p>
          </div>
        </div>
        
        {/* Floating indicators */}
        <motion.div 
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-4 left-4 bg-blue-500 dark:bg-purple-600 w-12 h-12 rounded-full opacity-20 blur-xl"
        />
        <motion.div 
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute top-4 right-4 bg-purple-500 dark:bg-blue-600 w-16 h-16 rounded-full opacity-20 blur-xl"
        />
      </motion.div>

      {/* Cloud decorations */}
      <AnimatePresence>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{ 
              x: `+=${(Math.random() - 0.5) * 100}`,
              opacity: [0.3, 0.5, 0.3],
              transition: {
                duration: Math.random() * 30 + 20,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
            exit={{ opacity: 0 }}
            className="absolute pointer-events-none text-gray-300 dark:text-gray-600"
            style={{
              fontSize: `${Math.random() * 3 + 2}rem`,
            }}
          >
            <FiCloud />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotFoundPage;