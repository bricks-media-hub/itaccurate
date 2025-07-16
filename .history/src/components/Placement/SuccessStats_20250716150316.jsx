// import { motion } from 'framer-motion';
// import { useEffect, useState } from 'react';

// const SuccessStats = () => {
// const placements = [
//   // SAP Roles
//   { role: "SAP ABAP Consultants", count: 430, icon: "🖥️", color: "from-blue-300 to-blue-500" },
//   { role: "SAP FICO Consultants", count: 610, icon: "💰", color: "from-green-300 to-green-500" },
//   { role: "SAP SD Consultants", count: 530, icon: "📊", color: "from-purple-300 to-purple-500" },
//   { role: "SAP MM Consultants", count: 480, icon: "📦", color: "from-yellow-300 to-yellow-500" },
//   { role: "SAP Basis Administrators", count: 390, icon: "⚙️", color: "from-red-300 to-red-500" },
//   { role: "SAP HANA Consultants", count: 450, icon: "💾", color: "from-indigo-300 to-indigo-500" },
//   { role: "SAP SuccessFactors Consultants", count: 340, icon: "👥", color: "from-pink-300 to-pink-500" },
//   { role: "SAP PP Consultants", count: 310, icon: "🏭", color: "from-orange-300 to-orange-500" },
//   { role: "SAP BW/BI Developers", count: 290, icon: "📈", color: "from-teal-300 to-teal-500" },
//   { role: "SAP Project Managers", count: 280, icon: "👔", color: "from-gray-300 to-gray-500" },

//   // Salesforce Roles
//   { role: "Salesforce Administrator", count: 420, icon: "☁️", color: "from-blue-200 to-blue-400" },
//   { role: "Salesforce Architect", count: 350, icon: "🏗️", color: "from-blue-300 to-blue-500" },
//   { role: "Salesforce Marketing Cloud Specialist", count: 300, icon: "📢", color: "from-pink-200 to-pink-400" },
//   { role: "Salesforce Einstein Analytics Consultant", count: 200, icon: "🧠", color: "from-purple-200 to-purple-400" },

//   // Cloud/Other SAP
//   { role: "SAP Cloud Platform Consultant", count: 400, icon: "☁️", color: "from-blue-200 to-blue-400" },
//   { role: "SAP S/4HANA Finance Consultant", count: 450, icon: "💳", color: "from-green-300 to-green-500" },

//   // Development Roles
//   { role: "Java Developers", count: 532, icon: "☕", color: "from-red-300 to-red-500" },
//   { role: "Full Stack Engineer (MERN Stack)", count: 800, icon: "🔄", color: "from-green-300 to-green-500" },
//   { role: "MEAN Stack Developer", count: 750, icon: "🔄", color: "from-red-200 to-red-400" },
//   { role: "Python Developers", count: 680, icon: "🐍", color: "from-yellow-300 to-yellow-500" },
//   { role: ".NET Developers", count: 440, icon: "🔵", color: "from-purple-300 to-purple-500" },

//   // AI/ML Roles
//   { role: "AI/ML Research Scientist", count: 350, icon: "🤖", color: "from-indigo-200 to-indigo-400" },
//   { role: "Machine Learning Ops (MLOps) Engineer", count: 410, icon: "⚙️", color: "from-blue-200 to-blue-400" },
//   { role: "Python Web Developer (Django/Flask)", count: 620, icon: "🕸️", color: "from-yellow-200 to-yellow-400" },

//   // DevOps Roles
//   { role: "AWS DevOps Engineer", count: 540, icon: "☁️", color: "from-orange-200 to-orange-400" },
//   { role: "DevOps Engineer (Azure DevOps)", count: 450, icon: "🔷", color: "from-blue-200 to-blue-400" },
//   { role: "Kubernetes Specialist", count: 500, icon: "⚓", color: "from-blue-100 to-blue-300" },
//   { role: "Docker Specialist", count: 480, icon: "🐳", color: "from-blue-100 to-blue-300" },

//   // Other Development
//   { role: "PHP Developers", count: 250, icon: "🐘", color: "from-purple-200 to-purple-400" },
//   { role: "Angular Developers", count: 623, icon: "🅰️", color: "from-red-300 to-red-500" },
//   { role: "React Developers", count: 701, icon: "⚛️", color: "from-blue-100 to-blue-300" },
//   { role: "Salesforce Developers", count: 378, icon: "💻", color: "from-blue-100 to-blue-300" },
//   { role: "Power BI Developers", count: 371, icon: "📊", color: "from-yellow-200 to-yellow-400" },

//   // General Roles
//   { role: "Frontend Developers", count: 1012, icon: "🎨", color: "from-blue-200 to-blue-400" },
//   { role: "Full Stack Developers", count: 1819, icon: "🔄", color: "from-purple-200 to-purple-400" },
//   { role: "Data Analyst", count: 1583, icon: "📊", color: "from-green-200 to-green-400" },
//   { role: "Data Scientist", count: 485, icon: "🔬", color: "from-blue-300 to-blue-500" },
//   { role: "Database Engineers", count: 1901, icon: "🗄️", color: "from-gray-200 to-gray-400" },
//   { role: "Business Analysts", count: 371, icon: "📑", color: "from-indigo-200 to-indigo-400" },
//   { role: "AI Engineers", count: 483, icon: "🧠", color: "from-purple-300 to-purple-500" },
//   { role: "Business Intelligence Developers", count: 588, icon: "📈", color: "from-teal-200 to-teal-400" }
// ];


//   return (
//     <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-14"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
//             Placement Success Statistics
//           </h2>
//           <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//             Join thousands of successful students who’ve launched their careers with IT ACCURATE.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {placements.map((placement, index) => (
// <motion.div
//   key={index}
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.4, delay: index * 0.1 }}
//   whileHover={{ scale: 1.03 }}
//   className={`relative bg-gradient-to-br ${placement.color} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300`}
// >
//   {/* Blur Overlay */}
//   <div className="absolute inset-0 bg-white/60 backdrop-blur-md border border-white/60 rounded-xl z-10 pointer-events-none" />

//   {/* Content */}
//   <div className="relative z-20 p-6 text-center">
//     <div className="text-4xl mb-3">{placement.icon}</div>
//     <h3 className="text-lg font-semibold text-black mb-2">{placement.role}</h3>
//     <p className="text-3xl font-bold text-black">
//       <Counter target={placement.count} />
//     </p>
//   </div>
// </motion.div>


//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // Counter animation
// const Counter = ({ target }) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     const duration = 1500;
//     const increment = target / (duration / 16);

//     const timer = setInterval(() => {
//       setCount(prev => {
//         const next = prev + increment;
//         if (next >= target) {
//           clearInterval(timer);
//           return target;
//         }
//         return next;
//       });
//     }, 8);

//     return () => clearInterval(timer);
//   }, [target]);

//   return <>{Math.floor(count).toLocaleString()}+</>;
// };

// export default SuccessStats;







import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa';

const SuccessStats = () => {
  const [showAll, setShowAll] = useState(false);
  const placements = [
  // SAP Roles
  { role: "SAP ABAP Consultants", count: 430, icon: "/icons/computer.svg", color: "from-blue-300 to-blue-500" },
  { role: "SAP FICO Consultants", count: 610, icon: "/icons/money-pouch.svg", color: "from-green-300 to-green-500" },
  { role: "SAP SD Consultants", count: 530, icon: "/icons/sap.svg", color: "from-purple-300 to-purple-500" },
  { role: "SAP MM Consultants", count: 480, icon: "/icons/box.svg", color: "from-yellow-300 to-yellow-500" },
  { role: "SAP Basis Administrators", count: 390, icon: "/icons/settings.svg", color: "from-red-300 to-red-500" },
  { role: "SAP HANA Consultants", count: 450, icon: "/icons/teaching.svg", color: "from-indigo-300 to-indigo-500" },
  { role: "SAP SuccessFactors Consultants", count: 340, icon: "/icons/users.svg", color: "from-pink-300 to-pink-500" },
  { role: "SAP PP Consultants", count: 310, icon: "/icons/factory.svg", color: "from-orange-300 to-orange-500" },
  { role: "SAP BW/BI Developers", count: 290, icon: "/icons/increasing-graph.svg", color: "from-teal-300 to-teal-500" },
  { role: "SAP Project Managers", count: 280, icon: "/icons/formal.svg", color: "from-gray-300 to-gray-500" },

  // Salesforce Roles
  { role: "Salesforce Administrator", count: 420, icon: "/icons/cloud.svg", color: "from-blue-200 to-blue-400" },
  { role: "Salesforce Architect", count: 350, icon: "/icons/crane.svg", color: "from-blue-300 to-blue-500" },
  { role: "Salesforce Marketing Cloud Specialist", count: 300, icon: "/icons/cloud-computing.svg", color: "from-pink-200 to-pink-400" },
  { role: "Salesforce Einstein Analytics Consultant", count: 200, icon: "/icons/brain.svg", color: "from-purple-200 to-purple-400" },

  // Cloud/Other SAP
  { role: "SAP Cloud Platform Consultant", count: 400, icon: "/icons/cloud.svg", color: "from-blue-200 to-blue-400" },
  { role: "SAP S/4HANA Finance Consultant", count: 450, icon: "/icons/acc-re", color: "from-green-300 to-green-500" },

  // Development Roles
  { role: "Java Developers", count: 532, icon: "☕", color: "from-red-300 to-red-500" },
  { role: "Full Stack Engineer (MERN Stack)", count: 800, icon: "🔄", color: "from-green-300 to-green-500" },
  { role: "MEAN Stack Developer", count: 750, icon: "🔄", color: "from-red-200 to-red-400" },
  { role: "Python Developers", count: 680, icon: "🐍", color: "from-yellow-300 to-yellow-500" },
  { role: ".NET Developers", count: 440, icon: "🔵", color: "from-purple-300 to-purple-500" },

  // AI/ML Roles
  { role: "AI/ML Research Scientist", count: 350, icon: "🤖", color: "from-indigo-200 to-indigo-400" },
  { role: "Machine Learning Ops (MLOps) Engineer", count: 410, icon: "⚙️", color: "from-blue-200 to-blue-400" },
  { role: "Python Web Developer (Django/Flask)", count: 620, icon: "🕸️", color: "from-yellow-200 to-yellow-400" },

  // DevOps Roles
  { role: "AWS DevOps Engineer", count: 540, icon: "☁️", color: "from-orange-200 to-orange-400" },
  { role: "DevOps Engineer (Azure DevOps)", count: 450, icon: "🔷", color: "from-blue-200 to-blue-400" },
  { role: "Kubernetes Specialist", count: 500, icon: "⚓", color: "from-blue-100 to-blue-300" },
  { role: "Docker Specialist", count: 480, icon: "🐳", color: "from-blue-100 to-blue-300" },

  // Other Development
  { role: "PHP Developers", count: 250, icon: "🐘", color: "from-purple-200 to-purple-400" },
  { role: "Angular Developers", count: 623, icon: "🅰️", color: "from-red-300 to-red-500" },
  { role: "React Developers", count: 701, icon: "⚛️", color: "from-blue-100 to-blue-300" },
  { role: "Salesforce Developers", count: 378, icon: "💻", color: "from-blue-100 to-blue-300" },
  { role: "Power BI Developers", count: 371, icon: "📊", color: "from-yellow-200 to-yellow-400" },

  // General Roles
  { role: "Frontend Developers", count: 1012, icon: "🎨", color: "from-blue-200 to-blue-400" },
  { role: "Full Stack Developers", count: 1819, icon: "🔄", color: "from-purple-200 to-purple-400" },
  { role: "Data Analyst", count: 1583, icon: "📊", color: "from-green-200 to-green-400" },
  { role: "Data Scientist", count: 485, icon: "🔬", color: "from-blue-300 to-blue-500" },
  { role: "Database Engineers", count: 1901, icon: "🗄️", color: "from-gray-200 to-gray-400" },
  { role: "Business Analysts", count: 371, icon: "📑", color: "from-indigo-200 to-indigo-400" },
  { role: "AI Engineers", count: 483, icon: "🧠", color: "from-purple-300 to-purple-500" },
  { role: "Business Intelligence Developers", count: 588, icon: "📈", color: "from-teal-200 to-teal-400" }
];
  const visibleCount = showAll ? placements.length : 12;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gradient-to-b dark:from-gray-700 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Placement Success Statistics
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of successful students who’ve launched their careers with IT ACCURATE.
          </p>
        </motion.div>

        {/* Grid of cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {placements.slice(0, visibleCount).map((placement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className={`relative flex flex-col justify-evenly h-52 bg-gradient-to-br ${placement.color} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              {/* Blur Overlay */}
              <div className="absolute inset-0 bg-white/60 backdrop-blur-md border border-white/60 rounded-xl z-10 pointer-events-none" />

              {/* Content */}
              <div className="relative z-20 p-6 text-center">
                <div className="text-4xl mb-3">
                  <img src={placement.icon} alt='icons' className='w-14 h-14' />
                  </div>
                <h3 className="text-lg font-semibold text-black mb-2">{placement.role}</h3>
                <p className="text-3xl font-bold text-black">
                  <Counter target={placement.count} />
                </p>
              </div>
            </motion.div>
          ))}
        </div>
                            {!showAll && placements.length > 8 && (
                        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-gray-900 to-transparent pointer-events-none" />
                    )}

        {/* Show More / Show Less Button */}
                {placements.length > 12 && (
                    <>
                        {!showAll ? (
                            <div className="relative mt-16 flex justify-center">
                                {/* Blurry gradient background */}
                                <div className="absolute mt-[-22vh] w-screen h-32 bg-gradient-to-b from-transparent via-white/80 to-white/90 dark:via-gray-900/80 dark:to-gray-900/90 z-10" />

                                {/* Show More Button */}
                                <motion.button
                                    onClick={() => setShowAll(true)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="absolute mt-[-20vh] flex items-center gap-2 px-6 py-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors border border-indigo-300 dark:border-indigo-700 rounded-full hover:border-indigo-400 dark:hover:border-indigo-500 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg z-20"
                                >
                                    Show More <FaLongArrowAltDown />
                                </motion.button>
                            </div>
                        ) : (
                            <div className="mt-10 flex justify-center">
                                {/* Show Less Button without blur */}
                                <motion.button
                                    onClick={() => setShowAll(false)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors border border-indigo-300 dark:border-indigo-700 rounded-full hover:border-indigo-400 dark:hover:border-indigo-500 bg-white dark:bg-gray-900 shadow-md"
                                >
                                    Show Less <FaLongArrowAltUp />
                                </motion.button>
                            </div>
                        )}
                    </>
                )}
      </div>
    </section>
  );
};

// Counter animation
const Counter = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      setCount(prev => {
        const next = prev + increment;
        if (next >= target) {
          clearInterval(timer);
          return target;
        }
        return next;
      });
    }, 8);

    return () => clearInterval(timer);
  }, [target]);

  return <>{Math.floor(count).toLocaleString()}+</>;
};

export default SuccessStats;
