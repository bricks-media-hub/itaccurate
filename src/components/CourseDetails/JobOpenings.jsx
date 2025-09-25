import { motion } from "framer-motion";
import { useState } from "react";
import FreeDemoForm from "../ContactUs/FreeDemoForm";
import { FiExternalLink } from "react-icons/fi";

const bgcolors = {
  blue: "bg-[#275DF5]",
  grey: "bg-[#313131]",
  indigo: "bg-[#0A66C2]",
  green: "bg-[#00580D]",
  voilet: "bg-[#58003B]",
  orange: "bg-[#D24A00]",
};

function JobOpenings({ name, keyFeatures }) {
  const [showForm, setShowForm] = useState(false);

const searchJob = (link, profession) => {
  // Convert job name to lowercase and replace spaces with hyphens
  const jobProfession = profession.toLowerCase().replace(/\s+/g, '-');

  // Replace 'default-name' in the link with the job slug
  const finalLink = link.replace('job-name', jobProfession+"-jobs");

  // Open the new URL in a new tab
  window.open(finalLink, "_blank");
};

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 overflow-hidden relative">
      {/* Modal form */}
      {showForm && (
        <FreeDemoForm
          onClose={() => setShowForm(false)}
          title1="Attend a Free Live Class"
          title2="Reserve Your Seat"
        />
      )}

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 sm:w-40 sm:h-40 bg-purple-500/10 dark:bg-purple-700/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl z-0" />
      <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-48 sm:h-48 bg-blue-500/10 dark:bg-blue-700/20 rounded-full translate-x-1/3 translate-y-1/3 blur-xl z-0" />

      <div className="max-w-full mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-black dark:text-white">
              Current Job Openings for{" "}
              <span className="text-blue-600">
                {name} {location.pathname.includes("sap") && "Training"}
              </span>
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive training designed to give you real-world skills
          </p>
        </motion.div>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {keyFeatures?.map((feature, index) => {
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

                {/* Change layout only on mobile: flex-row for mobile, flex-col for sm+ */}
                <div className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/70 dark:border-gray-700/50 rounded-2xl p-4 sm:p-8 shadow-lg hover:shadow-md transition-all duration-300 flex flex-row sm:flex-col items-start sm:items-center gap-4 sm:gap-0">
                  {/* Boxes */}
                  <div className="w-full flex flex-col text-left sm:text-center flex-grow h-full gap-7">
                    {/* Job Title */}
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 leading-snug">
                      {feature?.profession}
                    </h3>

                    {/* Full-width button */}
                    <button
                      className={`w-full flex items-center justify-center gap-2 text-white ${
                        bgcolors[feature?.btncolor]
                      } text-md font-semibold py-3 px-4 rounded-md transition-colors duration-300 hover:opacity-90 mt-auto`}
                      onClick={() => searchJob(feature?.link, feature?.profession)}
                    >
                      <FiExternalLink className="text-white" />
                      <span>{feature?.cta}</span>
                      {/* <FiArrowRight className="transition-transform group-hover:translate-x-1" /> */}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default JobOpenings;
