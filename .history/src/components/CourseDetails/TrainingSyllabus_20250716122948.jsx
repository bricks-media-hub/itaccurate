import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Simplified color palette with 5 default colors
const defaultColors = [
    // Blues
    'bg-blue-500',      // Primary blue
    'bg-sky-500',       // Light sky blue
    'bg-indigo-500',    // Deep indigo
    
    // Greens
    'bg-emerald-500',   // Vibrant green
    'bg-green-500',     // Classic green
    'bg-lime-500',      // Bright lime
    
    // Oranges/Yellows
    'bg-amber-500',     // Warm orange
    'bg-orange-500',    // Pure orange
    'bg-yellow-500',    // Sunny yellow
    
    // Purples/Pinks
    'bg-violet-500',    // Soft purple
    'bg-purple-500',    // Royal purple
    'bg-rose-500',      // Elegant pink

    // 
     'bg-pink-500',    // Bright pink
     'bg-red-500',     // Bold red
     'bg-teal-500',    // Blue-green teal
];

const DEFAULT_COLOR = 'bg-blue-500';

const TrainingSyllabus = ({ syllabus }) => {
    const [activeSection, setActiveSection] = useState(0);
    const [isHovering, setIsHovering] = useState(null);
    const [shouldScroll, setShouldScroll] = useState(false);
    const [sectionColors, setSectionColors] = useState([]);
    const activeSectionRef = useRef(null);

    const sectionColors2 = useRef([]);

    // Filter out the first item if needed (assuming it's a header)
    const filteredData = syllabus.slice(1);

    // Initialize random colors for each section on component mount
useEffect(() => {
    if (sectionColors2.current.length === 0 && filteredData.length > 0) {
        let prevColor = '';
        sectionColors2.current = filteredData.map(() => {
            let color;
            do {
                color = defaultColors[Math.floor(Math.random() * defaultColors.length)];
            } while (color === prevColor && defaultColors.length > 1);
            prevColor = color;
            return color;
        });
    }
}, [filteredData]);

    // Calculate progress correctly (0-100%)
    const progress = Math.min(100, Math.max(0, ((activeSection + 1) / filteredData.length) * 100));

    const handleNext = () => {
        if (activeSection < filteredData.length - 1) {
            setShouldScroll(true);
            setActiveSection((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (activeSection > 0) {
            setShouldScroll(true);
            setActiveSection((prev) => prev - 1);
        }
    };

    const handleSectionClick = (index) => {
        setShouldScroll(true);
        setActiveSection(index);
    };

    // Get color for section - use pre-assigned random color
    const getSectionColor = (index) => {
        return sectionColors2.current[index] || DEFAULT_COLOR;
    };

    // Scroll to active section when changed and shouldScroll is true
    useEffect(() => {
        if (shouldScroll && activeSectionRef.current) {
            activeSectionRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            setShouldScroll(false);
        }
    }, [activeSection, shouldScroll]);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="mb-12 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-700 text-transparent bg-clip-text"
                    >
                        {syllabus[0]?.name} <span className='text-slate-800 dark:text-white'>Training Syllabus</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                    >
                        A structured curriculum designed to take you from foundational concepts to advanced mastery
                    </motion.p>
                </div>

                {/* Timeline Progress Bar */}
                <div className="relative mb-12">
                    <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.6 }}
                        />
                    </div>
                    <div className="absolute -bottom-8 left-0 right-0 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>Foundations</span>
                        <span>{Math.round(progress)}% Complete</span>
                        <span>Mastery</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-8 justify-center">
                    {/* Current Section Content */}
                    <div className="lg:w-2/3">
                        {filteredData.length > 0 && (
                            <motion.div
                                ref={activeSectionRef}
                                key={activeSection}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                            >
                                <div className={`p-6 flex items-center gap-4 ${getSectionColor(activeSection)} text-white`}>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: 0 }}
                                        className="text-4xl"
                                    >
                                        <img src={filteredData[activeSection]?.icon} alt='icons' className='w-16 h-16' />
                                    </motion.div>
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold">{filteredData[activeSection]?.title}</h2>
                                        <p className="text-sm md:text-base opacity-90">{filteredData[activeSection]?.description}</p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="mb-6 flex justify-between items-center">
                                        <h3 className="font-medium text-lg text-gray-900 dark:text-white">Key Learning Points</h3>
                                        <span className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                            Module {activeSection + 1} of {filteredData.length}
                                        </span>
                                    </div>
                                    <ul className="space-y-4">
                                        {filteredData[activeSection]?.subpoints?.map((item, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex items-start gap-3"
                                            >
                                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${getSectionColor(activeSection)}`}>
                                                    {i + 1}
                                                </span>
                                                <span className="text-base text-gray-700 dark:text-gray-300">{item}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center mt-8">
                            <button
                                onClick={handlePrev}
                                disabled={activeSection === 0}
                                className="px-6 py-3 rounded-lg font-medium transition-all bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Previous
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={activeSection === filteredData.length - 1}
                                className="px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                Next
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Progress Overview - Desktop */}
                    <div className="hidden lg:block lg:w-1/3">
                        <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="font-bold text-xl mb-6 text-gray-900 dark:text-white">Curriculum Progress</h3>

                            <div className="space-y-4">
                                {filteredData.map((section, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all ${index === activeSection
                                                ? 'bg-blue-50 dark:bg-gray-700 font-semibold text-blue-700 dark:text-white'
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                                            }`}
                                        onClick={() => handleSectionClick(index)}
                                    >
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${index <= activeSection ? getSectionColor(index) : 'bg-gray-200 dark:bg-gray-600'
                                                }`}
                                        >
                                            {index <= activeSection ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            ) : (
                                                index + 1
                                            )}
                                        </div>
                                        <span className="text-sm">{section?.title}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between mb-2 text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {Math.round(progress)}%
                                    </span>
                                </div>
                                <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainingSyllabus;