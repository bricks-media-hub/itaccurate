import { motion } from 'framer-motion';
import React from 'react';
import { useLoaderData } from "react-router-dom";

function WhatIs() {
  const courseDetail = useLoaderData();

  return (
    <section className="py-12 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left Card - Image Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 relative bg-transparent rounded-2xl p-6 transition-all duration-300"
        >
          {/* Gradient background overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10" />

          {/* Sticky image container */}
          <div className="sticky top-32" style={{ height: 'fit-content' }}>
            <motion.div
              whileHover={{
                scale: 1.05,
                rotateY: -5,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              className="flex flex-col items-center"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
            >
              <div className="relative w-full" style={{ height: 'auto' }}>
                <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <img
                    src={courseDetail.bgImage}
                    alt={courseDetail.whatIs.name}
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: '80vh' }} // Adjust as needed
                  />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-transparent hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </motion.div>
        {/* Right Card - Description */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{
            y: -6,
            rotateY: 5,
            scale: 1.02,
            transition: { duration: 0.4, ease: "easeOut" },
          }}
          className="flex-1 relative bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          {/* Gradient Glow Background */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />

          {/* Heading with gradient and animated underline */}
          <h2 className="relative inline-block text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-purple-400 mb-6">
            {`What is ${courseDetail.whatIs?.name}?`}
            <span className="absolute left-0 -bottom-1 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse" />
          </h2>

          {/* Bullet Points */}
          <div className="space-y-4">
            {courseDetail.whatIs.points.map((point, index) => (
              <div key={index} className="flex items-start gap-3 group">
                <div className="mt-1 w-2.5 h-2.5 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform" />
                <p className=" sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium group-hover:text-blue-700 dark:group-hover:text-indigo-300 transition-colors duration-200">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default WhatIs;
