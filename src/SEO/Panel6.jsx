import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Sparkles } from "lucide-react";

const Panel6 = ({ data }) => {
  if (!data) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 mt-14 relative">
      {/* Decorative elements */}
      <div className="absolute -top-10 left-10 w-32 h-32 bg-indigo-100 dark:bg-indigo-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-100 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-teal-100 dark:bg-teal-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Heading and Content */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 relative"
      >
        <div className="inline-flex items-center justify-center mb-3">
          <Sparkles className="text-yellow-400 w-6 h-6 mr-2" />
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
            {data?.tagline || "Join Us"}
          </span>
          <Sparkles className="text-yellow-400 w-6 h-6 ml-2" />
        </div>
        
        <h2
          className="text-3xl sm:text-4xl font-bold text-indigo-700 dark:text-indigo-400 mb-6"
          dangerouslySetInnerHTML={{ __html: data?.heading }}
        />
        <div className="relative max-w-2xl mx-auto">
          <p
            className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed relative z-10"
            dangerouslySetInnerHTML={{ __html: data?.content }}
          />
          <div className="absolute -bottom-2 -left-4 w-24 h-1 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full"></div>
        </div>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 relative z-10">
        {data?.points?.map((point, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.15,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            className="flex items-start bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-start">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg mr-4 flex-shrink-0 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors duration-300">
                <CheckCircle className="text-indigo-600 dark:text-indigo-400 w-6 h-6 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300" />
              </div>
              <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed font-medium">
                {point}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {data?.footerNote && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 text-center relative"
        >
          <div className="max-w-3xl mx-auto px-6 py-4 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800 backdrop-blur-sm">
            <p className="text-md md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
              {data?.footerNote}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Panel6;