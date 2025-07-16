import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTools, FaChalkboardTeacher, FaTasks, FaRocket } from "react-icons/fa";
import FreeDemoForm from "../ContactUs/FreeDemoForm"

const SubscribeDemo = () => {
  const [showForm, setShowForm] = useState(false);
  const benefits = [
    {
      icon: "/icons/tools.svg",
      title: "Practical Learning with Hands-on Experience",
      description: "Gain real-world skills through interactive sessions and practical exercises."
    },
    {
      icon: "/icons/teaching.svg",
      title: "Engage Directly with Expert Instructors",
      description: "Learn from industry professionals with years of practical experience."
    },
    {
      icon: "/icons/project.svg",
      title: "Evaluate Your Skills and Identify Growth Areas",
      description: "Get personalized feedback on your current skill level and improvement roadmap."
    },
    {
      icon: "/icons/rocket.svg",
      title: "Build Confidence for Your Career Success",
      description: "Develop the skills and mindset needed to excel in your dream job."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Contact Now for a Free Demo{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Get Placed</span>
              <span className="absolute left-0 bottom-0 h-2 w-full bg-blue-400/70 dark:bg-blue-600/70 -z-0 transform translate-y-1"></span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6"
          >
            The first step toward building a successful career. Experience the course firsthand, explore essential industry tools, and grasp key concepts.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Engage with expert trainers, ask your questions, and get a feel for the teaching approach to ensure you receive the best training possible.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 mb-4 bg-blue-200 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                  <img src={benefit.icon} alt="icons" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        {showForm && <FreeDemoForm onClose={() => setShowForm(false)} title1={"Try a Class — On Us!"} title2={"Connect with Us"}/>}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all" onClick={() => setShowForm(true)}>
            Book Your Free Demo Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SubscribeDemo;