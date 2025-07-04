
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiUsers, FiLayers, FiBriefcase, FiAward } from 'react-icons/fi';
import FreeDemoForm from '../../ContactUs/FreeDemoForm';
import RotatingImages from './RotatingImages';
import CompanyLogoGlobe from './CompanyLogoGlobe';
import BackgroundGlobe from './BackgroundGlobe';

function Banner() {
  const [showForm, setShowForm] = useState(false);
  // Feature cards data
  const features = [
    {
      icon: <FiUsers className="text-blue-600 dark:text-blue-400 text-xl sm:text-2xl" />,
      bgColor: "bg-blue-100 dark:bg-blue-900",
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of practical experience."
    },
    {
      icon: <FiLayers className="text-purple-600 dark:text-purple-400 text-xl sm:text-2xl" />,
      bgColor: "bg-purple-100 dark:bg-purple-900",
      title: "Project-based Learning",
      description: "Gain hands-on experience by working on real-world projects."
    },
    {
      icon: <FiBriefcase className="text-green-600 dark:text-green-400 text-xl sm:text-2xl" />,
      bgColor: "bg-green-100 dark:bg-green-900",
      title: "Internship Opportunities",
      description: "Get placed in top companies with our internship programs."
    },
    {
      icon: <FiAward className="text-yellow-600 dark:text-yellow-400 text-xl sm:text-2xl" />,
      bgColor: "bg-yellow-100 dark:bg-yellow-900",
      title: "Certification Programs",
      description: "Earn recognized certifications to boost your career prospects."
    }
  ];

  return (

    <div className="relative bg-white dark:bg-gray-900 transition-colors duration-300 pb-0 w-full">
      {showForm && <FreeDemoForm onClose={() => setShowForm(false)} />}

      {/* Banner Section */}
<section className="relative w-full flex flex-col-reverse md:flex-row items-center justify-center px-4 py-12 sm:py-16 md:py-20 md:min-h-[70vh] overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">

  {/* Stars Background Animation */}
  <div className="absolute inset-0 overflow-hidden z-0">
    {[...Array(60)].map((_, i) => (
      <div 
        key={i}
        className="absolute rounded-full bg-white dark:bg-blue-300 opacity-80"
        style={{
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `twinkle ${Math.random() * 5 + 3}s infinite ${Math.random() * 2}s alternate`,
          transform: `scale(${Math.random() + 0.5})`
        }}
      />
    ))}
    {/* Shooting stars */}
    {[...Array(3)].map((_, i) => (
      <div 
        key={`shooting-${i}`}
        className="absolute h-0.5 bg-gradient-to-r from-transparent to-white dark:to-blue-300"
        style={{
          width: `${Math.random() * 100 + 50}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: 0,
          animation: `shootingStar ${Math.random() * 10 + 10}s infinite ${Math.random() * 20}s`,
          transform: `rotate(${Math.random() * 50 - 25}deg)`
        }}
      />
    ))}
  </div>

  {/* Background Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 opacity-40 dark:opacity-60 backdrop-blur-sm z-0" />

  {/* Left Text Section */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="w-full md:w-[52%] text-center md:text-left z-10 md:ml-14"
  >
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
      LEARN WITH <span className="text-blue-600 dark:text-blue-400">IT ACCURATE</span>
    </h1>
    <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-6">
      FOR BEST JOB OPPORTUNITY
    </p>

    <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="#training-courses"
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md text-base"
      >
        📄 Explore Courses
      </motion.a>
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="#contact"
        onClick={() => setShowForm(true)}
        className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 font-semibold py-3 px-6 rounded-lg shadow-md text-base"
      >
        📧 Contact Now
      </motion.a>
    </div>
  </motion.div>

  {/* Right Globe Section */}
  <div className="relative w-full md:w-[48%] h-[300px] sm:h-[380px] md:h-[430px] lg:h-[480px] flex items-center justify-center z-0">
    <div className="absolute inset-0 -z-10">
      <CompanyLogoGlobe />
    </div>
  </div>
</section>

      {/* Feature Cards Section - Half Overlaid on Banner */}
      <div className="relative w-full mt-8 md:-mt-16 lg:-mt-20 z-20">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (index * 0.2), duration: 0.6 }}
                className="bg-white dark:bg-gradient-to-r dark:from-slate-700 dark:to-slate-800 rounded-lg sm:rounded-xl shadow-md sm:shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg sm:hover:shadow-2xl transition-all duration-300"
              >
                <div className="p-2 sm:p-4 flex flex-col items-center text-center">
                  <div className={`mb-3 sm:mb-4 p-2 sm:p-3 ${feature.bgColor} rounded-full`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;


