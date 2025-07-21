import React from "react";
import { motion } from "framer-motion";

const Panel8 = ({ data }) => {
  if (!data) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 border border-indigo-100 dark:border-gray-700 rounded-3xl p-10 shadow-xl"
      >
        <h2
          className="text-3xl sm:text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-6 text-center"
          dangerouslySetInnerHTML={{ __html: data.heading }}
        />
        <p
          className="text-gray-800 dark:text-gray-300 text-lg leading-relaxed text-center"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </motion.div>
    </div>
  );
};

export default Panel8;
