import { useState } from 'react';
import FreeDemoForm from "../components/ContactUs/FreeDemoForm";
import { motion } from "framer-motion";
import { FaSearchDollar, FaArrowRight } from 'react-icons/fa';
import { MdOutlineContactSupport } from 'react-icons/md';
import SuccessfulStudentPlaced from '../components/Placement/SuccessfulStudentPlaced';
import OtherCareerStats from '../components/Placement/OtherCareerStats';
import SuccessStats from '../components/Placement/SuccessStats';
import SubscribeDemo from '../components/Placement/SubscribeDemo';

const Placements = () => {
  const [showForm, setShowForm] = useState(false);

  const placementStats = [
    { icon: '/icons/graduation.svg', value: "200+", label: "Students Trained" },
    { icon: '/icons/increase-graph.svg', value: "85%", label: "Placement Rate" },
    { icon: '/icons/briefcase2.svg', value: "50+", label: "Hiring Partners" },
  ];

  return (
    <div className="dark:bg-gray-900">
      {/* Header section */}
      <section className="mt-16">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 sm:p-8 transition-all duration-300">

            {/* Left Content */}
            <div className="lg:w-2/3 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-800 p-5 sm:p-8 rounded-2xl shadow-lg"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                    <img src='/icons/search-scope.svg' className="text-indigo-600 dark:text-indigo-300 text-xl w-6 h-6 sm:w-10 sm:h-10" />
                  </div>
                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-300 uppercase tracking-wide">
                    Career Placements
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900 dark:text-white leading-snug mb-5">
                  Students Successfully Placed from <br className="hidden sm:block" /> IT ACCURATE
                </h2>

                <div className="space-y-5 text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                  <p>
                    In today's fast-paced IT industry, a degree alone isn't enough to stand out. With increasing competition, mastering real-world tools and technologies is key.
                  </p>
                  <p>
                    At IT ACCURATE, we offer practical, hands-on training so you're equipped with industry-relevant skills and confidence to succeed in your tech career.
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                    {placementStats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex flex-col justify-center items-center gap-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition"
                      >
                          {/* icon */}
                          <div>
                            <img
                              src={stat.icon}
                              alt={stat.label}
                              className="w-7 h-7 sm:w-10 sm:h-10"
                            />
                          </div>
                          {/* title */}
                          <div className="text-xl font-bold text-gray-800 dark:text-white">
                            {stat.value}
                          </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Highlight Box */}
                  <div className="bg-yellow-50 dark:bg-gray-900 border-l-4 border-yellow-500 rounded-xl p-5 mt-6 sm:mt-8">
                    <div className="flex items-start gap-4">
                      <div className="bg-yellow-100 dark:bg-yellow-800/30 p-3 rounded-full">
                        <img src="/icons/teaching.svg" alt="Teaching" className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-yellow-700 dark:text-yellow-400 mb-2">
                          Training & Placement
                        </h3>
                        <p className="text-sm sm:text-base mb-2">
                          Our trainers are seasoned professionals with MNC experience and real project involvement, providing practical, live-scenario learning.
                        </p>
                        <p className="text-sm sm:text-base">
                          Our placement team supports you every step of the way. Get in touch for free career guidance and a demo session.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Section */}
            <div className="lg:w-1/3 w-full">
              <div className="lg:sticky lg:top-24 flex flex-col gap-6">

                {/* Image Section */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative group"
                >
                  <img
                    src="./placement.svg"
                    alt="Placement Illustration"
                    className="w-full h-auto rounded-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute -inset-4 bg-yellow-100/50 dark:bg-gray-700/40 rounded-2xl -z-10 blur-sm opacity-60 group-hover:opacity-90 transition-all duration-300"></div>
                  <div className="absolute -z-10 blur-2xl bg-gradient-to-br from-yellow-400/40 to-blue-500/20 w-[260px] h-[260px] rounded-full top-10 right-10 rotate-12"></div>
                </motion.div>

                {/* CTA Box */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="p-5 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                      <MdOutlineContactSupport className="text-indigo-600 dark:text-indigo-300 text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Start Your Tech Career
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Book a free consultation with our career advisors and explore how we can help you achieve your tech goals.
                  </p>
                  <button
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 shadow hover:shadow-md text-sm"
                    onClick={() => setShowForm(true)}
                  >
                    <span>Get Free Career Guidance</span>
                    <FaArrowRight />
                  </button>
                </motion.div>

                {/* Testimonial */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="p-5 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/30"
                >
                  <h4 className="text-sm font-medium text-indigo-900 dark:text-indigo-200 mb-2">
                    What Our Students Say:
                  </h4>
                  <div className="flex items-start gap-3">
                    <div className="text-indigo-600 dark:text-indigo-300 text-2xl">"</div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                      "The training and placement support helped me go from fresher to software engineer at a top tech company in just 3 months."
                    </p>
                  </div>
                  <div className="mt-2 text-xs text-indigo-800 dark:text-indigo-200 font-medium">
                    — Rahul S., Placed at TechSolutions Inc.
                  </div>
                </motion.div>

                {/* Optional Form */}
                {showForm && <FreeDemoForm onClose={() => setShowForm(false)} />}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Mobile CTA Button - Only shows on small screens */}
      <div className="lg:hidden fixed bottom-6 right-6 z-10">
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 animate-bounce"
          aria-label="Get career guidance"
        >
          <FaArrowRight className="text-xl" />
        </button>
      </div>

      {/* placed student data */}
      <SuccessfulStudentPlaced />
      <OtherCareerStats />
      <SuccessStats />
      <SubscribeDemo />
    </div>
  );
};

export default Placements;