import { motion } from 'framer-motion';

function TopicsSection({ courseDetail }) {
  // Calculate dynamic size based on the longest text
  const getUniformSize = (topics) => {
    const baseSize = 8; // Minimum size in rem
    const longestTitleLength = Math.max(...topics.map(t => t.title.length));
    const extraSize = Math.min(longestTitleLength / 10, 4); // Add up to 4rem, capped
    return baseSize + extraSize;
  };

  // Find the scaling factor for visual hierarchy
  const getScale = (index, total) => {
    const middleIndex = Math.floor(total / 2);
    let scale = 1;
    if (total % 2 === 1) {
      scale = 1.2 - 0.1 * Math.abs(index - middleIndex);
    } else {
      const leftMid = middleIndex - 1;
      const rightMid = middleIndex;
      if (index === leftMid || index === rightMid) scale = 1.15;
      else if (index === leftMid - 1 || index === rightMid + 1) scale = 1.05;
      else scale = 1;
    }
    return scale;
  };

  const uniformSize = getUniformSize(courseDetail.coveringTopics);

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300 relative overflow-hidden">
      {/* Subtle Background Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 sm:w-40 sm:h-40 bg-purple-500/20 dark:bg-purple-700/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl z-0" />
      <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-48 sm:h-48 bg-blue-500/20 dark:bg-blue-700/30 rounded-full translate-x-1/3 translate-y-1/3 blur-2xl z-0" />

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-10 sm:mb-12 lg:mb-16 bg-clip-text text-transparent bg-slate-800 dark:bg-white relative z-10"
      >
        All the Topics Will Be Covered in Detail and Also Include
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 relative z-10">
        {courseDetail.coveringTopics.map((topic, index) => {
          const scale = getScale(index, courseDetail.coveringTopics.length);

          return (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ 
                y: -15, 
                scale: 1.1, 
                rotateX: 10, 
                rotateY: 10,
                boxShadow: "0 15px 30px -5px rgba(168, 85, 247, 0.4), 0 8px 20px -5px rgba(59, 130, 246, 0.3)"
              }}
              animate={{
                y: [0, -10, 0],
                transition: {
                  repeat: Infinity,
                  duration: 2 + Math.random() * 0.5,
                  ease: "easeInOut",
                },
              }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 20, 
                delay: index * 0.1 
              }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center rounded-full border border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-br from-white/70 to-gray-100/50 dark:from-gray-800/70 dark:to-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 text-center p-4 sm:p-5 lg:p-6 relative overflow-hidden"
              style={{
                width: `${uniformSize}rem`,
                height: `${uniformSize}rem`,
                transform: `scale(${scale})`,
                perspective: '1000px',
              }}
            >
              {/* 3D Effect Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 dark:from-purple-600/30 dark:via-blue-600/30 dark:to-pink-600/30 rounded-full blur-sm" />
              <div className="absolute inset-1 bg-white/80 dark:bg-gray-800/80 rounded-full" />

              <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
                <motion.div
                  className="text-3xl sm:text-4xl lg:text-5xl text-purple-600 dark:text-purple-400 mb-2 sm:mb-3"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  {topic.icon}
                </motion.div>
                <p className="text-xs sm:text-sm lg:text-base font-semibold break-words leading-tight text-gray-800 dark:text-gray-100 px-2 max-w-full">
                  {topic.title}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default TopicsSection;