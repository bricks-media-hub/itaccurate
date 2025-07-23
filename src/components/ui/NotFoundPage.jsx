import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { FiArrowLeft, FiCompass, FiHome, FiNavigation, FiCloud, FiMap } from 'react-icons/fi';

// Enhanced 3D Plane Component with better details
function EnhancedPlane({ mouse }) {
  const mesh = useRef();
  const propeller = useRef();

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

      // Add subtle floating effect
      mesh.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
    }

    if (propeller.current) {
      propeller.current.rotation.z += 0.2;
    }
  });

  return (
    <group>
      {/* Main fuselage */}
      <mesh ref={mesh} position={[0, -0.5, 0]}>
        <boxGeometry args={[2, 0.3, 0.5]} />
        <meshStandardMaterial
          color="#4f46e5"
          metalness={0.8}
          roughness={0.1}
          envMapIntensity={1}
        />
      </mesh>

      {/* Wings */}
      <mesh position={[0, -0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[1.5, 0.1, 1.8]} />
        <meshStandardMaterial
          color="#6366f1"
          metalness={0.7}
          roughness={0.2}
          envMapIntensity={0.8}
        />
      </mesh>

      {/* Tail */}
      <mesh position={[0, -0.2, -0.8]}>
        <boxGeometry args={[0.2, 0.5, 0.2]} />
        <meshStandardMaterial
          color="#818cf8"
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Propeller */}
      <mesh ref={propeller} position={[1.1, -0.5, 0]}>
        <boxGeometry args={[0.4, 0.05, 0.4]} />
        <meshStandardMaterial
          color="#c7d2fe"
          metalness={0.9}
          roughness={0.05
        } />
      </mesh>

      {/* Cockpit */}
      <mesh position={[0.6, -0.35, 0]} rotation={[0, Math.PI / 4, 0]}>
        <sphereGeometry args={[0.2, 16, 16, 0, Math.PI]} />
        <meshStandardMaterial
          color="#a5b4fc"
          metalness={0.9}
          roughness={0.05
          }
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

const NotFoundPage = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const mouse = useRef({ x: 0, y: 0 });
  const [activeButton, setActiveButton] = useState(null);
  const [canvasLoaded, setCanvasLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Set a small timeout to ensure Three.js has time to initialize
    const timer = setTimeout(() => setCanvasLoaded(true), 300);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
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
      boxShadow: "0 15px 30px -5px rgba(99, 102, 241, 0.5)",
      transition: { duration: 0.3 }
    },
    tap: {
      y: 0,
      scale: 0.98
    }
  };

  const iconVariants = {
    hover: {
      rotate: [0, -10, 10, -5, 0],
      scale: 1.2,
      transition: { duration: 0.6 }
    },
    tap: {
      rotate: 0,
      scale: 1
    }
  };

  const floatingVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center p-6 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-300 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              x: `+=${(Math.random() - 0.5) * 50}`,
              y: `+=${(Math.random() - 0.5) * 50}`,
              opacity: [0, 0.4, 0],
              transition: {
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 5
              }
            }}
            className="absolute rounded-full bg-blue-400/30 dark:bg-purple-400/30"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              filter: 'blur(1.5px)'
            }}
          />
        ))}
      </div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "backOut" }}
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
            className="text-8xl sm:text-9xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 bg-[length:200%]"
          >
            404
          </motion.h1>
        </motion.div>

        <motion.h2
          whileHover={{ scale: 1.02 }}
          className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100 flex items-center justify-center md:justify-start"
        >
          <FiMap className="mr-3 text-blue-500 dark:text-purple-400" />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Lost in the Clouds
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8 text-gray-600 dark:text-gray-300 text-lg leading-relaxed"
        >
          The coordinates you've entered don't match any known destination in our navigation system.
          It seems you've entured off the charted path. Don't worry - even the best pilots
          occasionally need to recalculate their route.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onHoverStart={() => handleHoverStart('back')}
            onHoverEnd={handleHoverEnd}
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-blue-600 to-blue-500 text-white flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            <motion.span variants={iconVariants}>
              <FiArrowLeft className="text-lg" />
            </motion.span>
            <span>Previous Waypoint</span>
          </motion.button>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onHoverStart={() => handleHoverStart('home')}
            onHoverEnd={handleHoverEnd}
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            <motion.span variants={iconVariants}>
              <FiHome className="text-lg" />
            </motion.span>
            <span>Return to Base</span>
          </motion.button>
        </div>

        {/* Status Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-4 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl border border-blue-200/50 dark:border-gray-600 flex items-start shadow-sm"
        >
          <div className="bg-blue-100 dark:bg-purple-900 p-2 rounded-lg mr-3">
            <FiNavigation className="text-blue-600 dark:text-purple-300 text-xl" />
          </div>
          <div>
            <h4 className="font-medium text-blue-800 dark:text-blue-100">Navigation Advisory</h4>
            <p className="text-sm text-blue-600/90 dark:text-blue-200/90">
              {activeButton === 'back'
                ? "Recalculating route to previous coordinates..."
                : activeButton === 'home'
                ? "Setting course for home base..."
                : "Systems ready for navigation input."}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* 3D Plane Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "backOut" }}
        className="mt-10 md:mt-0 md:w-1/2 h-64 sm:h-96 w-full relative"
        style={{ minHeight: '400px' }}
      >
        {canvasLoaded ? (
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
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />
            <EnhancedPlane mouse={mouse} />
            <Environment preset="dawn" />
            <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
            />
          </Canvas>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center p-4"
            >
              <FiCloud className="mx-auto text-4xl text-gray-400 mb-2" />
              <p className="text-gray-500 dark:text-gray-300">Initializing navigation systems...</p>
            </motion.div>
          </div>
        )}

        {/* Floating indicators */}
        <motion.div
          variants={floatingVariants}
          animate="float"
          className="absolute -bottom-10 -left-10 bg-blue-500/20 dark:bg-purple-600/20 w-24 h-24 rounded-full opacity-30 blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="float"
          transition={{ delay: 0.5 }}
          className="absolute -top-10 -right-10 bg-purple-500/20 dark:bg-blue-600/20 w-32 h-32 rounded-full opacity-30 blur-xl"
        />
      </motion.div>

      {/* Cloud decorations */}
      <AnimatePresence>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
              rotate: Math.random() * 360
            }}
            animate={{
              x: `+=${(Math.random() - 0.5) * 100}`,
              y: `+=${(Math.random() - 0.5) * 30}`,
              opacity: [0.3, 0.7, 0.3],
              rotate: `+=${(Math.random() - 0.5) * 20}`,
              transition: {
                duration: Math.random() * 40 + 30,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
            exit={{ opacity: 0 }}
            className="absolute pointer-events-none text-gray-300/80 dark:text-gray-600/80"
            style={{
              fontSize: `${Math.random() * 4 + 2}rem`,
              zIndex: Math.floor(Math.random() * 10)
            }}
          >
            <FiCloud />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Subtle footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-400 dark:text-gray-500"
      >
        Navigation System v2.4.1 • © {new Date().getFullYear()} Airspace Technologies
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
