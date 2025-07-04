import React from 'react';

const PlacementsSection = () => {
    return (
        <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-800 dark:text-blue-300">
                        Our Students Placed At
                    </h2>
                    <p className="text-lg text-blue-600 dark:text-blue-200 max-w-2xl mx-auto">
                        Proudly working with leading organizations worldwide
                    </p>
                </div>

                {/* Placement Image Container */}
                <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg p-4 sm:p-5 max-w-4xl mx-auto">
                    <div className="absolute inset-0 border border-blue-200 dark:border-blue-900 rounded-xl pointer-events-none opacity-30"></div>

                    {/* Image with hover effect - now more compact */}
                    <div className="relative overflow-hidden rounded-md">
                        <img
                            src='./placementCompanies.webp'
                            alt="Our students placed at leading companies"
                            className="w-full h-auto object-contain transition-transform duration-500 hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                </div>

                {/* stats below image */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">100+</p>
                        <p className="text-gray-600 dark:text-gray-300">Companies</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">95%</p>
                        <p className="text-gray-600 dark:text-gray-300">Placement Rate</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">₹12L</p>
                        <p className="text-gray-600 dark:text-gray-300">Highest Package</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">₹6.5L</p>
                        <p className="text-gray-600 dark:text-gray-300">Average Package</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlacementsSection;