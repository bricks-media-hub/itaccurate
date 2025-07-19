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
//   const [currentPage, setCurrentPage] = useState(0);

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
//   const itemsPerPage = isMobile ? 4 : 8;
//   const totalPages = Math.ceil(roadmapData.roadMap.length / itemsPerPage);
//   const currentItems = roadmapData.roadMap.slice(
//     currentPage * itemsPerPage,
//     (currentPage + 1) * itemsPerPage
//   );

//   // Split items for desktop view
//   const topRowItems = isMobile ? [] : currentItems.slice(0, Math.ceil(itemsPerPage / 2));
//   const bottomRowItems = isMobile ? [] : currentItems.slice(Math.ceil(itemsPerPage / 2));
//   const mobileItems = isMobile ? currentItems : [];

//   const closeDetailsPanel = () => {
//     setSelectedModule(null);
//   };

//   const handleNext = () => {
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
//   };

//   const handlePrev = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 0));
//   };

//   return (
//     <section className="relative w-full px-4 py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
//       <div className="max-w-7xl mx-auto relative">
//         <div className="text-center mb-16">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent text-gray-800 dark:text-white inline-block">
//             <span className="text-gray-800 dark:text-white">Roadmap to Learn </span>
//             <span className="text-blue-600">{roadmapData.whatIs.name}</span>
//           </h2>
//           {totalPages > 1 && (
//             <div className="flex justify-center mt-4 space-x-4">
//               <button
//                 onClick={handlePrev}
//                 disabled={currentPage === 0}
//                 className={`px-4 py-2 rounded-lg ${currentPage === 0 ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors`}
//               >
//                 Previous
//               </button>
//               <span className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
//                 Page {currentPage + 1} of {totalPages}
//               </span>
//               <button
//                 onClick={handleNext}
//                 disabled={currentPage === totalPages - 1}
//                 className={`px-4 py-2 rounded-lg ${currentPage === totalPages - 1 ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors`}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>

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
//           // Desktop: horizontal road with pagination
//           <div ref={roadContainerRef}>
//             {topRowItems.length > 0 && <EnhancedHighwayDesktop />}
//             {topRowItems.length > 0 && roadWidth > 0 && (
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
//                   totalItems={topRowItems.length}
//                 />
//               ))}
//             </div>

//             {connectionsVisible && topRowItems.length > 0 && bottomRowItems.length > 0 && (
//               <BezierConnectors topCount={topRowItems.length} bottomCount={bottomRowItems.length} />
//             )}

//             {bottomRowItems.length > 0 && (
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-28 md:mt-40 relative">
//                 {bottomRowItems.map((mod, i) => (
//                   <RoadmapItem
//                     key={i + topRowItems.length}
//                     module={mod}
//                     index={i + topRowItems.length}
//                     onClick={() => setSelectedModule(mod)}
//                     position="bottom"
//                     totalItems={bottomRowItems.length}
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
  const [selectedModule, setSelectedModule] = useState(null);
  const [connectionsVisible, setConnectionsVisible] = useState(false);
  const roadmapData = useLoaderData();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const roadContainerRef = useRef(null);
  const [roadWidth, setRoadWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // Track window width for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (roadContainerRef.current) {
        setRoadWidth(roadContainerRef.current.offsetWidth);
      }
    };
    
    window.addEventListener("resize", handleResize);
    
    // Initialize road width
    if (roadContainerRef.current) {
      setRoadWidth(roadContainerRef.current.offsetWidth);
    }
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Delay connectors for animation
  useEffect(() => {
    const timer = setTimeout(() => setConnectionsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const isMobile = windowWidth < 768;
  const itemsPerPage = isMobile ? 4 : 8;
  const totalPages = Math.ceil(roadmapData.roadMap.length / itemsPerPage);
  const currentItems = roadmapData.roadMap.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Split items for desktop view
  const topRowItems = isMobile ? [] : currentItems.slice(0, Math.ceil(itemsPerPage / 2));
  const bottomRowItems = isMobile ? [] : currentItems.slice(Math.ceil(itemsPerPage / 2));
  const mobileItems = isMobile ? currentItems : [];

  const closeDetailsPanel = () => {
    setSelectedModule(null);
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="relative w-full px-4 py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent text-gray-800 dark:text-white inline-block">
            <span className="text-gray-800 dark:text-white">Roadmap to Learn </span>
            <span className="text-blue-600">{roadmapData.whatIs.name}</span>
          </h2>
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className={`px-4 py-2 rounded-lg ${currentPage === 0 ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors`}
              >
                Previous
              </button>
              <span className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
                className={`px-4 py-2 rounded-lg ${currentPage === totalPages - 1 ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors`}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {isMobile ? (
          // Mobile: vertical timeline
          <div className="relative flex flex-col items-center">
            <VerticalHighwayMobile count={mobileItems.length} />

            <div className="space-y-16 w-full mt-8 z-10">
              {mobileItems.map((mod, i) => (
                <RoadmapItem
                  key={i}
                  module={mod}
                  index={i}
                  onClick={() => setSelectedModule(mod)}
                  position="mobile"
                  totalItems={mobileItems.length}
                  isMobile={true}
                />
              ))}
            </div>
          </div>
        ) : (
          // Desktop: horizontal road with pagination
          <div ref={roadContainerRef}>
            {topRowItems.length > 0 && <EnhancedHighwayDesktop />}
            {topRowItems.length > 0 && roadWidth > 0 && (
              <CyclingBoyDesktop roadWidth={roadWidth} />
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {topRowItems.map((mod, i) => (
                <RoadmapItem
                  key={i}
                  module={mod}
                  index={i}
                  onClick={() => setSelectedModule(mod)}
                  position="top"
                  totalItems={topRowItems.length}
                />
              ))}
            </div>

            {connectionsVisible && topRowItems.length > 0 && bottomRowItems.length > 0 && (
              <BezierConnectors topCount={topRowItems.length} bottomCount={bottomRowItems.length} />
            )}

            {bottomRowItems.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-28 md:mt-40 relative">
                {bottomRowItems.map((mod, i) => (
                  <RoadmapItem
                    key={i + topRowItems.length}
                    module={mod}
                    index={i + topRowItems.length}
                    onClick={() => setSelectedModule(mod)}
                    position="bottom"
                    totalItems={bottomRowItems.length}
                  />
                ))}
              </div>
            )}
          </div>
        )}
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

// Mobile vertical highway with markers
function VerticalHighwayMobile({ count }) {
  return (
    <div className="absolute left-1/2 top-0 bottom-0 w-2 -ml-1 z-0">
      <div className="absolute inset-0 bg-gray-700 rounded-lg"></div>
      <div className="absolute inset-0 flex flex-col justify-between">
        {[...Array(count + 1)].map((_, i) => (
          <div key={i} className="w-1 h-8 bg-yellow-400 rounded-full mx-auto"></div>
        ))}
      </div>
    </div>
  );
}

// Desktop highway with texture and lanes
function EnhancedHighwayDesktop() {
  return (
    <div className="absolute inset-x-0 top-[60%] h-28 -mt-14 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gray-800"></div>
      <div className="absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2"
        style={{
          background: "repeating-linear-gradient(90deg, transparent, transparent 20px, white 20px, white 40px)"
        }}></div>
      <div className="absolute top-1/2 left-0 w-6 h-4 bg-yellow-500 transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-6 h-4 bg-yellow-500 transform -translate-y-1/2"></div>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at center, white 1px, transparent 1px)",
        backgroundSize: "10px 10px"
      }}></div>
    </div>
  );
}

// Cycling boy that spans exactly the road width
function CyclingBoyDesktop({ roadWidth }) {
  return (
    <motion.div
      className="absolute top-1/2 w-16 h-16 mt-5 z-10"
      initial={{ x: -16 }} // Start just off-screen
      animate={{ x: roadWidth }}
      transition={{ 
        repeat: Infinity, 
        duration: 7, 
        ease: 'linear',
        repeatDelay: 0.5
      }}
    >
      <img 
        src="/icons/bike-rider.svg" 
        alt="Cycling Boy" 
        className="w-full h-full object-contain" 
      />
    </motion.div>
  );
}

// Smooth ramp connectors
function BezierConnectors({ topCount, bottomCount }) {
  const total = 4;
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
      {/* Top ramps */}
      {[...Array(topCount)].map((_, i) => {
        const startX = ((i + 0.5) / total) * 100;
        return (
          <g key={`top-${i}`}>  
            <path
              d={`M${startX}%,50% C${startX}%,45% ${(startX - 4)}%,30% ${(startX - 4)}%,20%`}
              stroke="#4a5568"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M${startX}%,50% C${startX}%,45% ${(startX - 4)}%,30% ${(startX - 4)}%,20%`}
              stroke="#e2e8f0"
              strokeWidth="1"
              strokeDasharray="4,4"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        );
      })}
      {/* Bottom ramps */}
      {[...Array(bottomCount)].map((_, i) => {
        const startX = ((i + 0.5) / total) * 100;
        return (
          <g key={`bot-${i}`}>  
            <path
              d={`M${startX}%,50% C${startX}%,55% ${(startX + 4)}%,70% ${(startX + 4)}%,80%`}
              stroke="#4a5568"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M${startX}%,50% C${startX}%,55% ${(startX + 4)}%,70% ${(startX + 4)}%,80%`}
              stroke="#e2e8f0"
              strokeWidth="1"
              strokeDasharray="4,4"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </svg>
  );
}

// Card component (mobile & desktop)
function RoadmapItem({ module, index, onClick, position, totalItems, isMobile }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="relative flex flex-col items-center text-center cursor-pointer"
    >
      {/* Desktop connector marker */}
      {!isMobile && position !== 'mobile' && (
        <div className="absolute w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 top-[50%] left-[-4rem] rounded-r-full" />
      )}

      <div 
        onClick={onClick}
        className="p-5 md:p-6 bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-lg hover:shadow-xl relative z-10 transition-all duration-300 w-full max-w-xs h-full flex flex-col"
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
          Explore More →
        </button>
      </div>

      {/* Mobile connector */}
      {isMobile && index < totalItems - 1 && (
        <div className="absolute top-full h-16 w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
      )}
    </motion.div>
  );
}

// Professional details panel component
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
