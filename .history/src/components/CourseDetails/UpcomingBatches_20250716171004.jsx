import React, { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiBookOpen, FiArrowRight } from 'react-icons/fi';
import FreeDemoForm from '../ContactUs/FreeDemoForm';

const initialDates = ['2025-06-12', '2025-06-19', '2025-06-26', '2025-07-01'];

function UpcomingBatches() {
  const [batchDates, setBatchDates] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const today = new Date();

    const updatedDates = initialDates.map(dateStr => {
      const date = new Date(dateStr);
      const diffDays = Math.floor((today - new Date('2025-06-11')) / (1000 * 60 * 60 * 24));
      date.setDate(date.getDate() + diffDays);
      return date.toISOString().split('T')[0];
    });

    setBatchDates(updatedDates);
  }, []);

  // More relevant education/course related images from Unsplash
  const courseImages = [
    'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80', // Classroom
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80', // Group study
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80', // Online learning
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80'  // Graduation
  ];

  return (
    <div className="bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Batches</span>
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          Join our expertly designed courses with flexible schedules to fit your needs
        </p>
        {/* showing form on click of course fees button */}
        {showForm && (
          <FreeDemoForm onClose={() => setShowForm(false)} title1={"Get Started for Free"}/>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {batchDates.map((date, idx) => (
            <div
              key={idx}
              className="group relative h-full rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-5 dark:opacity-10 group-hover:opacity-20 transition-opacity duration-500 rounded-xl" />

              {/* Card content */}
              <div className="relative h-full bg-white/90 dark:bg-gray-800/95 backdrop-blur-sm p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col">
                {/* Course image with overlay */}
                <div className="relative overflow-hidden rounded-lg mb-4 h-40">
                  <img
                    src={courseImages[idx]}
                    alt={`Course batch ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white font-medium text-sm bg-blue-600 px-2 py-1 rounded">
                    Batch {idx + 1}
                  </span>
                </div>

                {/* Date */}
                <div className="mb-3">
                  <p className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium">
                    {/* <FiCalendar className="text-blue-600 dark:text-blue-400" /> */}
                    <img src="/icons/calendar2.svg" alt="calender" className='w-5 h-5'/>
                    <span>{new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                  </p>
                </div>

                {/* Course details */}
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-5">
                  <p className="flex items-center gap-2">
                    {/* <FiBookOpen className="text-indigo-600 dark:text-indigo-400" /> */}
                    <img src="/icons/book.svg" alt="calender" className='w-5 h-5'/>
                    <span>Mon-Sat Sessions</span>
                  </p>
                  <p className="flex items-center gap-2">
                    {/* <FiClock className="text-blue-600 dark:text-blue-400" /> */}
                    <img src="/icons/job-clock.png" alt="calender" className='w-5 h-5'/>
                    <span>Flexible Timing Available</span>
                  </p>
                  <p>Weekdays Regular</p>
                  <p>Duration: 1hr – 1:30hr</p>
                </div>

                {/* Button */}
                <button className="mt-auto w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-blue-500/20">
                  <span className="relative flex items-center justify-center gap-2" onClick={() => setShowForm(true)}>
                    Course Fees <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UpcomingBatches;