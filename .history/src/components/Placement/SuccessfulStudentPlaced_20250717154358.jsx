import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    FaBuilding,
    FaCode,
    FaLongArrowAltDown,
    FaLongArrowAltUp,
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
                        Our Successfully Placed Students
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Talented individuals who transformed their careers through our programs
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative">
                    {displayedStudents.map((student) => (
                        <motion.div
                            key={student.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ scale: 1.02 }}
                            className="bg-slate-200 flex flex-col justify-evenly h-64 dark:bg-slate-700 backdrop-blur-md rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
                        >
                            <div className="p-5">
                                <div className="flex items-center space-x-4 mb-4">
                                    <img
                                        src={student.photo}
                                        alt={student.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow"
                                        onContextMenu={(e) => e.preventDefault()}
                                        draggable="false"
                                    />
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            {student.name}
                                        </h3>
                                        <p className="text-base text-indigo-600 dark:text-indigo-400">
                                            {student.role}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center text-base text-gray-600 dark:text-gray-300">
                                        {student.logo ? (<img )}
                                        <FaBuilding className="mr-2 text-indigo-500 dark:text-indigo-400" />
                                        <span>{student.company}</span>
                                    </div>

                                    <div className="pt-3 border-t border-gray-300 dark:border-gray-500">
                                        <div className="flex items-center text-base text-gray-600 dark:text-gray-300 mb-2">
                                            <FaCode className="mr-2 text-indigo-500 dark:text-indigo-400" />
                                            <span>Skills:</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {student.skills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2.5 py-1 bg-indigo-500 dark:bg-indigo-700 text-white dark:text-indigo-300 text-xs font-medium rounded-full"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Gradient fade effect at the bottom */}
                    {!showAll && placedStudentsData.length > 8 && (
                        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-gray-900 to-transparent " />
                    )}
                </div>

                {/* Show More / Less Button with enhanced blur effect */}
                {placedStudentsData.length > 12 && (
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

export default SuccessfulStudentPlaced;