import React, { useState } from "react";
import {
  FaProjectDiagram,
  FaGraduationCap,
  FaBriefcase,
  FaHandsHelping,
  FaChalkboardTeacher,
  FaNetworkWired,
  FaUserShield,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const JobPreparation = () => {
  const [activeTab, setActiveTab] = useState("CourseCompletion");

  const tabs = [
    { id: "CourseCompletion", label: "Skill Development" },
    { id: "InterviewPreparation", label: "Interview Mastery" },
    { id: "Placement", label: "Career Placement" },
  ];

  const tabContent = {
    CourseCompletion: [
      {
        icon: <img src="/icons/graduation.svg" alt="graduation" className="w-11 h-11"/>,
        title: "Hands-On Training with Internships",
        description:
          "Participate in our internship opportunities to bridge the gap between theory and practice. Develop workplace-ready skills while working on tasks that mirror real-world scenarios.",
      },
      {
        icon: <img src="/icons/blockchain.svg" alt="graduation" className="w-11 h-11"/>,
        title: "Industry-Driven Project Experience",
        description:
          "Engage in projects designed to meet market standards. Strengthen your portfolio with practical implementations that demonstrate your expertise and innovation.",
      },
      {
        icon: <img src="/icons/resume-prep.svg" alt="graduation" className="w-11 h-11"/>,
        title: "Resume Writing Excellence",
        description:
          "Create an impactful resume that highlights your strengths and achievements effectively. Impress employers with a professional and tailored profile.",
      },
    ],
    InterviewPreparation: [
      {
        icon: <img src="/icons/teaching.svg" alt="graduation" className="w-11 h-11"/>,
        title: "Core Competency Development",
        description:
          "Sharpen your technical and analytical abilities with targeted practice sessions. Gain the confidence to tackle interview challenges with ease.",
      },
      {
        icon: <img src="/icons/help.svg" alt="graduation" className="w-11 h-11"/>,
        title: "Mock Interview Simulations",
        description:
          "Participate in realistic interview exercises that mimic actual hiring processes. Get constructive feedback to refine your performance.",
      },
      {
        icon: <img src="/icons/folder-network.svg" alt="graduation" className="w-11 h-11"/>,
        title: "Dynamic Group Discussions",
        description:
          "Enhance your communication and collaboration skills through interactive group sessions. Learn how to articulate your ideas effectively in a team setting.",
      },
    ],
    Placement: [
      {
        icon: <img src="/icons/job-assist.svg" alt="graduation" className="w-11 h-11"/>,
        title: "Ongoing Career Support",
        description:
          "Receive dedicated assistance throughout your job search until you secure a role with a leading organization. Benefit from personalized guidance at every step.",
      },
      {
        icon: <img src="/icons/referral.svg" alt="graduation" className="w-11 h-11"/>,
        title: "Exclusive Referral Opporturnity",
        description:
          "Leverage our extensive network for access to exclusive job openings. Open doors to exciting career paths through our referral program.",
      },
      {
        icon: <img src="/icons/user-shield.svg" alt="graduation" className="w-11 h-11"/>,
        title: "Job Guarantee Guidance",
        description:
          "Receive dedicated career support from industry mentors, resume optimization, and personalized mock interviews—ensuring you're fully prepared and placed with confidence.",
      }

    ],
  };

  const tabColors = {
    CourseCompletion: "from-purple-600 to-indigo-600",
    InterviewPreparation: "from-blue-600 to-cyan-600",
    Placement: "from-emerald-600 to-teal-600",
  };

  return (
    <section className="w-full px-4 py-20 dark:text-white bg-gradient-to-b from-slate-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">
            CAREER ACCELERATOR
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              <span className="text-slate-800 dark:text-white">Your Journey to</span> Professional Success
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Comprehensive training and support to launch and advance your career
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === tab.id
                  ? `text-white bg-gradient-to-r ${tabColors[tab.id]} shadow-lg`
                  : "bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg"
                }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {tabContent[activeTab].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: `0 15px 30px -5px rgba(168, 85, 247, 0.3)` }}
                className={`bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-xl border-t-4 flex items-center justify-center flex-col w-full ${activeTab === "CourseCompletion"
                    ? "border-purple-500"
                    : activeTab === "InterviewPreparation"
                      ? "border-blue-500"
                      : "border-emerald-500"
                  }`}
              >
                <div
                  className={`w-16 h-16 rounded-full mb-6 flex items-center justify-center ${activeTab === "CourseCompletion"
                      ? "bg-purple-500"
                      : activeTab === "InterviewPreparation"
                        ? "bg-blue-500"
                        : "bg-emerald-500"
                    }`}
                >
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-800 dark:text-white self-start">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default JobPreparation;