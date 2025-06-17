import React, { useState, useEffect } from "react";

const SalaryHikeSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      text: "Over 50% of participants experienced a salary increase of 50% or more after completing the program*",
      logo: "./logo.webp", 
      subText: "Committed to enhancing global work environments",
      title: "Process Advisors",
      highlightColor: "from-purple-400 to-blue-500"
    },
    {
      id: 2,
      text: "More than 80% of graduates found employment within three months of completing the program.",
      logo: "./logo.webp",
      subText: "Consulting excellence at a global scale",
      title: "Career Advisors",
      highlightColor: "from-blue-400 to-purple-500"
    },
    {
      id: 3,
      text: "A high 90% of alumni recommend this program to others for career advancement.",
      logo: "./logo.webp", 
      subText: "Trusted by industry leaders worldwide",
      title: "Success Advisors",
      highlightColor: "from-pink-400 to-purple-500"
    },
  ];
 
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
<div className="relative overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 transition-all duration-300 mx-4 sm:mx-6 min-h-[400px] md:min-h-[220px] mt-2">
  {/* Background gradient accent */}
  <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentIndex].highlightColor} opacity-10 dark:opacity-15 -z-0 transition-all duration-1000`}></div>
  
  <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 relative z-10 h-full">
    {/* Left Section - Stacked on mobile, row on desktop */}
    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full md:w-auto">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-xl opacity-20 blur-md"></div>
        <img
          src={slides[currentIndex].logo}
          alt="Logo"
          className="w-12 h-12 sm:w-16 sm:h-16 object-contain relative"
        />
      </div>
      <div className="text-center sm:text-left">
        <p className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-300">
          {slides[currentIndex].title}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-400">
          {slides[currentIndex].subText}
        </p>
      </div>
    </div>

    {/* Middle Section - Full width on mobile, auto on desktop */}
    <div className="flex-1 w-full md:w-auto text-center md:text-left px-0 sm:px-4 flex flex-col justify-center">
      <p className="text-base sm:text-lg md:text-xl font-bold text-gray-800 dark:text-white leading-relaxed">
        {slides[currentIndex].text}
        <span className="text-xs text-gray-500 dark:text-gray-400">*</span>
      </p>
      
      {/* Indicators - Mobile only */}
      <div className="flex justify-center gap-2 mt-3 sm:mt-4 md:hidden">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-blue-600 dark:bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Apply Now Button */}
      <div className="mt-3 sm:mt-4 md:mt-6 flex justify-center md:justify-start">
        <a href="/contact" className="group relative inline-block">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-700 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
          <button className="relative px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm sm:text-base font-semibold rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Apply Now
            <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </a>
      </div>
    </div>

    {/* Right Section - Navigation - Bottom on mobile, side on desktop */}
    <div className="flex items-center justify-between md:justify-center gap-3 sm:gap-4 w-full md:w-auto mt-4 md:mt-0">
      <button
        onClick={handlePrevious}
        className="p-1 sm:p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:shadow-lg text-blue-600 dark:text-purple-400 hover:text-blue-800 dark:hover:text-purple-300 transition-all duration-200 hover:scale-110"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      {/* Indicators - Desktop only */}
      <div className="hidden md:flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${currentIndex === index ? 'bg-blue-600 dark:bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <button
        onClick={handleNext}
        className="p-1 sm:p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:shadow-lg text-blue-600 dark:text-purple-400 hover:text-blue-800 dark:hover:text-purple-300 transition-all duration-200 hover:scale-110"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</div>
  );
};

export default SalaryHikeSection;