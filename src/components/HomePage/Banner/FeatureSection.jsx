import React from 'react'
import { FiUsers, FiLayers, FiBriefcase, FiAward } from 'react-icons/fi';
import { motion } from 'framer-motion';

function FeatureSection() {

    // Feature cards data
    const features = [
        {
            icon: <img src="/icons/expert.svg" alt="expert" className="w-8 h-8 sm:w-10 sm:h-10" />,
            bgColor: "bg-blue-100 dark:bg-blue-900",
            title: "Expert Instructors",
            description: "Learn from industry professionals with years of practical experience."
        },
        {
            icon: <img src="/icons/project.svg" alt="expert" className="w-8 h-8 sm:w-10 sm:h-10" />,
            bgColor: "bg-purple-100 dark:bg-purple-900",
            title: "Project-based Learning",
            description: "Gain hands-on experience by working on real-world projects."
        },
        {
            icon: <img src="/icons/briefcase.svg" alt="expert" className="w-8 h-8 sm:w-10 sm:h-10" />,
            bgColor: "bg-green-100 dark:bg-green-900",
            title: "Internship Opportunities",
            description: "Get placed in top companies with our internship programs."
        },
        {
            icon: <img src="/icons/medal.svg" alt="expert" className="w-8 h-8 sm:w-10 sm:h-10" />,
            bgColor: "bg-yellow-100 dark:bg-yellow-900",
            title: "Certification Programs",
            description: "Earn recognized certifications to boost your career prospects."
        }
    ];

    return (
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
                                {/* <div className={`mb-3 sm:mb-4 p-2 sm:p-3 ${feature.bgColor} rounded-full`}> */}
                                    {feature.icon}
                                {/* </div> */}
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
    )
}

export default FeatureSection