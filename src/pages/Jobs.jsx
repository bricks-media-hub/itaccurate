import React from 'react';
import { motion } from 'framer-motion';

function Jobs() {
  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header with animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-6">
            <motion.div
              whileHover={{ scale: 1.1, rotateY: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative w-16 h-16 sm:w-20 sm:h-20"
            >
              <img 
                src="./icons/job-icon.png" 
                alt="career opportunities"
                className="w-full h-full object-contain drop-shadow-lg"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'perspective(1000px) rotateY(10deg)'
                }}
              />
              <div className="absolute inset-0 rounded-full bg-blue-100/30 dark:bg-blue-900/20 shadow-inner"></div>
            </motion.div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Career Opportunities
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join our team of innovators and creators
          </p>
        </motion.div>

        {/* Main content with 3D effect card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl opacity-20 blur-lg dark:opacity-30"></div>
          
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 dark:opacity-20">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            </div>
            
            <div className="relative z-10 p-6 md:p-10 lg:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Image from Unsplash */}
                <div className="w-full lg:w-1/2">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="overflow-hidden rounded-lg shadow-lg"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                      alt="Office workspace"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                </div>
                
                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div 
                      whileHover={{ rotate: 10 }}
                      className="w-8 h-8 sm:w-10 sm:h-10"
                    >
                      <img 
                        src="./icons/job-clock.png" 
                        alt="hiring status" 
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                      Currently Hiring
                    </h2>
                  </div>
                  
                  <div className="space-y-5 sm:space-y-6">
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                      We're always looking for talented individuals to join our team.
                      While we don't have any open positions right now, we'd love to
                      hear from you!
                    </p>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                      <p className="text-blue-700 dark:text-blue-300 font-medium text-sm sm:text-base">
                        No jobs available at the moment. Please check back later.
                      </p>
                    </div>
                    
                    {/* <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                    >
                      Submit Your Resume
                    </motion.button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating decorative elements */}
        <div className="hidden lg:block">
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-10 w-8 h-8 rounded-full bg-blue-400 opacity-20 blur-md"
          ></motion.div>
          <motion.div
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute top-1/3 right-20 w-12 h-12 rounded-full bg-purple-400 opacity-20 blur-md"
          ></motion.div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;