// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useLoaderData } from "react-router-dom";

// export default function AdvancedRoadMap() {
//   const [selectedModule, setSelectedModule] = useState(null);
//   const [connectionsVisible, setConnectionsVisible] = useState(false);
//   const roadmapData = useLoaderData();
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const roadContainerRef = useRef(null);
//   const [roadWidth, setRoadWidth] = useState(0);

//   // Track window width for responsive layout
//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//       if (roadContainerRef.current) {
//         setRoadWidth(roadContainerRef.current.offsetWidth);
//       }
//     };
    
//     window.addEventListener("resize", handleResize);
    
//     // Initialize road width
//     if (roadContainerRef.current) {
//       setRoadWidth(roadContainerRef.current.offsetWidth);
//     }
    
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

//   const closeDetailsPanel = () => {
//     setSelectedModule(null);
//   };

//   return (
//     <section className="relative w-full px-4 py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
//       <div className="max-w-7xl mx-auto relative">
//          <div className="text-center mb-16">
//            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent text-gray-800 dark:text-white inline-block">
//              <span className="text-gray-800 dark:text-white">Roadmap to Learn </span>
//              <span className="text-blue-600">{roadmapData.whatIs.name}</span>
//            </h2>
//          </div>

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
//                   onClick={() => setSelectedModule(mod)}
//                   position="mobile"
//                   totalItems={mobileItems.length}
//                   isMobile={true}
//                 />
//               ))}
//             </div>
//           </div>
//         ) : (
//           // Desktop: horizontal road
//           <div ref={roadContainerRef}>
//             {!hasOnlyOneRow && <EnhancedHighwayDesktop />}
//             {!hasOnlyOneRow && roadWidth > 0 && (
//               <CyclingBoyDesktop roadWidth={roadWidth} />
//             )}

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
//               {topRowItems.map((mod, i) => (
//                 <RoadmapItem
//                   key={i}
//                   module={mod}
//                   index={i}
//                   onClick={() => setSelectedModule(mod)}
//                   position="top"
//                   totalItems={roadmapData.roadMap.length}
//                 />
//               ))}
//             </div>

//             {connectionsVisible && (
//               <BezierConnectors topCount={topRowItems.length} bottomCount={bottomRowItems.length} />
//             )}

//             {!hasOnlyOneRow && (
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-28 md:mt-40 relative">
//                 {bottomRowItems.map((mod, i) => (
//                   <RoadmapItem
//                     key={i + 4}
//                     module={mod}
//                     index={i + 4}
//                     onClick={() => setSelectedModule(mod)}
//                     position="bottom"
//                     totalItems={roadmapData.roadMap.length}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Details Panel */}
//       <AnimatePresence>
//         {selectedModule && (
//           <DetailsPanel module={selectedModule} onClose={closeDetailsPanel} />
//         )}
//       </AnimatePresence>
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
//     <div className="absolute inset-x-0 top-[55%] h-28 -mt-14 z-0 overflow-hidden">
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

// // Cycling boy that spans exactly the road width
// function CyclingBoyDesktop({ roadWidth }) {
//   return (
//     <motion.div
//       className="absolute top-1/2 w-16 h-16 -mt-8 z-10"
//       initial={{ x: -16 }} // Start just off-screen
//       animate={{ x: roadWidth }}
//       transition={{ 
//         repeat: Infinity, 
//         duration: 7, 
//         ease: 'linear',
//         repeatDelay: 0.5
//       }}
//     >
//       <img 
//         src="/icons/bike-rider.svg" 
//         alt="Cycling Boy" 
//         className="w-full h-full object-contain" 
//       />
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
// function RoadmapItem({ module, index, onClick, position, totalItems, isMobile }) {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.03 }}
//       transition={{ type: 'spring', stiffness: 300 }}
//       className="relative flex flex-col items-center text-center cursor-pointer"
//     >
//       {/* Desktop connector marker */}
//       {!isMobile && position !== 'mobile' && (
//         <div className="absolute w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 top-[50%] left-[-4rem] rounded-r-full" />
//       )}

//       <div 
//         onClick={onClick}
//         className="p-5 md:p-6 bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-lg hover:shadow-xl relative z-10 transition-all duration-300 w-full max-w-xs h-full flex flex-col"
//       >
//         <div className={`w-14 h-14 md:w-16 md:h-16 mb-4 rounded-full flex items-center justify-center bg-gradient-to-br ${module.color} text-white shadow-lg mx-auto`}>
//           <img src={module.icon} alt={module.title} className="w-6 h-6 md:w-8 md:h-8" />
//         </div>
//         <h3 className="font-extrabold text-lg md:text-xl mb-2 text-gray-900 dark:text-gray-100">{module.title}</h3>
//         <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">{module.description}</p>
//         <button 
//           onClick={(e) => {
//             e.stopPropagation();
//             onClick();
//           }}
//           className="mt-auto px-4 py-2 text-xs md:text-sm font-medium rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-colors shadow-md"
//         >
//           Explore More →
//         </button>
//       </div>

//       {/* Mobile connector */}
//       {isMobile && index < totalItems - 1 && (
//         <div className="absolute top-full h-16 w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
//       )}
//     </motion.div>
//   );
// }

// // Professional details panel component
// function DetailsPanel({ module, onClose }) {
//   return (
//     <>
//       {/* Overlay */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 bg-black bg-opacity-50 z-40"
//         onClick={onClose}
//       />
      
//       {/* Panel */}
//       <motion.div
//         initial={{ x: '100%' }}
//         animate={{ x: 0 }}
//         exit={{ x: '100%' }}
//         transition={{ type: 'spring', damping: 25 }}
//         className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 overflow-y-auto"
//       >
//         <div className="p-6 md:p-8">
//           {/* Header */}
//           <div className="flex justify-between items-start mb-6">
//             <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${module.color} text-white shadow-lg`}>
//               <img src={module.icon} alt={module.title} className="w-8 h-8" />
//             </div>
//             <button 
//               onClick={onClose}
//               className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//               aria-label="Close panel"
//             >
//               <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
          
//           {/* Content */}
//           <div>
//             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{module.title}</h3>
//             <p className="text-gray-600 dark:text-gray-300 mb-6">{module.description}</p>
            
//             <div className="mb-8">
//               <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
//                 <span className={`w-4 h-4 rounded-full ${module.color.split(' ')[1]} mr-2`}></span>
//                 Key Concepts
//               </h4>
//               <ul className="space-y-3">
//                 {module.items.map((item, i) => (
//                   <li key={i} className="flex items-start">
//                     <span className="flex-shrink-0 mt-1 mr-3">
//                       <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                       </svg>
//                     </span>
//                     <span className="text-gray-700 dark:text-gray-300">{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
            
//             {/* Additional Resources */}
//             <div>
//               <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Resources</h4>
//               <div className="grid grid-cols-1 gap-3">
//                 <a href="#" className="flex items-center p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
//                   <span className="mr-3 text-blue-500">
//                     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
//                     </svg>
//                   </span>
//                   <span className="font-medium text-gray-700 dark:text-gray-300">Official Documentation</span>
//                 </a>
//                 <a href="#" className="flex items-center p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
//                   <span className="mr-3 text-red-500">
//                     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
//                     </svg>
//                   </span>
//                   <span className="font-medium text-gray-700 dark:text-gray-300">Video Tutorials</span>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Footer */}
//         <div className="p-6 border-t border-gray-200 dark:border-gray-700">
//           <button 
//             onClick={onClose}
//             className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md"
//           >
//             Got it, thanks!
//           </button>
//         </div>
//       </motion.div>
//     </>
//   );
// }



import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoaderData } from "react-router-dom";

export default function AdvancedRoadMap() {
  const roadmapData = useLoaderData();
  const [selectedModule, setSelectedModule] = useState(null);
  const [hoveredModule, setHoveredModule] = useState(null);
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const [angleProgress, setAngleProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // track dimensions and mobile
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDims({ width: rect.width, height: rect.height });
      }
    };
    window.addEventListener("resize", update);
    update();
    return () => window.removeEventListener("resize", update);
  }, []);

  // marker animation
  useEffect(() => {
    const id = setInterval(() => {
      setAngleProgress(prev => (prev + 0.5) % 360);
    }, 16);
    return () => clearInterval(id);
  }, []);

  const { width, height } = dims;
  const cx = width / 2;
  const cy = height / 2;
  const baseRadius = Math.min(width, height) * 0.35;
  const cardRadius = baseRadius + 60;
  const total = roadmapData.roadMap.length;

  const getPosition = (i, offset = 0) => {
    const ang = (i / total) * Math.PI * 2 - Math.PI / 2;
    return {
      x: cx + Math.cos(ang) * (cardRadius + offset),
      y: cy + Math.sin(ang) * (cardRadius + offset)
    };
  };

  return (
    <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20 dark:opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl opacity-30 animate-float1"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-400 rounded-full filter blur-3xl opacity-30 animate-float2"></div>
      </div>

      {/* Header */}
      <div className="relative max-w-6xl mx-auto text-center mb-16 px-4">
        <motion.div
          className="inline-block mb-6 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full border border-indigo-200 dark:border-indigo-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Learning Path</span>
        </motion.div>
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Master {roadmapData.whatIs.name}
        </motion.h2>
        <motion.p
          className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          A comprehensive, step-by-step guide to becoming proficient in {roadmapData.whatIs.name}
        </motion.p>
      </div>

      {/* Mobile list fallback */}
      {isMobile ? (
        <div className="relative max-w-2xl mx-auto px-4 space-y-4">
          {roadmapData.roadMap.map((mod, i) => (
            <motion.div
              key={i}
              className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedModule(mod)}
              whileHover={{ y: -2 }}
            >
              <div className="p-5 flex items-start gap-4">
                <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg ${mod.color} shadow-inner`}>
                  <img src={mod.icon} alt={mod.title} className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{mod.title}</h3>
                    <span className="text-xs font-medium px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full">
                      Step {i + 1}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{mod.description}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: 3 }).map((_, idx) => (
                        <span
                          key={idx}
                          className={`w-2 h-2 rounded-full ${idx < (mod.difficulty || 1) ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {mod.difficulty || 1}/3 difficulty
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div ref={containerRef} className="relative mx-auto w-full h-[600px] md:h-[800px]">
          {/* Animated glow effect */}
          <div 
            className="absolute inset-0 rounded-full opacity-20 dark:opacity-10 pointer-events-none"
            style={{
              left: cx - baseRadius - 100,
              top: cy - baseRadius - 100,
              width: (baseRadius + 100) * 2,
              height: (baseRadius + 100) * 2,
              background: 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, rgba(0,0,0,0) 70%)',
              filter: 'blur(20px)'
            }}
          />

          {/* Base circle path */}
          {width > 0 && (
            <svg className="absolute inset-0 w-full h-full">
              <circle
                cx={cx}
                cy={cy}
                r={baseRadius}
                stroke="url(#gradient)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="6 6"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {/* Center hub */}
          {width > 0 && (
            <motion.div
              className="absolute w-28 h-28 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex flex-col items-center justify-center text-white shadow-2xl border-8 border-white/10 backdrop-blur-sm"
              style={{ left: cx - 56 / 2, top: cy - 56 / 2 }}
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
            >
              <span className="text-3xl font-bold">{total}</span>
              <span className="text-xs tracking-wider uppercase opacity-80">Milestones</span>
            </motion.div>
          )}

          {/* Moving marker */}
          {width > 0 && (
            <motion.div
              className="absolute w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-xl border-4 border-white/90 flex items-center justify-center"
              style={{
                left: cx + Math.cos((angleProgress * Math.PI) / 180) * baseRadius - 28,
                top: cy + Math.sin((angleProgress * Math.PI) / 180) * baseRadius - 28
              }}
              animate={{ rotate: angleProgress }}
              transition={{ ease: 'linear', duration: 0 }}
            >
              <motion.div 
                animate={{ rotate: -angleProgress }} 
                className="w-full h-full flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7 text-white">
                  <path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                </svg>
              </motion.div>
            </motion.div>
          )}

          {/* Connecting lines */}
          {roadmapData.roadMap.map((_, i) => {
            const curr = getPosition(i);
            const next = getPosition((i + 1) % total);
            return (
              <svg key={i} className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1={curr.x}
                  y1={curr.y}
                  x2={next.x}
                  y2={next.y}
                  stroke="rgba(99,102,241,0.2)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>
            );
          })}

          {/* Module cards around circle */}
          {roadmapData.roadMap.map((mod, i) => {
            const pos = getPosition(i, hoveredModule === i ? 20 : 0);
            return (
              <motion.div
                key={i}
                className="absolute w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700/50 cursor-pointer overflow-hidden group"
                style={{ 
                  left: pos.x, 
                  top: pos.y, 
                  transform: 'translate(-50%, -50%)',
                  zIndex: hoveredModule === i ? 10 : 1
                }}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: hoveredModule === i ? 1.1 : 1,
                  y: 0
                }}
                transition={{ 
                  delay: i * 0.1, 
                  type: 'spring', 
                  stiffness: 300,
                  damping: 15
                }}
                onClick={() => setSelectedModule(mod)}
                onMouseEnter={() => setHoveredModule(i)}
                onMouseLeave={() => setHoveredModule(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative p-5 flex items-start gap-4">
                  <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg ${mod.color} shadow-inner`}>
                    <img src={mod.icon} alt={mod.title} className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">{mod.title}</h3>
                      <span className="text-xs font-medium px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full">
                        Step {i + 1}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{mod.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex gap-1">
                        {Array.from({ length: 3 }).map((_, idx) => (
                          <span
                            key={idx}
                            className={`w-2 h-2 rounded-full ${idx < (mod.difficulty || 1) ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {mod.difficulty || 1}/3 difficulty
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Details panel */}
      <AnimatePresence>
        {selectedModule && (
          <DetailsPanel module={selectedModule} onClose={() => setSelectedModule(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function DetailsPanel({ module, onClose }) {
  const items = module.items || [];
  const links = module.links || [];
  
  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      
      <motion.div
        className="fixed inset-x-0 bottom-0 bg-white dark:bg-gray-800 rounded-t-2xl shadow-2xl max-h-[90vh] overflow-auto mx-auto max-w-4xl z-50"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 p-6 flex justify-between items-center border-b border-gray-100 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${module.color} shadow-inner`}>
              <img src={module.icon} alt={module.title} className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold dark:text-white text-gray-900">{module.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{module.description}</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close panel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Key Concepts */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold">Key Concepts</h4>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((it, idx) => (
                <motion.li 
                  key={idx} 
                  className="flex items-start gap-3 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">{it}</span>
                </motion.li>
              ))}
            </ul>
          </section>
          
          {/* Resources */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold">Recommended Resources</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {links.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-gray-100 dark:border-gray-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-gray-200">{link.label}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{link.description}</div>
                    <div className="mt-2 text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      <span>Visit Resource</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </section>
          
          {/* Additional Notes */}
          {module.notes && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold">Pro Tips</h4>
              </div>
              <div className="bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/20 rounded-xl p-5">
                <p className="text-gray-700 dark:text-gray-300">{module.notes}</p>
              </div>
            </section>
          )}
        </div>
        
        {/* Footer */}
        <div className="sticky bottom-0 p-6 border-t border-gray-100 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <button 
            onClick={onClose} 
            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:from-purple-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            Got it - Continue Learning
          </button>
        </div>
      </motion.div>
    </>
  );
}
