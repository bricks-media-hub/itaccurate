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
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
            {/* Content Section */}
            <div className="lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg mb-8 sm:mb-12"
              >
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="p-2 sm:p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                    <FaSearchDollar className="text-indigo-600 dark:text-indigo-300 text-lg sm:text-xl" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-300">
                    CAREER PLACEMENTS
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-indigo-900 dark:text-white mb-4 sm:mb-6">
                  List of Students Successfully Placed from IT ACCURATE
                </h1>

                <div className="space-y-4 sm:space-y-6 text-gray-700 dark:text-gray-300">
                  <p className="text-base sm:text-lg leading-relaxed">
                    In today's fast-paced IT industry, a degree alone isn't enough to stand out. With more graduates entering the job market and fewer opportunities, staying ahead means mastering the tools and technologies that leading companies rely on.
                  </p>

                  <p className="text-base sm:text-lg leading-relaxed">
                    At IT ACCURATE, we prioritize practical, real-world skills through hands-on learning experiences. Our courses are tailored to provide you with both the technical expertise and the confidence to excel in your career.
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4 my-6 sm:my-8">
                    {placementStats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                          <img 
                            src={stat.icon} 
                            alt={stat.label} 
                            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" 
                          />
                          <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                            {stat.value}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                          {stat.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-yellow-50 dark:bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-l-4 border-yellow-500">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-2 mt-1">
                        <img 
                          src="/icons/teaching.svg" 
                          alt="teaching" 
                          className="w-4 h-4 sm:w-5 sm:h-5" 
                        />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-3">
                          <span className="text-yellow-600 dark:text-yellow-400">Training and Placement:</span>
                        </h3>
                        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
                          At IT ACCURATE, we're proud to have a team of expert trainers with real-world experience, many of whom have worked at leading multinational companies. Their expertise and involvement in live projects ensure our students gain practical knowledge and industry insights.
                        </p>
                        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                          Our dedicated placement team is here to guide you through every step of your job search, helping you land the role that's right for you. Ready to boost your career? Get in touch with us today to learn more about our programs and enjoy a free demo session!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side Illustration - Hidden on mobile */}
            {showForm && <FreeDemoForm onClose={() => setShowForm(false)} />}
            <div className="hidden lg:block lg:w-1/3 relative">
              <div className="sticky top-24 space-y-4 sm:space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative group"
                >
                  <img
                    src="./placement.svg"
                    alt="Placement Illustration"
                    className="w-full h-auto rounded-2xl transform transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute -inset-4 bg-yellow-100/50 dark:bg-gray-700/50 rounded-2xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -z-10 blur-2xl bg-gradient-to-br from-yellow-400/30 to-blue-500/20 w-[300px] h-[300px] rounded-full top-10 right-10 rotate-12"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                      <MdOutlineContactSupport className="text-indigo-600 dark:text-indigo-300 text-lg sm:text-xl" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                      Start Your Tech Career
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-5">
                    Schedule a free consultation with our career advisors to discuss your goals and how we can help you achieve them.
                  </p>
                  <button
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-all duration-300 shadow hover:shadow-md text-sm sm:text-base"
                    onClick={() => setShowForm(true)}
                  >
                    <span>Get Free Career Guidance</span>
                    <FaArrowRight />
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="p-4 sm:p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/30"
                >
                  <h4 className="text-sm sm:text-base font-medium text-indigo-900 dark:text-indigo-200 mb-2 sm:mb-3">
                    What our students say:
                  </h4>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="flex-shrink-0 text-indigo-600 dark:text-indigo-300 text-2xl sm:text-3xl">"</div>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 italic">
                      "The practical training and placement support at IT ACCURATE helped me transition from fresh graduate to software engineer at a top tech firm in just 3 months."
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-indigo-800 dark:text-indigo-200 font-medium">
                    — Rahul S., Placed at TechSolutions Inc.
                  </div>
                </motion.div>
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