import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { useLoaderData } from "react-router-dom";

export default function RoadMap() {
  const roadmapData = useLoaderData();
  const [activeIndex, setActiveIndex] = useState(null);
  const [connectionsVisible, setConnectionsVisible] = useState(false);
  const [activeLayer, setActiveLayer] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedModule, setSelectedModule] = useState(null);
  const itemsPerPage = 8;

  useEffect(() => {
    const timer = setTimeout(() => setConnectionsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const roadmapSection = document.getElementById("roadmap-section");
    if (roadmapSection) {
      roadmapSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);

  const pages = [];
  for (let i = 0; i < roadmapData.roadMap.length; i += itemsPerPage) {
    pages.push(roadmapData.roadMap.slice(i, i + itemsPerPage));
  }

  const currentItems = pages[currentPage] || [];
  const hasOnlyOneRow = currentItems.length <= 4;
  const topRowItems = currentItems.slice(0, 4);
  const bottomRowItems = hasOnlyOneRow ? [] : currentItems.slice(4, 8);

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentPage((p) => Math.min(p + 1, pages.length - 1)),
    onSwipedRight: () => setCurrentPage((p) => Math.max(p - 1, 0)),
    trackMouse: true,
  });

  const closeDetailsPanel = () => {
    setSelectedModule(null);
  };

  return (
    <section
      id="roadmap-section"
      className="relative w-full px-4 py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto relative z-0">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent text-gray-800 dark:text-white inline-block">
            <span className="text-gray-800 dark:text-white">
              Roadmap to Learn{" "}
            </span>
            <span className="text-blue-600">{roadmapData.whatIs.name}</span>
          </h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            {...handlers}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${
                hasOnlyOneRow ? "" : "mb-32"
              } relative z-10`}
            >
              {topRowItems.map((module, index) => (
                <RoadmapItem
                  key={index}
                  module={module}
                  index={index}
                  onClick={() => setSelectedModule(module)}
                  position={hasOnlyOneRow ? "single" : "top"}
                  totalItems={currentItems.length}
                />
              ))}
            </div>

            {!hasOnlyOneRow && <CentralPipeline />}
            {connectionsVisible && (
              <ConnectionsPipes
                roadmapData={{ roadMap: currentItems }}
                hasOnlyOneRow={hasOnlyOneRow}
              />
            )}

            {!hasOnlyOneRow && (
              <div
                className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-32 relative z-${activeLayer}`}
              >
                {bottomRowItems.map((module, index) => (
                  <RoadmapItem
                    key={index + 4}
                    module={module}
                    index={index + 4}
                    onClick={() => setSelectedModule(module)}
                    position="bottom"
                    totalItems={currentItems.length}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {pages.length > 1 && (
          <div className="mt-12 flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
              disabled={currentPage === 0}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentPage === 0
                  ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Prev
            </button>
            {pages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`w-8 h-8 rounded-full text-sm font-bold border ${
                  currentPage === idx
                    ? "bg-blue-600 text-white border-blue-700"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, pages.length - 1))
              }
              disabled={currentPage === pages.length - 1}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentPage === pages.length - 1
                  ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* Decorative Blur Lights */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-400 rounded-full filter blur-3xl opacity-10 -z-10" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-indigo-500 rounded-full filter blur-3xl opacity-10 -z-10" />
      </div>

      {/* Details Panel */}
      <AnimatePresence>
        {selectedModule && (
          <DetailsPanel module={selectedModule} onClose={closeDetailsPanel} />
        )}
      </AnimatePresence>
    </section>
  );
}

// Central Pipeline Component
const CentralPipeline = () => (
  <div className="relative w-full h-10 overflow-hidden">
    {/* Road surface */}
    <div className="absolute inset-0 bg-gray-800">
      {/* Road gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-900"></div>

      {/* Road markings - center divider (dashed lines) */}
      <div className="absolute top-1/2 left-0 w-full h-1 transform -translate-y-1/2 flex">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="w-8 h-full bg-yellow-400 mx-4"
            style={{ marginLeft: i === 0 ? "0" : "32px" }}
          ></div>
        ))}
      </div>

      {/* Animated bike rider */}
      <motion.div
        className="absolute top-1/2 left-0 w-14 h-14 -mt-7 transform -translate-y-1/2 -translate-x-full z-10"
        initial={{ x: "-100%" }}
        animate={{ x: "100vw" }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <img
          src="/icons/bike-rider.svg"
          alt="Bike rider"
          className="w-full h-full"
        />
      </motion.div>
    </div>

    {/* Optional road edges */}
    <div className="absolute top-0 left-0 w-full h-1 bg-white"></div>
    <div className="absolute bottom-0 left-0 w-full h-1 bg-white"></div>
  </div>
);

// Connections Pipes Component - updated to handle single row
const ConnectionsPipes = ({ roadmapData, hasOnlyOneRow }) => (
  <div className="absolute left-0 right-0 top-0 bottom-0 pointer-events-none hidden md:block z-0">
    <svg
      className="w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
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
        const x = 12.5 + col * 25;
        const isTop = index < 4;
        const yStart = hasOnlyOneRow ? 50 : isTop ? 20 : 80;
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
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 + 0.4, duration: 0.4 }}
            >
              <circle cx={x} cy={yStart} r="3" fill="url(#pipeGradient)" />
              <text
                x={x}
                y={yStart}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="3"
                fontWeight="bold"
              >
                {index + 1}
              </text>
            </motion.g>
          </g>
        );
      })}
    </svg>
  </div>
);

// Updated RoadmapItem component with consistent styling
const RoadmapItem = ({
  module,
  index,
  onClick,
  position,
  totalItems,
}) => {
  const delay = index * 0.1;
  const zIndexOffset = position === "top" ? totalItems - index : index;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: position === "top" ? -20 : position === "bottom" ? 20 : 0,
      }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="relative flex flex-col items-center text-center"
      style={{ zIndex: zIndexOffset }}
    >
      {/* Connection Dot and Line */}
      {position !== "single" && (
        <div 
          className="absolute hidden md:flex flex-col items-center"
          style={{
            top: position === "top" ? "calc(100% + 30px)" : "auto",
            bottom: position === "bottom" ? "calc(100% + 30px)" : "auto",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
          }}
        >
          <motion.div 
            className="absolute h-16 w-1 bg-gradient-to-b from-blue-500 to-purple-500"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: delay + 0.2, duration: 0.5 }}
            style={{
              top: position === "top" ? "24px" : "auto",
              bottom: position === "bottom" ? "24px" : "auto",
            }}
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.1 }}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-sm shadow-lg"
            whileHover={{ scale: 1.1 }}
          >
            {index + 1}
          </motion.div>
        </div>
      )}

      {/* Main Card */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="p-5 md:p-6 bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-lg hover:shadow-xl relative z-10 transition-all duration-300 w-full max-w-xs h-full flex flex-col"
        onClick={onClick}
      >
        <div className={`w-14 h-14 md:w-16 md:h-16 mb-4 rounded-full flex items-center justify-center bg-gradient-to-br ${module.color} text-white shadow-lg mx-auto`}>
          <img src={module.icon} alt={module.title} className="w-6 h-6 md:w-8 md:h-8" />
        </div>
        <h3 className="font-extrabold text-lg md:text-xl mb-2 text-gray-900 dark:text-gray-100">{module.title}</h3>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">{module.description}</p>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="mt-auto px-4 py-2 text-xs md:text-sm font-medium rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-colors shadow-md"
        >
          Concepts →
        </button>
      </motion.div>
    </motion.div>
  );
};

// Professional details panel component (same as in the second code)
function DetailsPanel({ module, onClose }) {
  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 overflow-y-auto"
      >
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${module.color} text-white shadow-lg`}>
              <img src={module.icon} alt={module.title} className="w-8 h-8" />
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close panel"
            >
              <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Content */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{module.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{module.description}</p>
            
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                <span className={`w-4 h-4 rounded-full ${module.color.split(' ')[1]} mr-2`}></span>
                Key Concepts
              </h4>
              <ul className="space-y-3">
                {module.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="flex-shrink-0 mt-1 mr-3">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Additional Resources */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Resources</h4>
              <div className="grid grid-cols-1 gap-3">
                <a href="#" className="flex items-center p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <span className="mr-3 text-blue-500">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Official Documentation</span>
                </a>
                <a href="#" className="flex items-center p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <span className="mr-3 text-red-500">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                    </svg>
                  </span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Video Tutorials</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <button 
            onClick={onClose}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md"
          >
            Got it, thanks!
          </button>
        </div>
      </motion.div>
    </>
  );
}









// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useSwipeable } from "react-swipeable";
// import { useLoaderData } from "react-router-dom";

// export default function RoadMap() {
//   const roadmapData = useLoaderData();
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [connectionsVisible, setConnectionsVisible] = useState(false);
//   const [activeLayer, setActiveLayer] = useState(0);
//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = 8;

//   useEffect(() => {
//     const timer = setTimeout(() => setConnectionsVisible(true), 500);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const roadmapSection = document.getElementById("roadmap-section");
//     if (roadmapSection) {
//       roadmapSection.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   }, [currentPage]);

//   const pages = [];
//   for (let i = 0; i < roadmapData.roadMap.length; i += itemsPerPage) {
//     pages.push(roadmapData.roadMap.slice(i, i + itemsPerPage));
//   }

//   const currentItems = pages[currentPage] || [];
//   const hasOnlyOneRow = currentItems.length <= 4;
//   const topRowItems = currentItems.slice(0, 4);
//   const bottomRowItems = hasOnlyOneRow ? [] : currentItems.slice(4, 8);

//   const handlers = useSwipeable({
//     onSwipedLeft: () =>
//       setCurrentPage((p) => Math.min(p + 1, pages.length - 1)),
//     onSwipedRight: () => setCurrentPage((p) => Math.max(p - 1, 0)),
//     trackMouse: true,
//   });

//   return (
//     <section
//       id="roadmap-section"
//       className="relative w-full px-4 py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden"
//     >
//       {/* Decorative background elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-0 left-0 w-full h-full opacity-5 dark:opacity-10">
//           <svg
//             className="w-full h-full"
//             preserveAspectRatio="none"
//             viewBox="0 0 1200 1200"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M0 0H1200V1200H0V0Z"
//               fill="url(#grid-pattern)"
//               fillOpacity="0.2"
//             />
//             <defs>
//               <pattern
//                 id="grid-pattern"
//                 patternContentUnits="objectBoundingBox"
//                 width="0.02"
//                 height="0.02"
//               >
//                 <path
//                   d="M0.004 0.004H0.008V0.008H0.004V0.004Z"
//                   fill="currentColor"
//                 />
//               </pattern>
//             </defs>
//           </svg>
//         </div>
//         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-blue-50 dark:to-gray-800 opacity-20 dark:opacity-10"></div>
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         <div className="text-center mb-16">
//           <motion.h2 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-3xl sm:text-4xl md:text-5xl font-bold inline-block"
//           >
//             <span className="text-gray-800 dark:text-gray-200 font-medium">
//               Master {roadmapData.whatIs.name} with Our{" "}
//             </span>
//             <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Structured Roadmap
//             </span>
//           </motion.h2>
//           <motion.p 
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
//           >
//             Follow our carefully crafted learning path to systematically build your skills in {roadmapData.whatIs.name}.
//           </motion.p>
//         </div>

//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentPage}
//             {...handlers}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -30 }}
//             transition={{ duration: 0.4 }}
//             className="relative"
//           >
//             <div
//               className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${
//                 hasOnlyOneRow ? "" : "mb-32"
//               } relative z-10`}
//             >
//               {topRowItems.map((module, index) => (
//                 <RoadmapItem
//                   key={index}
//                   module={module}
//                   index={index}
//                   activeIndex={activeIndex}
//                   setActiveIndex={setActiveIndex}
//                   position={hasOnlyOneRow ? "single" : "top"}
//                   totalItems={currentItems.length}
//                   isLastItem={index === topRowItems.length - 1}
//                 />
//               ))}
//             </div>

//             {!hasOnlyOneRow && <CentralPipeline />}
//             {connectionsVisible && (
//               <ConnectionsPipes
//                 roadmapData={{ roadMap: currentItems }}
//                 hasOnlyOneRow={hasOnlyOneRow}
//               />
//             )}

//             {!hasOnlyOneRow && (
//               <div
//                 className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-32 relative z-${activeLayer}`}
//               >
//                 {bottomRowItems.map((module, index) => (
//                   <RoadmapItem
//                     key={index + 4}
//                     module={module}
//                     index={index + 4}
//                     activeIndex={activeIndex}
//                     setActiveIndex={setActiveIndex}
//                     position="bottom"
//                     totalItems={currentItems.length}
//                     setActiveLayer={setActiveLayer}
//                     isLastItem={index === bottomRowItems.length - 1}
//                   />
//                 ))}
//               </div>
//             )}
//           </motion.div>
//         </AnimatePresence>

//         {pages.length > 1 && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className="mt-16 flex justify-center items-center gap-2"
//           >
//             <button
//               onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
//               disabled={currentPage === 0}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
//                 currentPage === 0
//                   ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
//                   : "bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 shadow-sm border border-gray-200 dark:border-gray-600"
//               }`}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//               Previous
//             </button>
            
//             <div className="flex items-center gap-1 mx-2">
//               {pages.map((_, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setCurrentPage(idx)}
//                   className={`w-8 h-8 rounded-md text-sm font-medium transition-all ${
//                     currentPage === idx
//                       ? "bg-blue-600 text-white shadow-md"
//                       : "bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-600"
//                   }`}
//                 >
//                   {idx + 1}
//                 </button>
//               ))}
//             </div>
            
//             <button
//               onClick={() =>
//                 setCurrentPage((p) => Math.min(p + 1, pages.length - 1))
//               }
//               disabled={currentPage === pages.length - 1}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
//                 currentPage === pages.length - 1
//                   ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
//                   : "bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 shadow-sm border border-gray-200 dark:border-gray-600"
//               }`}
//             >
//               Next
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </motion.div>
//         )}

//         {/* Call to action */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6 }}
//           className="mt-20 text-center"
//         >
//           <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
//             Ready to start your {roadmapData.whatIs.name} journey?
//           </h3>
//           <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5">
//             Get Started Today
//           </button>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// // Central Pipeline Component - Enhanced with more professional styling
// const CentralPipeline = () => (
//   <div className="relative w-full h-12 overflow-hidden rounded-lg shadow-inner">
//     {/* Road surface with more depth */}
//     <div className="absolute inset-0 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900">
//       {/* Road texture */}
//       <div className="absolute inset-0 opacity-10 bg-noise-pattern"></div>
      
//       {/* Road markings - center divider (dashed lines) with animation */}
//       <div className="absolute top-1/2 left-0 w-full h-1 transform -translate-y-1/2 flex">
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="w-8 h-full bg-yellow-400 mx-4"
//             style={{ marginLeft: i === 0 ? "0" : "32px" }}
//             initial={{ opacity: 0.7 }}
//             animate={{ opacity: [0.7, 1, 0.7] }}
//             transition={{
//               duration: 1.5,
//               repeat: Infinity,
//               delay: i * 0.1,
//             }}
//           />
//         ))}
//       </div>

//       {/* Animated elements moving along the road */}
//       <motion.div
//         className="absolute top-1/2 left-0 w-16 h-16 -mt-8 transform -translate-y-1/2 -translate-x-full z-10"
//         initial={{ x: "-100%" }}
//         animate={{ x: "100vw" }}
//         transition={{
//           duration: 12,
//           repeat: Infinity,
//           ease: "linear",
//         }}
//       >
//         <div className="relative w-full h-full">
//           <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-30"></div>
//           <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center shadow-md">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//             </svg>
//           </div>
//         </div>
//       </motion.div>
//     </div>

//     {/* Road edges with subtle glow */}
//     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400/30 to-purple-400/30"></div>
//     <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400/30 to-purple-400/30"></div>
//   </div>
// );

// // Connections Pipes Component - Enhanced with more professional styling
// const ConnectionsPipes = ({ roadmapData, hasOnlyOneRow }) => (
//   <div className="absolute left-0 right-0 top-0 bottom-0 pointer-events-none hidden md:block z-0">
//     <svg
//       className="w-full h-full"
//       viewBox="0 0 100 100"
//       preserveAspectRatio="none"
//     >
//       <defs>
//         <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//           <stop offset="0%" stopColor="#3b82f6" />
//           <stop offset="50%" stopColor="#8b5cf6" />
//           <stop offset="100%" stopColor="#ec4899" />
//         </linearGradient>
//         <filter id="pipe-glow" x="-30%" y="-30%" width="160%" height="160%">
//           <feGaussianBlur stdDeviation="2" result="blur" />
//           <feComposite in="SourceGraphic" in2="blur" operator="over" />
//         </filter>
//       </defs>
      
//       {/* Horizontal pipe with glow effect */}
//       {!hasOnlyOneRow && (
//         <motion.path
//           d="M10,50 L90,50"
//           stroke="url(#pipeGradient)"
//           strokeWidth="1.8"
//           fill="none"
//           strokeLinecap="round"
//           filter="url(#pipe-glow)"
//           initial={{ pathLength: 0 }}
//           animate={{ pathLength: 1 }}
//           transition={{ duration: 0.8 }}
//         />
//       )}

//       {roadmapData.roadMap.map((_, index) => {
//         const col = index % 4;
//         const x = 12.5 + col * 25;
//         const isTop = index < 4;
//         const yStart = hasOnlyOneRow ? 50 : isTop ? 20 : 80;
//         const yEnd = hasOnlyOneRow ? 80 : 50;

//         return (
//           <g key={index}>
//             <motion.path
//               d={`M${x},${yStart} L${x},${yEnd}`}
//               initial={{ pathLength: 0 }}
//               animate={{ pathLength: 1 }}
//               transition={{ duration: 0.6, delay: index * 0.15 }}
//               stroke="url(#pipeGradient)"
//               strokeWidth="1.2"
//               fill="none"
//               strokeLinecap="round"
//               filter="url(#pipe-glow)"
//             />
//             <motion.g
//               initial={{ opacity: 0, scale: 0 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: index * 0.15 + 0.4, duration: 0.4 }}
//             >
//               <circle 
//                 cx={x} 
//                 cy={yStart} 
//                 r="3.5" 
//                 fill="url(#pipeGradient)" 
//                 stroke="white" 
//                 strokeWidth="0.5"
//               />
//               <text
//                 x={x}
//                 y={yStart}
//                 textAnchor="middle"
//                 dominantBaseline="middle"
//                 fill="white"
//                 fontSize="3.5"
//                 fontWeight="bold"
//                 className="font-sans"
//               >
//                 {index + 1}
//               </text>
//             </motion.g>
//           </g>
//         );
//       })}
//     </svg>
//   </div>
// );

// // Roadmap Item Component - Enhanced with more professional styling
// const RoadmapItem = ({
//   module,
//   index,
//   activeIndex,
//   setActiveIndex,
//   position,
//   totalItems,
//   setActiveLayer,
//   isLastItem,
// }) => {
//   const [showMobileModal, setShowMobileModal] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const delay = index * 0.1;
//   const zIndexOffset = position === "top" ? totalItems - index : index;

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const handleClick = () => {
//     if (isMobile) {
//       setShowMobileModal(true);
//     } else {
//       setActiveIndex(index === activeIndex ? null : index);
//       setActiveLayer(10);
//     }
//   };

//   const handleMouseEnter = () => {
//     if (!isMobile) {
//       setActiveIndex(index);
//       setActiveLayer(10);
//     }
//   };

//   const handleMouseLeave = () => {
//     if (!isMobile) {
//       setActiveIndex(null);
//       setActiveLayer(0);
//     }
//   };

//   return (
//     <>
//       <motion.div
//         initial={{
//           opacity: 0,
//           y: position === "top" ? -20 : position === "bottom" ? 20 : 0,
//         }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay }}
//         className="relative flex flex-col items-center text-center"
//         style={{ zIndex: zIndexOffset }}
//       >
//         {/* Connection Dot and Line - Enhanced styling */}
//         {position !== "single" && (
//           <div className="absolute hidden md:flex flex-col items-center"
//             style={{
//               top: position === "top" ? "calc(100% + 24px)" : "auto",
//               bottom: position === "bottom" ? "calc(100% + 24px)" : "auto",
//               left: "50%",
//               transform: "translateX(-50%)",
//               zIndex: 10,
//             }}
//           >
//             {!isLastItem && (
//               <motion.div 
//                 className="absolute h-16 w-1.5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full shadow-inner"
//                 initial={{ scaleY: 0 }}
//                 animate={{ scaleY: 1 }}
//                 transition={{ delay: delay + 0.2, duration: 0.5 }}
//                 style={{
//                   top: position === "top" ? "20px" : "auto",
//                   bottom: position === "bottom" ? "20px" : "auto",
//                 }}
//               />
//             )}
            
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: delay + 0.1 }}
//               className={`flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br ${module.color} text-white font-bold text-sm shadow-lg border-2 border-white/20`}
//               whileHover={{ scale: 1.1 }}
//             >
//               {index + 1}
//             </motion.div>
//           </div>
//         )}

//         {/* Card container */}
//         <motion.div
//           whileHover={{ y: -5 }}
//           className="w-full h-full"
//         >
//           <div
//             className={`flex flex-col justify-center items-center bg-white dark:bg-gray-800 p-5 rounded-xl min-h-[280px] md:min-h-[240px] shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 ${
//               activeIndex === index ? "ring-2 ring-blue-500/30" : ""
//             }`}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >
//             {/* Main Icon Button */}
//             <motion.button
//               whileHover={{ scale: isMobile ? 1 : 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleClick}
//               onMouseEnter={handleMouseEnter}
//               onMouseLeave={handleMouseLeave}
//               className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-tr ${module.color} text-white shadow-lg hover:shadow-xl transition-all cursor-pointer mb-4`}
//             >
//               <img src={module?.icon} alt="icon" className="w-8 h-8" />
//               <div className="absolute -inset-2 rounded-xl border-2 border-white/20 animate-ping opacity-0 hover:opacity-100 transition-opacity"></div>
//             </motion.button>

//             {/* Title & Description */}
//             <div className="mt-2 px-2">
//               <h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
//                 {module.title}
//               </h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
//                 {module.description}
//               </p>
//             </div>

//             {/* Progress indicator (optional) */}
//             <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
//               <div 
//                 className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full" 
//                 style={{ width: `${Math.min(100, (index + 1) * 15)}%` }}
//               />
//             </div>
//           </div>
//         </motion.div>

//         {/* Desktop Expandable Detail - Enhanced with better styling */}
//         {!isMobile && (
//           <AnimatePresence>
//             {activeIndex === index && (
//               <motion.div
//                 initial={{
//                   opacity: 0,
//                   y: position === "top" ? 10 : position === "bottom" ? -10 : 10,
//                   scale: 0.9,
//                 }}
//                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                 exit={{
//                   opacity: 0,
//                   y: position === "top" ? 10 : position === "bottom" ? -10 : 10,
//                   scale: 0.9,
//                 }}
//                 className={`hidden md:block absolute z-50 ${
//                   position === "top"
//                     ? "top-full mt-2"
//                     : position === "bottom"
//                     ? "bottom-full mb-4"
//                     : "top-full mt-4"
//                 } w-[90vw] max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 text-left backdrop-blur-sm`}
//               >
//                 <div className="flex items-start mb-4">
//                   <div
//                     className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white mr-4 ${module.color}`}
//                   >
//                     <img
//                       src={module?.icon}
//                       alt="small icon"
//                       className="w-6 h-6"
//                     />
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-xl text-gray-800 dark:text-white">
//                       {module.title}
//                     </h4>
//                     <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                       Module {index + 1} of {totalItems}
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
//                   <h5 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
//                     Key Learning Points
//                   </h5>
//                   <ul className="space-y-3">
//                     {module.items.map((item, i) => (
//                       <motion.li 
//                         key={i} 
//                         className="flex items-start"
//                         initial={{ opacity: 0, x: -10 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: i * 0.05 }}
//                       >
//                         <span
//                           className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-md ${module.color.replace('bg-gradient-to-tr', 'bg-gradient-to-br')} text-white flex items-center justify-center text-[10px] mr-3`}
//                         >
//                           ✓
//                         </span>
//                         <span className="text-sm text-gray-700 dark:text-gray-300">
//                           {item}
//                         </span>
//                       </motion.li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="mt-6 flex justify-end">
//                   <button
//                     onClick={() => setActiveIndex(null)}
//                     className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         )}
//       </motion.div>

//       {/* Mobile Modal - Enhanced with better styling */}
//       <MobileDetailModal
//         module={module}
//         isOpen={showMobileModal}
//         onClose={() => setShowMobileModal(false)}
//       />
//     </>
//   );
// };

// const MobileDetailModal = ({ module, isOpen, onClose }) => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   if (!isMobile || !module) return null;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//             onClick={onClose}
//           />

//           {/* Modal Content */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 20 }}
//             className="relative z-10 w-full max-w-md max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700"
//           >
//             {/* Header */}
//             <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
//               <div className="flex items-center">
//                 <div
//                   className={`w-10 h-10 rounded-lg flex items-center justify-center text-white mr-3 ${module.color}`}
//                 >
//                   <img src={module?.icon} alt="small icon" className="w-5 h-5" />
//                 </div>
//                 <h4 className="font-semibold text-lg text-gray-800 dark:text-white">
//                   {module.title}
//                 </h4>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                 aria-label="Close"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>

//             {/* Content */}
//             <div className="p-6">
//               <div className="mb-6">
//                 <h5 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
//                   What You'll Learn
//                 </h5>
//                 <p className="text-gray-700 dark:text-gray-300">
//                   {module.description}
//                 </p>
//               </div>

//               <div>
//                 <h5 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
//                   Key Topics
//                 </h5>
//                 <ul className="space-y-3">
//                   {module.items.map((item, i) => (
//                     <li key={i} className="flex items-start">
//                       <span
//                         className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-md ${module.color.replace('bg-gradient-to-tr', 'bg-gradient-to-br')} text-white flex items-center justify-center text-[10px] mr-3`}
//                       >
//                         ✓
//                       </span>
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {item}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="sticky bottom-0 bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
//               <button
//                 onClick={onClose}
//                 className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-colors shadow-md"
//               >
//                 Got it, let's continue!
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };