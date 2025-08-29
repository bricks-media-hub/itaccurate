import React from "react";
import { motion } from "framer-motion";
import { SafeImage } from "../lib/SafeImage";

const Panel4 = ({ data, imageUrl }) => {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="order-2 md:order-1"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-indigo-700 dark:text-indigo-400 mb-4 leading-snug"
            dangerouslySetInnerHTML={{ __html: data?.heading }}
          />
          <p
            className="text-gray-700 dark:text-gray-300 text-md sm:text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data?.content }}
          />
        </motion.div>

        {/* Image Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="order-1 md:order-2 rounded-xl overflow-hidden shadow-xl ring-1 ring-indigo-100 dark:ring-indigo-900"
        >
          <SafeImage
            src={imageUrl}
            alt="SAP Training in Thane"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Panel4;
