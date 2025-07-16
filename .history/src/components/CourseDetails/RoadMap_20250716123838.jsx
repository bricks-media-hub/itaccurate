// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useLoaderData } from "react-router-dom";

// export default function RoadMap() {
//   const [activeIndex, setActiveIndex] = useState(null);
//   const roadmapData = useLoaderData();

//   return (
//     <section className="relative w-full px-4 py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Title */}
//         <div className="text-center mb-16">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600 inline-block">
//             Roadmap to Learn {roadmapData.whatIs.name}
//           </h2>
//         </div>

//         {/* Background Curve Line */}
//         <div className="absolute inset-0 top-1/2 transform -translate-y-1/2 pointer-events-none z-0 hidden md:block">
//           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
//             <defs>
//               <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                 <stop offset="0%" stopColor="#3b82f6" />
//                 <stop offset="50%" stopColor="#8b5cf6" />
//                 <stop offset="100%" stopColor="#ec4899" />
//               </linearGradient>
//             </defs>
//             <path 
//               d="M0,50 
//                  C10,10 20,90 30,50
//                  C40,10 50,90 60,50
//                  C70,10 80,90 90,50
//                  C100,10 100,90 100,50" 
//               stroke="url(#gradient)" 
//               strokeWidth="1.5" 
//               fill="none"
//               strokeDasharray="4 4"
//               opacity="0.3"
//             />
//           </svg>
//         </div>

//         {/* Roadmap Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8 relative z-10">
//           {roadmapData.roadMap.map((module, index) => {
//             const row = Math.floor(index / 4);
//             const isEvenRow = row % 2 === 0;
//             const positionInRow = index % 4;
//             const delay = index * 0.1;

//             const alignmentClass = isEvenRow 
//               ? positionInRow % 2 === 0 ? "md:mt-0" : "md:mt-16" 
//               : positionInRow % 2 === 0 ? "md:mt-16" : "md:mt-0";

//             return (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay }}
//                 className={`relative flex flex-col items-center text-center ${alignmentClass}`}
//               >
//                 {/* Main Icon Button */}
//                 <motion.div
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   onMouseEnter={() => setActiveIndex(activeIndex === index ? null : index)}
//                   onMouseLeave={() => setActiveIndex(null)}
//                   className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-2xl bg-gradient-to-tr ${module.color} text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer`}
//                 >
//                   {module.icon}
//                   <div className="absolute -inset-2 rounded-full border-2 border-white/30 animate-ping opacity-0 hover:opacity-100 transition-opacity"></div>
//                 </motion.div>

//                 {/* Title & Description */}
//                 <div className="mt-4 px-2">
//                   <h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
//                     {module.title}
//                   </h3>
//                   <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
//                     {module.description}
//                   </p>
//                 </div>

//                 {/* Expandable Detail */}
//                 <AnimatePresence>
//                   {activeIndex === index && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10, scale: 0.9 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: -10, scale: 0.9 }}
//                       className="absolute top-full mt-2 w-[90vw] max-w-sm bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 text-left backdrop-blur-sm z-50"
//                     >
//                       <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 rotate-45 border-t border-l border-gray-200 dark:border-gray-700"></div>
//                       <h4 className="font-semibold text-base mb-2 flex items-center">
//                         <span className={`bg-gradient-to-r ${module.color} rounded-full w-5 h-5 flex items-center justify-center text-white mr-2 text-sm`}>
//                           {module.icon}
//                         </span>
//                         {module.title} Details
//                       </h4>
//                       <ul className="space-y-2">
//                         {module.items.map((item, i) => (
//                           <li key={i} className="flex items-start">
//                             <span className={`flex-shrink-0 w-4 h-4 mt-0.5 rounded-full bg-gradient-to-br ${module.color} text-white flex items-center justify-center text-[10px] mr-2`}>
//                               ✓
//                             </span>
//                             <span className="text-xs text-gray-700 dark:text-gray-300">{item}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Decorative Blur Lights */}
//         <div className="absolute top-0 left-0 w-40 h-40 bg-blue-400 rounded-full filter blur-3xl opacity-10 -z-10" />
//         <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-500 rounded-full filter blur-3xl opacity-10 -z-10" />
//       </div>
//     </section>
//   );
// }


import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoaderData } from "react-router-dom";

// Define 12 consistent colors for roadmap items
const defaultColors = [
  'bg-blue-500',      // Primary blue
  'bg-emerald-500',   // Vibrant green
  'bg-amber-500',     // Warm orange
  'bg-violet-500',    // Soft purple
  'bg-rose-500',      // Elegant pink
  'bg-indigo-500',    // Deep indigo
  'bg-teal-500',      // Blue-green teal
  'bg-lime-500',      // Bright lime
  'bg-orange-500',    // Pure orange
  'bg-purple-500',    // Royal purple
  'bg-pink-500',      // Bright pink
  'bg-cyan-500'       // Light cyan
];

export default function RoadMap() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [connectionsVisible, setConnectionsVisible] = useState(false);
  const roadmapData = useLoaderData();
  const [activeLayer, setActiveLayer] = useState(0);
  const [itemColors, setItemColors] = useState([]);

  // Assign random colors to each roadmap item on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setConnectionsVisible(true);
    }, 500);

    // Assign colors only once when component mounts
    if (itemColors.length === 0 && roadmapData.roadMap.length > 0) {
      const colors = roadmapData.roadMap.map(() => {
        return defaultColors[Math.floor(Math.random() * defaultColors.length)];
      });
      setItemColors(colors);
    }

    return () => clearTimeout(timer);
  }, [roadmapData.roadMap, itemColors.length]);

  // Check if we have only 4 items (no bottom row)
  const hasOnlyOneRow = roadmapData.roadMap.length <= 4;
  const topRowItems = roadmapData.roadMap.slice(0, 4);
  const bottomRowItems = hasOnlyOneRow ? [] : roadmapData.roadMap.slice(4, 8);

  // Function to get color for a specific index
  const getItemColor = (index) => {
    return itemColors[index] || 'bg-blue-500'; // Fallback color
  };

  return (
    <section className="relative w-full px-4 py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto relative z-0">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent text-gray-800 dark:text-white inline-block">
            <span className="text-gray-800 dark:text-white">Roadmap to Learn </span> 
            <span className="text-blue-600">{roadmapData.whatIs.name}</span>
          </h2>
        </div>

        {/* Main Content Area */}
        <div className="relative">
          {/* Top Row */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${hasOnlyOneRow ? '' : 'mb-32'} relative z-10`}>
            {topRowItems.map((module, index) => (
              <RoadmapItem
                key={index}
                module={module}
                index={index}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                position={hasOnlyOneRow ? "single" : "top"}
                totalItems={roadmapData.roadMap.length}
                color={getItemColor(index)}
                setActiveLayer={setActiveLayer}
              />
            ))}
          </div>

          {/* Central Pipeline - only show if we have two rows */}
          {!hasOnlyOneRow && <CentralPipeline />}

          {/* Connection Pipes */}
          {connectionsVisible && (
            <ConnectionsPipes roadmapData={roadmapData} hasOnlyOneRow={hasOnlyOneRow} />
          )}

          {/* Bottom Row - only if we have more than 4 items */}
          {!hasOnlyOneRow && (
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-32 relative z-${activeLayer}`}>
              {bottomRowItems.map((module, index) => (
                <RoadmapItem
                  key={index + 4}
                  module={module}
                  index={index + 4}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                  position="bottom"
                  totalItems={roadmapData.roadMap.length}
                  color={getItemColor(index + 4)}
                  setActiveLayer={setActiveLayer}
                />
              ))}
            </div>
          )}
        </div>

        {/* Decorative Blur Lights */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-400 rounded-full filter blur-3xl opacity-10 -z-10" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-indigo-500 rounded-full filter blur-3xl opacity-10 -z-10" />
      </div>
    </section>
  );
}

// Central Pipeline Component
const CentralPipeline = () => (
  <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-2 hidden md:block z-0">
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-2xl overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white/40 via-white/20 to-transparent opacity-50"
        />
      </div>
    </div>
  </div>
);

// Connections Pipes Component - updated to handle single row
const ConnectionsPipes = ({ roadmapData, hasOnlyOneRow }) => (
  <div className="absolute left-0 right-0 top-0 bottom-0 pointer-events-none hidden md:block z-0">
    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>

      {/* Only show horizontal pipe if we have two rows */}
      {!hasOnlyOneRow && (
        <path
          d="M10,50 L90,50"
          stroke="url(#pipeGradient)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      )}

      {roadmapData.roadMap.map((_, index) => {
        const col = index % 4;
        const x = 12.5 + (col * 25);
        const isTop = index < 4;
        const yStart = hasOnlyOneRow ? 50 : (isTop ? 20 : 80);
        const yEnd = hasOnlyOneRow ? 80 : 50;

        return (
          <g key={index}>
            <motion.path
              d={`M${x},${yStart} L${x},${yEnd}`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              stroke="url(#pipeGradient)"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </svg>
  </div>
);

// Roadmap Item Component - updated with consistent color prop
const RoadmapItem = ({ module, index, activeIndex, setActiveIndex, position, totalItems, color, setActiveLayer }) => {
  const delay = index * 0.1;
  const zIndexOffset = position === "top" ? totalItems - index : index;

  return (
    <motion.div
      initial={{ opacity: 0, y: position === "top" ? -20 : position === "bottom" ? 20 : 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="relative flex flex-col items-center text-center"
      style={{ zIndex: zIndexOffset }}
    >
      {/* Connection Dot - only show if not single row */}
      {position !== "single" && (
        <div 
          className="absolute hidden md:flex items-center justify-center"
          style={{
            top: position === "top" ? "calc(100% + 30px)" : "auto",
            bottom: position === "bottom" ? "calc(100% + 30px)" : "auto",
            left: "50%",
            transform: "translateX(-50%)",
            width: "24px",
            height: "24px",
            borderRadius: "9999px",
            background: "linear-gradient(to bottom right, #3b82f6, #ec4899)",
            color: "white",
            fontSize: "14px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            zIndex: 10,
          }}
        >
          📊
        </div>
      )}

      {/* Main Icon Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => {setActiveIndex(index); setActiveLayer(10);}}
        onMouseLeave={() => {setActiveIndex(null); setActiveLayer(0);}}
        className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-2xl bg-gradient-to-tr ${color} text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer`}
      >
        <img src={module?.icon} alt='icon' className="w-10 h-10" />
        <div className="absolute -inset-2 rounded-full border-2 border-white/30 animate-ping opacity-0 hover:opacity-100 transition-opacity"></div>
      </motion.div>

      {/* Title & Description */}
      <div className="mt-4 px-2">
        <h3 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          {module.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {module.description}
        </p>
      </div>

      {/* Expandable Detail */}
      <AnimatePresence>
        {activeIndex === index && (
          <motion.div
            initial={{ opacity: 0, y: position === "top" ? 10 : position === "bottom" ? -10 : 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: position === "top" ? 10 : position === "bottom" ? -10 : 10, scale: 0.9 }}
            className={`absolute z-50 ${position === "top" ? "top-full mt-0" : position === "bottom" ? "bottom-full mb-4" : "top-full mt-4"} w-[90vw] max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 text-left backdrop-blur-sm`}
          >
            <div 
              className={`absolute ${position === "top" ? "-top-2" : position === "bottom" ? "-bottom-2" : "-top-2"} left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 rotate-45 ${position === "top" ? "border-t border-l" : position === "bottom" ? "border-b border-r" : "border-t border-l"} border-gray-200 dark:border-gray-700`}
            />
            <h4 className="font-semibold text-lg mb-2 flex items-center">
              <span className={`bg-gradient-to-r ${color} rounded-full w-10 h-10 flex items-center justify-center text-white mr-2 text-sm`}>
                <img src={module?.icon} alt='small icon' className="w-5 h-5" />
              </span>
              {module.title} Details
            </h4>
            <ul className="space-y-2">
              {module.items.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className={`flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-gradient-to-br ${color} text-white flex items-center justify-center text-[10px] mr-2`}>
                    ✓
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};