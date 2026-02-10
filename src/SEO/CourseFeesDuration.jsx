import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FreeDemoForm from "../components/ContactUs/FreeDemoForm";
import { useLocation } from "react-router-dom";
import { SafeImage } from "../lib/SafeImage";

const CourseFeesDuration = ({ data }) => {
  const [showForm, setShowForm] = useState(false);
  // const [showSapFico, setShowFico] = useState(null);
  // const location = useLocation();

  // useEffect(() => {
  //   if (location.pathname === "/sap-fico-course-in-nagpur") {
  //     setShowFico(true);
  //   } else {
  //     setShowFico(false);
  //   }
  // }, [location.pathname]);

  if (!data) return null;

  return (
    <>
      {showForm && <FreeDemoForm onClose={() => setShowForm(false)} />}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Side - Heading and Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-indigo-700 dark:text-indigo-400 mb-6"
              dangerouslySetInnerHTML={{ __html: data.heading }}
            />
            <p
              className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          </motion.div>

          {/* Right Side - Illustration / Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="w-full h-full max-w-xl bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 border border-indigo-200 dark:border-gray-700">
              {data?.points?.map((point, index) => (
                <ul className="text-indigo-800 dark:text-indigo-300 text-base space-y-5">
                  <li className="flex items-start gap-3" key={index}>
                    <SafeImage
                      src={point?.icon}
                      alt="icon"
                      className="w-6 h-6"
                    />
                    <span>
                      <strong>{point?.point}</strong> – {point?.content}
                    </span>
                  </li>
                  <br />
                </ul>
              ))}
            </div>

            {/* Apply Now Button */}
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300 shadow-2xl mt-7"
              onClick={() => setShowForm(true)}
            >
              Apply Now
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CourseFeesDuration;
