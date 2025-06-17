import React, { useState } from "react";
import {
  FaProjectDiagram,
  FaGraduationCap,
  FaBriefcase,
  FaHandsHelping,
  FaChalkboardTeacher,
  FaNetworkWired,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const JobPreparation = () => {
  const [activeTab, setActiveTab] = useState("CourseCompletion");

  const tabData = {
    CourseCompletion: {
      title: "Achieving Course Milestones",
      items: [
        {
          icon: <FaGraduationCap className="text-xl" />,
          title: "Hands-On Training with Internships",
          desc: "Participate in internships to bridge the gap between theory and practice. Develop workplace-ready skills on real tasks.",
        },
        {
          icon: <FaProjectDiagram className="text-xl" />,
          title: "Industry-Driven Project Experience",
          desc: "Engage in market-standard projects to strengthen your portfolio and demonstrate your expertise.",
        },
        {
          icon: <FaBriefcase className="text-xl" />,
          title: "Resume Writing Excellence",
          desc: "Create an impactful, professional resume that highlights your strengths and achievements effectively.",
        },
      ],
    },
    InterviewPreparation: {
      title: "Interview Readiness Strategies",
      items: [
        {
          icon: <FaChalkboardTeacher className="text-xl" />,
          title: "Core Competency Development",
          desc: "Sharpen your technical and analytical abilities through targeted practice sessions.",
        },
        {
          icon: <FaHandsHelping className="text-xl" />,
          title: "Mock Interview Simulations",
          desc: "Experience realistic interviews with constructive feedback to refine your performance.",
        },
        {
          icon: <FaNetworkWired className="text-xl" />,
          title: "Dynamic Group Discussions",
          desc: "Enhance communication and collaboration skills through interactive team settings.",
        },
      ],
    },
    Placement: {
      title: "Securing Your Dream Job",
      items: [
        {
          icon: <FaBriefcase className="text-xl" />,
          title: "Ongoing Career Support",
          desc: "Get assistance throughout your job search journey with personalized guidance.",
        },
        {
          icon: <FaHandsHelping className="text-xl" />,
          title: "Exclusive Referral Opportunities",
          desc: "Tap into exclusive openings through our extensive industry network and referral programs.",
        },
      ],
    },
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
        Your Journey to <span className="text-blue-600 dark:text-blue-400">Professional Success</span>
      </h2>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {Object.entries({
          CourseCompletion: "Skill Development",
          InterviewPreparation: "Interview Prep",
          Placement: "Placement Support",
        }).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-full font-medium text-sm sm:text-base transition duration-300 backdrop-blur-md shadow-md border ${
              activeTab === key
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-6 sm:p-8 rounded-3xl shadow-xl"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-center text-blue-700 dark:text-blue-300 mb-6">
            {tabData[activeTab].title}
          </h3>

          <ul className="space-y-6">
            {tabData[activeTab].items.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-4 bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-transform hover:scale-[1.02]"
              >
                <div className="text-blue-500 dark:text-blue-400 mt-1">{item.icon}</div>
                <div>
                  <h4 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">{item.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default JobPreparation;
