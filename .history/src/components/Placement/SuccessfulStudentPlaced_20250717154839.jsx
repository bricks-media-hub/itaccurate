import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    FaBuilding,
    FaCode,
    FaLongArrowAltDown,
    FaLongArrowAltUp,
    FaStar,
    FaGraduationCap
} from 'react-icons/fa';
import { fetchPlacedStudentData } from '../../api/fetchComponentData';

const SuccessfulStudentPlaced = () => {
    const [showAll, setShowAll] = useState(false);
    const [placedStudentsData, setPlacedStudentsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setPlacedStudentsData(await fetchPlacedStudentData());
        };
        fetchData();
    }, []);

    const displayedStudents = Array.isArray(placedStudentsData)
        ? showAll
            ? placedStudentsData
            : placedStudentsData.slice(0, 12)
        : [];

    return (
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Our Successfully Placed <span className="text-indigo-600 dark:text-indigo-400">Students</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Talented individuals who transformed their careers through our programs
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative">
                    {displayedStudents.map((student) => (
                        <motion.div
                            key={student.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ y: -5 }}
                            className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
                        >
                            {/* Background gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-700 dark:to-gray-800 opacity-70 group-hover:opacity-90 transition-opacity" />
                            
                            {/* Student badge */}
                            {student.isTopHired && (
                                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center z-10">
                                    <FaStar className="mr-1" /> Top Hire
                                </div>
                            )}
                            
                            <div className="relative p-6 h-full flex flex-col">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="relative">
                                        <img
                                            src={student.photo}
                                            alt={student.name}
                                            className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md"
                                            onContextMenu={(e) => e.preventDefault()}
                                            draggable="false"
                                        />
                                        <div className="absolute -bottom-1 -right-1 bg-indigo-500 rounded-full p-1">
                                            <FaGraduationCap className="text-white text-xs" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                            {student.name}
                                        </h3>
                                        <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                                            {student.role}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Batch: {student.batch}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-2 mb-4">
                                    <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                        {student.logo ? (
                                            <img 
                                                src={student.logo} 
                                                alt="company logo" 
                                                className="w-auto h-5 mr-2 object-contain max-w-[120px]" 
                                            />
                                        ) : (
                                            <FaBuilding className="mr-2 text-indigo-500 dark:text-indigo-400" />
                                        )}
                                        <span className="truncate">{student.company}</span>
                                    </div>

                                    {student.package && (
                                        <div className="bg-indigo-50 dark:bg-gray-700 rounded-lg px-3 py-2 mb-3">
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Package</p>
                                            <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                                {student.package}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">
                                        <FaCode className="mr-2 text-indigo-500 dark:text-indigo-400" />
                                        <span>Tech Stack</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {student.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-2.5 py-1 bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-700 dark:text-indigo-300 text-xs font-medium rounded-full border border-indigo-200 dark:border-indigo-700"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Gradient fade effect at the bottom */}
                    {!showAll && placedStudentsData.length > 8 && (
                        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-gray-900 to-transparent pointer-events-none" />
                    )}
                </div>

                {/* Show More / Less Button */}
                {placedStudentsData.length > 12 && (
                    <div className="relative mt-16 flex justify-center">
                        {!showAll ? (
                            <>
                                <div className="absolute mt-[-22vh] w-screen h-32 bg-gradient-to-b from-transparent via-white/90 to-white dark:via-gray-900/90 dark:to-gray-900 z-10" />
                                <motion.button
                                    onClick={() => setShowAll(true)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="absolute mt-[-20vh] flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition-colors rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-lg z-20"
                                >
                                    Show More <FaLongArrowAltDown />
                                </motion.button>
                            </>
                        ) : (
                            <motion.button
                                onClick={() => {
                                    setShowAll(false);
                                    window.scrollTo({
                                        top: document.querySelector('#student-section').offsetTop - 100,
                                        behavior: 'smooth'
                                    });
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors border border-indigo-300 dark:border-indigo-700 rounded-full hover:border-indigo-400 dark:hover:border-indigo-500 bg-white dark:bg-gray-900 shadow-md"
                            >
                                Show Less <FaLongArrowAltUp />
                            </motion.button>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default SuccessfulStudentPlaced;