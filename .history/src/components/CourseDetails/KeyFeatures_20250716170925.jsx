import { motion } from 'framer-motion';
import { FiStar, FiArrowRight } from 'react-icons/fi';
import { Link, useLoaderData } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import { useState } from 'react';
import FreeDemoForm from '../ContactUs/FreeDemoForm';

function KeyFeatures() {
  const courseDetail = useLoaderData();
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 sm:w-40 sm:h-40 bg-purple-500/10 dark:bg-purple-700/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl z-0" />
      <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-48 sm:h-48 bg-blue-500/10 dark:bg-blue-700/20 rounded-full translate-x-1/3 translate-y-1/3 blur-xl z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced heading with subtle animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-black dark:text-white">
              Key Features of <span className='text-blue-600'>{courseDetail.whatIs.name}</span>
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive training designed to give you real-world skills
          </p>
        </motion.div>

        {/* Responsive grid with improved card design */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {courseDetail.keyFeatures.map((feature, index) => {
            // const IconComponent = FiIcons[feature.icon];
            const delay = index * 0.08;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -8,
                  boxShadow:
                    "0 20px 25px -5px rgba(99, 102, 241, 0.1), 0 10px 10px -5px rgba(99, 102, 241, 0.04)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay,
                }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                className="relative group w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                <div className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/70 dark:border-gray-700/50 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                  <div className="flex flex-col items-center text-center flex-grow">
                    {/* {IconComponent && ( */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        className="mb-4 sm:mb-6 p-3 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl"
                      >
                        {/* <IconComponent className="text-blue-600 dark:text-blue-400 text-3xl sm:text-4xl" /> */}
                        <img src={feature?.icon} alt="icons" className='w-14 h-14'/>
                      </motion.div>
                     {/* )} */}

                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                      {feature.text}
                    </h3>

                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                      {feature.description || "Comprehensive coverage with practical examples"}
                    </p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium mt-auto cursor-pointer" onClick={() => setShowForm(true)}>
                      <span>Learn more</span>
                      <FiArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>


        {/* Enhanced CTA section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 text-center"
        >
          <button
            onClick={() => setShowForm(true)}
            className="relative px-8 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg rounded-full hover:shadow-xl hover:shadow-blue-500/30 dark:hover:shadow-blue-400/20 transition-all duration-300 inline-flex items-center justify-center group overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2">
              <FiStar className="text-xl animate-pulse" />
              <span>Enroll Now</span>
              <FiArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
            </span>
          </button>

          <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
            Limited seats available. Start your journey today!
          </p>
        </motion.div>

        {/* Modal form */}
        {showForm && (
          <FreeDemoForm onClose={() => setShowForm(false)} title1={"Attend a Free Live Class"}/>
        )}
      </div>
    </section>
  );
}

export default KeyFeatures;