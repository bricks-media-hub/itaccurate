import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { useLoaderData } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import { useState } from 'react';
import FreeDemoForm from '../ContactUs/FreeDemoForm';


function KeyFeatures() {
  const courseDetail = useLoaderData();
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-100 via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 min-h-[600px] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Heading with enhanced gradient and animation */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-12 lg:mb-16 relative"
        >
          <span className="relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              <span className='text-slate-800 dark:text-white'>Key Features of </span>{courseDetail.whatIs.name} Training
            </span>
          </span>
        </motion.h2>

        {/* Responsive grid with enhanced hover effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {courseDetail.keyFeatures.map((feature, index) => {
            const IconComponent = FiIcons[feature.icon];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.03, boxShadow: "0 15px 30px -5px rgba(168, 85, 247, 0.3)" }}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-2xl group h-full"
              >

                {/* Content container with better visibility control */}
                <div className="relative bg-white/70 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-2 sm:p-4 lg:p-6 shadow-md hover:shadow-xl hover:shadow-purple-500/20 dark:hover:shadow-purple-400/10 transition-all duration-500 h-full flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 lg:gap-5 text-center">
                    {IconComponent && (
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <IconComponent className="text-purple-600 dark:text-purple-400 text-2xl sm:text-3xl lg:text-6xl p-2 sm:p-3 bg-white/70 dark:bg-gray-800/70 rounded-xl backdrop-blur-sm" />
                      </motion.div>
                    )}
                    <p className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-100 mt-2">
                      {feature.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}

        </div>
        {/* showing form on click of enroll button */}
        {showForm && (
          <FreeDemoForm onClose={() => setShowForm(false)} />
        )}

        {/* Call to action button with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 lg:mt-16 text-center"
        >
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-base sm:text-lg rounded-full hover:shadow-xl hover:shadow-purple-500/40 dark:hover:shadow-purple-400/30 transition-all duration-500 flex items-center justify-center mx-auto gap-2 sm:gap-3" onClick={() => setShowForm(true)}>
            <FiStar className="animate-pulse text-lg sm:text-xl" />
            <span>Enroll Now</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default KeyFeatures;