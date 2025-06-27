import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const planeRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      if (planeRef.current) {
        planeRef.current.style.transform = `perspective(1000px) rotateY(${x * 10 - 5}deg) rotateX(${y * -10 + 5}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 overflow-hidden">
      {/* Text Content */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full md:w-1/2 text-center md:text-left md:pr-10 z-10"
      >
        <motion.h1 
          animate={{
            scale: [1, 1.05, 1],
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
          className="text-8xl sm:text-9xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 bg-[length:200%]"
        >
          404
        </motion.h1>
        
        <motion.h2 
          whileHover={{ scale: 1.02 }}
          className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100"
        >
          Oops, nothing here...
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8 text-gray-600 dark:text-gray-400 text-lg leading-relaxed"
        >
          The first six aircraft were on their way and moved to alternate routes.<br />
          Try navigating back to where you came from.
        </motion.p>
        
        <div className="flex justify-center md:justify-start">
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="px-8 py-4 rounded-xl font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all relative overflow-hidden group"
          >
            <span className="relative z-10">Go Back</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.button>
        </div>
      </motion.div>

      {/* Image Section */}
      <motion.div 
        ref={planeRef}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mt-10 md:mt-0 md:w-1/2 flex justify-center transition-transform duration-300 ease-out will-change-transform"
      >
        <div className="relative">
          <img 
            src="https://plus.unsplash.com/premium_photo-1682310096066-20c267e20605?q=80&w=1512&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Aircraft in flight"
            className="rounded-2xl shadow-2xl w-full max-w-md object-cover h-64 sm:h-96 dark:opacity-90 hover:opacity-100 transition-opacity duration-300 border-4 border-white dark:border-gray-700"
          />
          <motion.div 
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -bottom-6 -left-6 bg-blue-500 dark:bg-purple-600 w-16 h-16 rounded-full opacity-20 blur-xl"
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
            className="absolute -top-6 -right-6 bg-purple-500 dark:bg-blue-600 w-20 h-20 rounded-full opacity-20 blur-xl"
          />
        </div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.1
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            transition: {
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
          className="absolute rounded-full bg-blue-400 dark:bg-purple-400"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
          }}
        />
      ))}
    </div>
  );
};

export default NotFoundPage;