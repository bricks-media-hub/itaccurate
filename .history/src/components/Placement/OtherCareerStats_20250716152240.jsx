import { motion } from 'framer-motion'
import React from 'react'

const OtherCareer = [
    {
        category: "CTC Greater than 5 LPA",
        count: "4145+",
        icon: "/icons/money-pouch.svg",
        bg: "bg-green-100 dark:bg-green-900/30"
    },
    {
        category: "Academic Percentage less than 60%",
        count: "5515+",
        icon: "/icons/books-bunch.svg",
        bg: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
        category: "Non-IT to IT Transition",
        count: "2178+",
        icon: "/icons/recurring.svg",
        bg: "bg-purple-100 dark:bg-purple-900/30"
    },
    {
        category: "Diploma Candidates",
        count: "3124+",
        icon: "/icons/graduation.svg",
        bg: "bg-yellow-100 dark:bg-yellow-900/30"
    },
    {
        category: "Career Break/Gap Students",
        count: "2908+",
        icon: "/icons/sand-time.svg",
        bg: "bg-red-100 dark:bg-red-900/30"
    },
    {
        category: "Non-Engineering Students",
        count: "4090+",
        icon: "/icons/color.svg",
        bg: "bg-indigo-100 dark:bg-indigo-900/30"
    },
    {
        category: "Engineering Students",
        count: "3401+",
        icon: "/icons/settings.svg",
        bg: "bg-cyan-100 dark:bg-cyan-900/30"
    }
]

function OtherCareerStats() {
    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 dark:text-white mb-4">
                        Other Career Opportunities Enabled by IT ACCURATE
                    </h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                        IT ACCURATE has empowered thousands to break barriers and achieve their career dreams
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Stats Cards */}
                    <div className="space-y-6">
                        {OtherCareer.slice(0, 4).map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className={`p-6 rounded-xl shadow-md ${item.bg} border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-2xl">
                                            {item.icon}
                                        </span>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.category}</h3>
                                    </div>
                                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{item.count}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Column - Stats Cards */}
                    <div className="space-y-6">
                        {OtherCareer.slice(4).map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className={`p-6 rounded-xl shadow-md ${item.bg} border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all ${index === 3 ? 'text-white' : ''}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-2xl">
                                            <img src={item.icon} alt='icons' className='w-12 w-12' />
                                            </span>
                                        <h3 className={`text-lg font-semibold ${index === 3 ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                                            {item.category}
                                        </h3>
                                    </div>
                                    <span className={`text-2xl font-bold ${index === 3 ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'}`}>
                                        {item.count}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OtherCareerStats