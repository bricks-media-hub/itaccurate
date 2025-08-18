import { motion } from "framer-motion";

function TopicsSection({ coveringTopics, heading }) {
  const getDelay = (index) => index * 0.08;

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 sm:w-40 sm:h-40 bg-purple-500/20 dark:bg-purple-700/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl z-0" />
      <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-48 sm:h-48 bg-blue-500/20 dark:bg-blue-700/30 rounded-full translate-x-1/3 translate-y-1/3 blur-2xl z-0" />

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-10 sm:mb-12 lg:mb-16 bg-clip-text text-transparent bg-slate-800 dark:bg-white relative z-10"
      >
        {heading ? (
          <span>{heading}</span>
        ) : (
          <span>
            All the <span className="text-blue-600">Topics</span> Will Be
            Covered in{" "}
            <span className="text-blue-600">Detail and Also Include</span>
          </span>
        )}
      </motion.h1>

      {/* Topics grid */}
      <div className="flex sm:flex-row flex-col sm:flex-wrap sm:justify-center gap-4 sm:gap-6 relative z-10 max-w-6xl mx-auto">
        {coveringTopics?.map((topic, index) => (
          <div
            key={index}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.9 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              whileHover={{
                y: -5,
                scale: 1.03,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: getDelay(index),
              }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="flex flex-row sm:flex-col items-center sm:items-center rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 gap-4 sm:gap-5 text-left h-full "
            >
              {/* Icon with elegant background */}
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 p-3 rounded-xl flex items-center justify-center shadow-inner border border-gray-100/50 dark:border-gray-700/50"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <img
                  src={topic?.icon}
                  alt="icons"
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-cover"
                />
              </motion.div>

              {/* Text content with better typography */}
              <div className="flex flex-col flex-grow">
                <motion.h3
                  className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 sm:mb-3 leading-tight sm:text-center"
                  whileHover={{ scale: 1.02 }}
                >
                  {topic?.title}
                </motion.h3>

                {topic?.description && (
                  <motion.p
                    className="text-sm sm:text-[0.92rem] text-center text-gray-600 dark:text-gray-300 leading-relaxed"
                    initial={{ opacity: 0, height: 0 }}
                    whileInView={{ opacity: 1, height: "auto" }}
                    transition={{ delay: getDelay(index) + 0.2 }}
                    viewport={{ once: true }}
                  >
                    {topic?.description}
                  </motion.p>
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopicsSection;
