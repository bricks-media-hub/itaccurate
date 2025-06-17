import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TrainingSyllabus = ({ syllabus }) => {
    const [activeSection, setActiveSection] = useState(0);
    const [isHovering, setIsHovering] = useState(null);
    
    // Filter out the first item if needed (assuming it's a header)
    const filteredData = syllabus.slice(1);
    
    // Calculate progress correctly (0-100%)
    const progress = Math.min(100, Math.max(0, ((activeSection + 1) / filteredData.length) * 100));

    const handleNext = () => {
        if (activeSection < filteredData.length - 1) {
            setActiveSection((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (activeSection > 0) {
            setActiveSection((prev) => prev - 1);
        }
    };

const colorMap = {
  // Blues
  blue: 'bg-blue-500',
  'blue-400': 'bg-blue-400',
  'blue-600': 'bg-blue-600',
  sky: 'bg-sky-500',
  cyan: 'bg-cyan-500',
  
  // Purples/Violets
  purple: 'bg-purple-500',
  violet: 'bg-violet-500',
  indigo: 'bg-indigo-500',
  'indigo-600': 'bg-indigo-600',
  
  // Pinks/Reds
  pink: 'bg-pink-500',
  fuchsia: 'bg-fuchsia-500',
  rose: 'bg-rose-500',
  red: 'bg-red-500',
  
  // Greens
  green: 'bg-green-500',
  emerald: 'bg-emerald-500',
  teal: 'bg-teal-500',
  lime: 'bg-lime-500',
  
  // Yellows/Oranges
  yellow: 'bg-yellow-500',
  amber: 'bg-amber-500',
  orange: 'bg-orange-500',
  
  // Grayscale
  gray: 'bg-gray-500',
  slate: 'bg-slate-500',
  zinc: 'bg-zinc-500',
  neutral: 'bg-neutral-500',
  stone: 'bg-stone-500',
  
  // Special cases
  'gradient-blue': 'bg-gradient-to-r from-blue-500 to-indigo-600',
  'gradient-purple': 'bg-gradient-to-r from-purple-500 to-pink-500',
  'gradient-teal': 'bg-gradient-to-r from-teal-500 to-emerald-500'
};

const getSectionColor = (section) => {
  if (!section?.color) return 'bg-blue-500';
  
  // Handle gradient cases
  if (section.color.startsWith('gradient-')) {
    return colorMap[section.color] || 'bg-gradient-to-r from-blue-500 to-indigo-600';
  }
  
  // If already a full class name (contains 'bg-')
  if (section.color.includes('bg-')) {
    // Validate it's a proper Tailwind color class
    const isValid = Object.values(colorMap).includes(section.color) || 
                   /^bg-(?:[a-z]+)-(?:50|[1-9]00)$/.test(section.color);
    return isValid ? section.color : 'bg-blue-500';
  }
  
  // Otherwise map from color name to full class
  return colorMap[section.color] || 'bg-blue-500';
};

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
                    <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        A structured curriculum designed to take you from foundational concepts to advanced mastery
                    </p>
                </div>

                {/* Timeline Progress Bar */}
                <div className="relative mb-12">
                    <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700">
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
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Timeline Navigation - Desktop */}
                    <div className="hidden lg:block w-1/4">
                        <div className="relative flex flex-col space-y-11 pl-6">
                            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                            {filteredData.map((section, index) => {
                                const sectionColor = getSectionColor(section);
                                return (
                                    <div
                                        key={index}
                                        className="relative"
                                        onMouseEnter={() => setIsHovering(index)}
                                        onMouseLeave={() => setIsHovering(null)}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center text-white cursor-pointer transition-all duration-300 ${sectionColor} ${index === activeSection ? 'ring-2 ring-offset-2 ring-current ring-offset-white dark:ring-offset-gray-900' : ''}`}
                                            onClick={() => setActiveSection(index)}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            {section.icon}
                                        </motion.div>
                                        <AnimatePresence>
                                            {(isHovering === index || index === activeSection) && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="ml-11 p-3 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 absolute z-10 w-64"
                                                >
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">{section.title}</h3>
                                                    <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">{section.description}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Current Section Content */}
                    <div className="lg:w-2/4">
                        {filteredData.length > 0 && (
                            <motion.div
                                key={activeSection}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                            >
                                <div className={`p-6 flex items-center gap-4 ${getSectionColor(filteredData[activeSection])} text-white`}>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: 0 }}
                                        className="text-3xl"
                                    >
                                        {filteredData[activeSection].icon}
                                    </motion.div>
                                    <div>
                                        <h2 className="text-2xl font-bold">{filteredData[activeSection].title}</h2>
                                        <p className="text-sm opacity-90">{filteredData[activeSection].description}</p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="mb-6 flex justify-between items-center">
                                        <h3 className="font-medium text-gray-900 dark:text-white">Key Learning Points</h3>
                                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                            Module {activeSection + 1} of {filteredData.length}
                                        </span>
                                    </div>
                                    <ul className="space-y-4">
                                        {filteredData[activeSection].subpoints?.map((item, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex items-start gap-3"
                                            >
                                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${getSectionColor(filteredData[activeSection])}`}>
                                                    {i + 1}
                                                </span>
                                                <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
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
                                className="px-6 py-3 rounded-lg font-medium transition-all bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ← Previous
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={activeSection === filteredData.length - 1}
                                className="px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next Module →
                            </button>
                        </div>
                    </div>

                    {/* Progress Overview - Desktop */}
                    <div className="hidden lg:block w-1/4">
                        <div className="sticky top-4 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Curriculum Progress</h3>
                            <div className="space-y-4">
                                {filteredData.map((section, index) => {
                                    const sectionColor = getSectionColor(section);
                                    return (
                                        <div
                                            key={index}
                                            className={`flex items-center gap-3 cursor-pointer ${index === activeSection ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
                                            onClick={() => setActiveSection(index)}
                                        >
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white ${index <= activeSection ? sectionColor : 'bg-gray-200 dark:bg-gray-700'}`}>
                                                {index <= activeSection ? '✓' : index + 1}
                                            </div>
                                            <span className="text-sm">
                                                {section.title}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between mb-2 text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{Math.round(progress)}%</span>
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

                {/* Mobile Navigation */}
                <div className="lg:hidden mt-12">
                    <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide">
                        {filteredData.map((section, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveSection(index)}
                                className={`flex-shrink-0 px-4 py-2 rounded-lg flex items-center gap-2 text-sm ${index === activeSection ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                            >
                                <span>{section.icon}</span>
                                <span>{section.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainingSyllabus;