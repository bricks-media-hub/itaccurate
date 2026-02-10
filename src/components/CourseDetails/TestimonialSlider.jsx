import React from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { SafeImage } from "../../lib/SafeImage";

const TestimonialMarquee = ({ reviews }) => {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center text-center lg:text-left gap-4 w-full lg:w-1/3"
        >
          <button className="self-center max-w-3xl mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-md text-sm sm:text-base font-medium shadow-lg hover:bg-blue-700 transition-colors duration-300">
            Google Review
          </button>
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-center gap-2 sm:gap-5">
            <span className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">
              Rating
            </span>
            <div className="flex space-x-1 justify-center items-center">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  className="text-yellow-400 text-lg sm:text-xl"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  ★
                </motion.span>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center items-center lg:items-center mt-2">
            <div className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300">
              137 Students
            </div>
            <div className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300">
              Enrolled
            </div>
          </div>
        </motion.div>

        {/* Right Section (Marquee) */}
        <div className="relative w-full lg:w-2/3">
          <Marquee gradient={false} speed={50} pauseOnHover={true}>
            {reviews.map((item, index) => (
              <motion.div
                key={index}
                className="w-64 sm:w-72 md:w-80 lg:w-96 mx-2 sm:mx-3 flex-shrink-0"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 shadow-lg border border-gray-200 dark:border-gray-700 h-auto flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-3">
                      <SafeImage
                        src={
                          item.image === "default"
                            ? "/icons/profile-user.svg"
                            : item.image || "/icons/profile-user.svg"
                        }
                        alt={item.name}
                        draggable={false}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-3 border-2 border-blue-400"
                      />
                      <div>
                        <h4 className="font-bold text-sm sm:text-base text-blue-700 dark:text-blue-400">
                          {item.name.toUpperCase()}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          {item.date}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-800 dark:text-gray-300 text-sm sm:text-base italic line-clamp-4">
                      "{item.review}"
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex space-x-1 justify-center items-center">
                      {[...Array(5)].map((_, i) => (
                        <motion.span
                          key={i}
                          className="text-yellow-400 text-lg sm:text-xl"
                          whileHover={{ scale: 1.2 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          ★
                        </motion.span>
                      ))}
                    </div>
                    <SafeImage
                      src="/icons/google-logo.svg"
                      alt="Google"
                      className="w-4 sm:w-5"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </Marquee>

          {/* Left Fade Overlay */}
          <div className="pointer-events-none absolute top-0 left-0 h-full w-4 sm:w-16 bg-gradient-to-r from-blue-50 dark:from-gray-900 to-transparent z-10" />
          {/* Right Fade Overlay */}
          <div className="pointer-events-none absolute top-0 right-0 h-full w-4 sm:w-16 bg-gradient-to-l from-blue-50 dark:from-gray-900 to-transparent z-10" />
        </div>
      </div>
    </section>
  );
};

export default TestimonialMarquee;
