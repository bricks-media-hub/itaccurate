// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useLoaderData } from "react-router-dom";

// export default function RoadMap() {
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [connectionsVisible, setConnectionsVisible] = useState(false);
//   const roadmapData = useLoaderData();
//   const [zIndex, setZIndex] = useState(0);
//   const [activeLayer, setActiveLayer] = useState(0);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setConnectionsVisible(true);
//     }, 500);
//     return () => clearTimeout(timer);
//   }, []);

//   // Check if we have only 4 items (no bottom row)
//   const hasOnlyOneRow = roadmapData.roadMap.length <= 4;
//   const topRowItems = roadmapData.roadMap.slice(0, 4);
//   const bottomRowItems = hasOnlyOneRow ? [] : roadmapData.roadMap.slice(4, 8);

//   return (
//     <section className="relative w-full px-4 py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
//       <div className="max-w-7xl mx-auto relative z-0">
//         {/* Title */}
//         <div className="text-center mb-16">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent text-gray-800 dark:text-white inline-block">
//             <span className="text-gray-800 dark:text-white">Roadmap to Learn </span> 
//             <span className="text-blue-600">{roadmapData.whatIs.name}</span>
//           </h2>
//         </div>

//         {/* Main Content Area */}
//         <div className="relative">
//           {/* Top Row */}
//           <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${hasOnlyOneRow ? '' : 'mb-32'} relative z-10`}>
//             {topRowItems.map((module, index) => (
//               <RoadmapItem
//                 key={index}
//                 module={module}
//                 index={index}
//                 activeIndex={activeIndex}
//                 setActiveIndex={setActiveIndex}
//                 position={hasOnlyOneRow ? "single" : "top"}
//                 totalItems={roadmapData.roadMap.length}
//               />
//             ))}
//           </div>

//           {/* Central Pipeline - only show if we have two rows */}
//           {!hasOnlyOneRow && <CentralPipeline />}

//           {/* Connection Pipes */}
//           {connectionsVisible && (
//             <ConnectionsPipes roadmapData={roadmapData} hasOnlyOneRow={hasOnlyOneRow} />
//           )}

//           {/* Bottom Row - only if we have more than 4 items */}
//           {!hasOnlyOneRow && (
//             <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-32 relative z-${activeLayer}`}>
//               {bottomRowItems.map((module, index) => (
//                 <RoadmapItem
//                   key={index + 4}
//                   module={module}
//                   index={index + 4}
//                   activeIndex={activeIndex}
//                   setActiveIndex={setActiveIndex}
//                   position="bottom"
//                   totalItems={roadmapData.roadMap.length}
//                   setActiveLayer={setActiveLayer}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Decorative Blur Lights */}
//         <div className="absolute top-0 left-0 w-40 h-40 bg-blue-400 rounded-full filter blur-3xl opacity-10 -z-10" />
//         <div className="absolute bottom-0 right-0 w-60 h-60 bg-indigo-500 rounded-full filter blur-3xl opacity-10 -z-10" />
//       </div>
//     </section>
//   );
// }

// // Central Pipeline Component
// const CentralPipeline = () => (
//   <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-2 hidden md:block z-0">
//     <div className="relative w-full h-full">
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-2xl overflow-hidden">
//         <motion.div
//           initial={{ x: "-100%" }}
//           animate={{ x: "100%" }}
//           transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
//           className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white/40 via-white/20 to-transparent opacity-50"
//         />
//       </div>
//     </div>
//   </div>
// );

// // Connections Pipes Component - updated to handle single row
// const ConnectionsPipes = ({ roadmapData, hasOnlyOneRow }) => (
//   <div className="absolute left-0 right-0 top-0 bottom-0 pointer-events-none hidden md:block z-0">
//     <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
//       <defs>
//         <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//           <stop offset="0%" stopColor="#3b82f6" />
//           <stop offset="50%" stopColor="#8b5cf6" />
//           <stop offset="100%" stopColor="#ec4899" />
//         </linearGradient>
//       </defs>

//       {/* Only show horizontal pipe if we have two rows */}
//       {!hasOnlyOneRow && (
//         <path
//           d="M10,50 L90,50"
//           stroke="url(#pipeGradient)"
//           strokeWidth="1.5"
//           fill="none"
//           strokeLinecap="round"
//         />
//       )}

//       {roadmapData.roadMap.map((_, index) => {
//         const col = index % 4;
//         const x = 12.5 + (col * 25);
//         const isTop = index < 4;
//         const yStart = hasOnlyOneRow ? 50 : (isTop ? 20 : 80);
//         const yEnd = hasOnlyOneRow ? 80 : 50;

//         return (
//           <g key={index}>
//             <motion.path
//               d={`M${x},${yStart} L${x},${yEnd}`}
//               initial={{ pathLength: 0 }}
//               animate={{ pathLength: 1 }}
//               transition={{ duration: 0.6, delay: index * 0.15 }}
//               stroke="url(#pipeGradient)"
//               strokeWidth="0.8"
//               fill="none"
//               strokeLinecap="round"
//             />
//             {/* <motion.circle
//               cx={x}
//               cy={yStart}
//               r="1.5"
//               fill="white"
//               initial={{ opacity: 0, scale: 0 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: index * 0.15 + 0.4, duration: 0.4 }}
//             /> */}
//           </g>
//         );
//       })}
//     </svg>
//   </div>
// );

// // Roadmap Item Component - updated to handle single row position
// const RoadmapItem = ({ module, index, activeIndex, setActiveIndex, position, totalItems, setActiveLayer }) => {
//   const delay = index * 0.1;
//   const zIndexOffset = position === "top" ? totalItems - index : index;
//   // { position === "top" ? setZIndex(10) : setZIndex(0) }
  

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: position === "top" ? -20 : position === "bottom" ? 20 : 0 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay }}
//       className="relative flex flex-col items-center text-center"
//       style={{ zIndex: zIndexOffset }}
//     >
//       {/* Connection Dot - only show if not single row */}
//       {position !== "single" && (
//         <div 
//           className="absolute hidden md:flex items-center justify-center"
//           style={{
//             top: position === "top" ? "calc(100% + 30px)" : "auto",
//             bottom: position === "bottom" ? "calc(100% + 30px)" : "auto",
//             left: "50%",
//             transform: "translateX(-50%)",
//             width: "24px",
//             height: "24px",
//             borderRadius: "9999px",
//             background: "linear-gradient(to bottom right, #3b82f6, #ec4899)",
//             color: "white",
//             fontSize: "14px",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
//             zIndex: 10,
//           }}
//         >
//           📊
//         </div>
//       )}

//       {/* Main Icon Button */}
//       <motion.div
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.95 }}
//         onMouseEnter={() => {setActiveIndex(index); setActiveLayer(10);}}
//         onMouseLeave={() => {setActiveIndex(null); setActiveLayer(0);}}
//         className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-2xl bg-gradient-to-tr ${module.color} text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer`}
//       >
//         <img src={module?.icon} alt='icon' className="w-10 h-10" />
//         <div className="absolute -inset-2 rounded-full border-2 border-white/30 animate-ping opacity-0 hover:opacity-100 transition-opacity"></div>
//       </motion.div>

//       {/* Title & Description */}
//       <div className="mt-4 px-2">
//         <h3 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
//           {module.title}
//         </h3>
//         <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
//           {module.description}
//         </p>
//       </div>

//       {/* Expandable Detail */}
//       <AnimatePresence>
//         {activeIndex === index && (
//           <motion.div
//             initial={{ opacity: 0, y: position === "top" ? 10 : position === "bottom" ? -10 : 10, scale: 0.9 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: position === "top" ? 10 : position === "bottom" ? -10 : 10, scale: 0.9 }}
//             className={`absolute z-50 ${position === "top" ? "top-full mt-0" : position === "bottom" ? "bottom-full mb-4" : "top-full mt-4"} w-[90vw] max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 text-left backdrop-blur-sm`}
//             // style={{ zIndex: 1000 + index }}
//           >
//             <div 
//               className={`absolute ${position === "top" ? "-top-2" : position === "bottom" ? "-bottom-2" : "-top-2"} left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 rotate-45 ${position === "top" ? "border-t border-l" : position === "bottom" ? "border-b border-r" : "border-t border-l"} border-gray-200 dark:border-gray-700`}
//             />
//             <h4 className="font-semibold text-lg mb-2 flex items-center">
//               <span className={`bg-gradient-to-r ${module.color} rounded-full w-10 h-10 flex items-center justify-center text-white mr-2 text-sm`}>
//                 <img src={module?.icon} alt='small icon' className="w-5 h-5" />
//               </span>
//               {module.title} Details
//             </h4>
//             <ul className="space-y-2">
//               {module.items.map((item, i) => (
//                 <li key={i} className="flex items-start">
//                   <span className={`flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-gradient-to-br ${module.color} text-white flex items-center justify-center text-[10px] mr-2`}>
//                     ✓
//                   </span>
//                   <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };



import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

// Curved SVG path generator
const generateCurvePath = (points, tension = 0.5) => {
  if (points.length < 2) return "";
  
  const first = points[0];
  let path = `M${first.x},${first.y}`;
  
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i-1];
    const p1 = points[i];
    
    // Control points
    const dx = (p1.x - p0.x) * tension;
    const dy = (p1.y - p0.y) * tension;
    
    path += ` C${p0.x + dx},${p0.y} ${p1.x - dx},${p1.y} ${p1.x},${p1.y}`;
  }
  
  return path;
};

export default function RoadMap({ data, title }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [pathData, setPathData] = useState("");
  const [nodePositions, setNodePositions] = useState([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = React.useRef();

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate node positions and path
  useEffect(() => {
    if (!containerWidth || !data.length) return;

    const positions = [];
    const segmentWidth = containerWidth / (data.length - 1);
    const baseY = isMobile ? 120 : 150;
    const amplitude = isMobile ? 40 : 60;
    const frequency = 0.5;

    data.forEach((_, i) => {
      const x = i * segmentWidth;
      // Sine wave for curved path
      const y = baseY + Math.sin(i * frequency) * amplitude;
      positions.push({ x, y });
    });

    setNodePositions(positions);
    setPathData(generateCurvePath(positions));
  }, [data, containerWidth, isMobile]);

  return (
    <section className="w-full py-12 md:py-16 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-gray-800 dark:text-white">Roadmap to </span> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              {title}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Roadmap container */}
        <div 
          ref={containerRef} 
          className="relative min-h-[300px] md:min-h-[250px]"
        >
          {/* Curved road path */}
          <svg 
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${containerWidth} 300`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
              <filter id="roadGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
              </filter>
            </defs>
            <path 
              d={pathData} 
              stroke="url(#roadGradient)" 
              strokeWidth={isMobile ? 8 : 12} 
              fill="none" 
              strokeLinecap="round"
              filter="url(#roadGlow)"
            />
          </svg>

          {/* Road nodes */}
          <div className="relative z-10">
            {data.map((node, idx) => (
              <RoadNode
                key={idx}
                node={node}
                position={nodePositions[idx]}
                isActive={activeIndex === idx}
                onActivate={() => setActiveIndex(idx)}
                onDeactivate={() => setActiveIndex(null)}
                isMobile={isMobile}
                index={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RoadNode({ node, position, isActive, onActivate, onDeactivate, isMobile, index }) {
  if (!position) return null;
  
  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {/* Node branch */}
      <div className={`absolute ${isMobile ? 'w-1 h-8' : 'w-8 h-1'} bg-gradient-to-r from-blue-500 to-purple-600 ${index % 2 === 0 ? (isMobile ? '-right-4 top-1/2' : '-top-6 left-1/2 -translate-x-1/2') : (isMobile ? '-left-4 top-1/2' : '-bottom-6 left-1/2 -translate-x-1/2')}`}></div>
      
      {/* Node */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-20"
        onMouseEnter={onActivate}
        onMouseLeave={onDeactivate}
      >
        {/* Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-md opacity-70"></div>
          <div className="relative z-10 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg cursor-pointer">
            <img src={node.icon} alt={node.title} className="w-8 h-8 md:w-10 md:w-10" />
          </div>
        </div>

        {/* Title */}
        <motion.h3 
          className="mt-3 text-center font-semibold text-gray-800 dark:text-gray-200 text-sm md:text-base whitespace-nowrap"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {node.title}
        </motion.h3>

        {/* Details Popup */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`absolute z-30 w-64 md:w-72 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-5 text-left ${index % 2 === 0 ? (isMobile ? 'left-full ml-4 top-1/2 -translate-y-1/2' : 'bottom-full mb-4 left-1/2 -translate-x-1/2') : (isMobile ? 'right-full mr-4 top-1/2 -translate-y-1/2' : 'top-full mt-4 left-1/2 -translate-x-1/2')}`}
            >
              <div className="absolute w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45 -z-10"
                style={{
                  [index % 2 === 0 
                    ? (isMobile ? 'left:-8px' : 'bottom:-8px') 
                    : (isMobile ? 'right:-8px' : 'top:-8px'),
                  [isMobile ? 'top:50%' : 'left:50%']: '',
                  marginLeft: isMobile ? '' : '-8px',
                  marginTop: isMobile ? '-8px' : ''
                }}
              ></div>
              
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                {node.description}
              </p>
              <ul className="space-y-2">
                {node.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="inline-block mt-1 mr-2 text-blue-500">•</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );


RoadMap.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  title: PropTypes.string,
};

RoadMap.defaultProps = {
  title: "Learning Roadmap",
};

