import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoaderData } from "react-router-dom";

export default function RoadMap() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [connectionsVisible, setConnectionsVisible] = useState(false);
  const roadmapData = useLoaderData();
  const [zIndex, setZIndex] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setConnectionsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Check if we have only 4 items (no bottom row)
  const hasOnlyOneRow = roadmapData.roadMap.length <= 4;
  const topRowItems = roadmapData.roadMap.slice(0, 4);
  const bottomRowItems = hasOnlyOneRow ? [] : roadmapData.roadMap.slice(4, 8);

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
            <motion.circle
              cx={x}
              cy={yStart}
              r="1.5"
              fill="white"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 + 0.4, duration: 0.4 }}
            />
          </g>
        );
      })}
    </svg>
  </div>
);

// Roadmap Item Component - updated to handle single row position
const RoadmapItem = ({ module, index, activeIndex, setActiveIndex, position, totalItems, setActiveLayer }) => {
  const delay = index * 0.1;
  const zIndexOffset = position === "top" ? totalItems - index : index;
  // { position === "top" ? setZIndex(10) : setZIndex(0) }


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
      {/* <div className="flex flex-col justify-center items-center shadow-lg min-h-[200px] rounded-2xl z-10"> */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => { setActiveIndex(index); setActiveLayer(10); }}
          onMouseLeave={() => { setActiveIndex(null); setActiveLayer(0); }}
          className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-2xl bg-gradient-to-tr ${module.color} text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer`}
        >
          <img src={module?.icon} alt='icon' className="w-10 h-10" />
          {/* spread circle on hover */}
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
      {/* </div> */}

      {/* Expandable Detail */}
      <AnimatePresence>
        {activeIndex === index && (
          <motion.div
            initial={{ opacity: 0, y: position === "top" ? 10 : position === "bottom" ? -10 : 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: position === "top" ? 10 : position === "bottom" ? -10 : 10, scale: 0.9 }}
            className={`absolute z-50 ${position === "top" ? "top-full mt-0" : position === "bottom" ? "bottom-full mb-4" : "top-full mt-4"} w-[90vw] max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 text-left backdrop-blur-sm`}
          // style={{ zIndex: 1000 + index }}
          >
            {/* <div 
              className={`absolute ${position === "top" ? "-top-2" : position === "bottom" ? "-bottom-2" : "-top-2"} left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 rotate-45 ${position === "top" ? "border-t border-l" : position === "bottom" ? "border-b border-r" : "border-t border-l"} border-gray-200 dark:border-gray-700`}
            /> */}
            <h4 className="font-semibold text-lg mb-2 flex items-center">
              <span className={`bg-gradient-to-r ${module.color} rounded-full w-10 h-10 flex items-center justify-center text-white mr-2 text-sm`}>
                <img src={module?.icon} alt='small icon' className="w-5 h-5" />
              </span>
              {module.title} Details
            </h4>
            <ul className="space-y-2">
              {module.items.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className={`flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-gradient-to-br ${module.color} text-white flex items-center justify-center text-[10px] mr-2`}>
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


// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useLoaderData } from "react-router-dom";

// export default function RoadMap() {
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [connectionsVisible, setConnectionsVisible] = useState(false);
//   const roadmapData = useLoaderData();
//   const [activeLayer, setActiveLayer] = useState(0);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   // Track window width for responsive layout
//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Delay connectors for animation
//   useEffect(() => {
//     const timer = setTimeout(() => setConnectionsVisible(true), 600);
//     return () => clearTimeout(timer);
//   }, []);

//   const isMobile = windowWidth < 768;
//   const hasOnlyOneRow = isMobile || roadmapData.roadMap.length <= 4;

//   // Split items for desktop view
//   const topRowItems = hasOnlyOneRow ? [] : roadmapData.roadMap.slice(0, 4);
//   const bottomRowItems = hasOnlyOneRow ? [] : roadmapData.roadMap.slice(4);
//   const mobileItems = roadmapData.roadMap;

//   return (
//     <section className="relative w-full px-4 py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
//       <div className="max-w-7xl mx-auto relative">
//         <h2 className="text-center text-3xl md:text-4xl font-bold mb-8 md:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
//           Roadmap to Learn <span className="text-white">{roadmapData.whatIs.name}</span>
//         </h2>

//         {isMobile ? (
//           // Mobile: vertical timeline
//           <div className="relative flex flex-col items-center">
//             <VerticalHighwayMobile count={mobileItems.length} />

//             <div className="space-y-16 w-full mt-8 z-10">
//               {mobileItems.map((mod, i) => (
//                 <RoadmapItem
//                   key={i}
//                   module={mod}
//                   index={i}
//                   activeIndex={activeIndex}
//                   setActiveIndex={setActiveIndex}
//                   position="mobile"
//                   totalItems={mobileItems.length}
//                   setActiveLayer={setActiveLayer}
//                   isMobile={true}
//                 />
//               ))}
//             </div>
//           </div>
//         ) : (
//           // Desktop: horizontal road
//           <>  
//             {!hasOnlyOneRow && <EnhancedHighwayDesktop />}
//             {!hasOnlyOneRow && <CyclingBoyDesktop />}

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
//               {topRowItems.map((mod, i) => (
//                 <RoadmapItem
//                   key={i}
//                   module={mod}
//                   index={i}
//                   activeIndex={activeIndex}
//                   setActiveIndex={setActiveIndex}
//                   position="top"
//                   totalItems={roadmapData.roadMap.length}
//                   setActiveLayer={setActiveLayer}
//                 />
//               ))}
//             </div>

//             {connectionsVisible && (
//               <BezierConnectors topCount={topRowItems.length} bottomCount={bottomRowItems.length} />
//             )}

//             {!hasOnlyOneRow && (
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-28 md:mt-40 relative" style={{ zIndex: activeLayer }}>
//                 {bottomRowItems.map((mod, i) => (
//                   <RoadmapItem
//                     key={i + 4}
//                     module={mod}
//                     index={i + 4}
//                     activeIndex={activeIndex}
//                     setActiveIndex={setActiveIndex}
//                     position="bottom"
//                     totalItems={roadmapData.roadMap.length}
//                     setActiveLayer={setActiveLayer}
//                   />
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </section>
//   );
// }

// // Mobile vertical highway with markers
// function VerticalHighwayMobile({ count }) {
//   return (
//     <div className="absolute left-1/2 top-0 bottom-0 w-2 -ml-1 z-0">
//       <div className="absolute inset-0 bg-gray-700 rounded-lg"></div>
//       <div className="absolute inset-0 flex flex-col justify-between">
//         {[...Array(count + 1)].map((_, i) => (
//           <div key={i} className="w-1 h-8 bg-yellow-400 rounded-full mx-auto"></div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Desktop highway with texture and lanes
// function EnhancedHighwayDesktop() {
//   return (
//     <div className="absolute inset-x-0 top-[50%] h-28 -mt-14 z-0 overflow-hidden">
//       <div className="absolute inset-0 bg-gray-800"></div>
//       <div className="absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2"
//         style={{
//           background: "repeating-linear-gradient(90deg, transparent, transparent 20px, white 20px, white 40px)"
//         }}></div>
//       <div className="absolute top-1/2 left-0 w-6 h-4 bg-yellow-500 transform -translate-y-1/2"></div>
//       <div className="absolute top-1/2 right-0 w-6 h-4 bg-yellow-500 transform -translate-y-1/2"></div>
//       <div className="absolute inset-0 opacity-10" style={{
//         backgroundImage: "radial-gradient(circle at center, white 1px, transparent 1px)",
//         backgroundSize: "10px 10px"
//       }}></div>
//     </div>
//   );
// }

// // Cycling boy spans exactly full width
// function CyclingBoyDesktop() {
//   return (
//     <motion.div
//       className="absolute top-1/2 w-16 h-16 -mt-8 z-10"
//       initial={{ x: 0 }}
//       animate={{ x: "100%" }}
//       transition={{ repeat: Infinity, duration: 7, ease: 'linear' }}
//     >
//       <img src="/icons/bike-rider.svg" alt="Cycling Boy" className="w-full h-full" />
//     </motion.div>
//   );
// }

// // Smooth ramp connectors
// function BezierConnectors({ topCount, bottomCount }) {
//   const total = 4;
//   return (
//     <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
//       {/* Top ramps */}
//       {[...Array(topCount)].map((_, i) => {
//         const startX = ((i + 0.5) / total) * 100;
//         return (
//           <g key={`top-${i}`}>  
//             <path
//               d={`M${startX}%,50% C${startX}%,45% ${(startX - 4)}%,30% ${(startX - 4)}%,20%`}
//               stroke="#4a5568"
//               strokeWidth="8"
//               fill="none"
//               strokeLinecap="round"
//             />
//             <path
//               d={`M${startX}%,50% C${startX}%,45% ${(startX - 4)}%,30% ${(startX - 4)}%,20%`}
//               stroke="#e2e8f0"
//               strokeWidth="1"
//               strokeDasharray="4,4"
//               fill="none"
//               strokeLinecap="round"
//             />
//           </g>
//         );
//       })}
//       {/* Bottom ramps */}
//       {[...Array(bottomCount)].map((_, i) => {
//         const startX = ((i + 0.5) / total) * 100;
//         return (
//           <g key={`bot-${i}`}>  
//             <path
//               d={`M${startX}%,50% C${startX}%,55% ${(startX + 4)}%,70% ${(startX + 4)}%,80%`}
//               stroke="#4a5568"
//               strokeWidth="8"
//               fill="none"
//               strokeLinecap="round"
//             />
//             <path
//               d={`M${startX}%,50% C${startX}%,55% ${(startX + 4)}%,70% ${(startX + 4)}%,80%`}
//               stroke="#e2e8f0"
//               strokeWidth="1"
//               strokeDasharray="4,4"
//               fill="none"
//               strokeLinecap="round"
//             />
//           </g>
//         );
//       })}
//     </svg>
//   );
// }

// // Card component (mobile & desktop)
// function RoadmapItem({ module, index, activeIndex, setActiveIndex, position, totalItems, setActiveLayer, isMobile }) {
//   const isActive = activeIndex === index;
//   return (
//     <motion.div
//       onMouseEnter={() => { setActiveIndex(index); setActiveLayer(20); }}
//       onMouseLeave={() => { setActiveIndex(null); setActiveLayer(0); }}
//       whileHover={{ scale: 1.05, zIndex: 50 }}
//       transition={{ type: 'spring', stiffness: 150 }}
//       className="relative flex flex-col items-center text-center cursor-pointer"
//     >
//       {/* Desktop connector marker */}
//       {!isMobile && position !== 'mobile' && (
//         <div className="absolute w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 top-[50%] left-[-4rem] rounded-r-full" />
//       )}

//       <div className="p-5 md:p-6 bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl relative z-10 transition-all duration-300 w-full max-w-xs">
//         <div className={`w-14 h-14 md:w-16 md:h-16 mb-4 rounded-full flex items-center justify-center bg-gradient-to-br ${module.color} text-white shadow-lg mx-auto`}>
//           <img src={module.icon} alt={module.title} className="w-6 h-6 md:w-8 md:h-8" />
//         </div>
//         <h3 className="font-extrabold text-lg md:text-xl mb-2 text-gray-900 dark:text-gray-100">{module.title}</h3>
//         <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">{module.description}</p>
//       </div>

//       {/* Mobile connector */}
//       {isMobile && index < totalItems - 1 && (
//         <div className="absolute top-full h-16 w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
//       )}

//       <AnimatePresence>
//         {isActive && (
//           <motion.div
//             initial={{ opacity: 0, y: position === 'top' ? 20 : position === 'bottom' ? -20 : 0, scale: 0.8 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: position === 'top' ? 20 : position === 'bottom' ? -20 : 0, scale: 0.8 }}
//             transition={{ duration: 0.3 }}
//             className={`absolute ${
//               position === 'top' ? 'top-full mt-6' : 
//               position === 'bottom' ? 'bottom-full mb-6' : 
//               isMobile ? (index % 2 === 0 ? 'left-full ml-6' : 'right-full mr-6') : ''
//             } w-72 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm z-30`}
//           >
//             <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200 flex items-center space-x-2">
//               <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-br ${module.color}`}>⏺</div>
//               <span>{module.title} Details</span>
//             </h4>
//             <ul className="space-y-2 text-left text-gray-700 dark:text-gray-300">
//               {module.items.map((it, i) => (
//                 <li key={i} className="flex items-start pl-1">
//                   <span className="inline-block w-5 h-5 mr-2 bg-green-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">✓</span>
//                   <span>{it}</span>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

