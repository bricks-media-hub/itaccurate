import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";
import FreeDemoForm from "../ContactUs/FreeDemoForm";
import { SafeImage } from "../../lib/SafeImage";

const PlacedStudents = ({ className }) => {
  const [showDemoForm, setShowDemoForm] = useState(false);

  const buttons = [
    {
      label: "Book Your Free Demo, Now!",
      onClick: () => setShowDemoForm(true)
    },
    {
      label: "Get Our Placement Stats",
      href: "/placed"
    }
  ];
  const placedStudents = useSelector((state) => state.students.placedStudents);
  const loading = useSelector((state) => state.students.status);
  const error = useSelector((state) => state.students.error);

  const placedStudents1 = placedStudents[0]?.placedStudents1 || [];
  const placedStudents2 = placedStudents[1]?.placedStudents2 || [];

  if (loading === 'loading') {
    return <div className="text-center py-10 text-gray-400">Loading companies...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="px-4 py-16 text-center mt-16 bg-gray-100 dark:bg-gray-800" >
      <h2 className={`${className} || text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-white`}>
        Students Who <span className="text-blue-600 dark:text-blue-400">Cracked</span> Their Dream Jobs
        <br />
        <span className="text-lg text-gray-600 dark:text-gray-300">at Top MNC Companies</span>
      </h2>

      {/* First Marquee */}
      <div className="my-8 overflow-hidden h-64" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        <Marquee className="my-4 h-60 scrollbar-hide" speed={30} gradient={false}>
          {placedStudents1.map((student, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 shadow-md p-4 mx-4 w-56 h-56 flex flex-col items-center text-center rounded-xl 
                     transform transition duration-300 hover:scale-105 hover:shadow-lg border border-gray-200 dark:border-gray-600"
            >
              <a
                href={student.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 w-5 h-5 opacity-70 hover:opacity-100 transition"
              >
                <SafeImage
                  src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
                  alt="LinkedIn"
                  className="w-full h-full"
                />
              </a>
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 dark:border-blue-400 shadow-inner">
                <SafeImage src={student.image} alt={student.name} className="w-full h-full object-cover" />
              </div>
              <p className="mt-3 text-md font-bold text-gray-800 dark:text-white">{student.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-300">{student.role}</p>
              <SafeImage
                src={student.logo}
                alt={student.company}
                className="w-20 mt-2 object-contain transition-transform hover:scale-110"
              />
            </div>
          ))}
        </Marquee>
      </div>

      {/* Second Marquee */}
      <div className="my-8 overflow-hidden h-64" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        <Marquee className="my-4 h-60 scrollbar-hide" speed={70} direction="right" gradient={false}>
          {placedStudents2.map((student, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 shadow-md p-4 mx-4 w-56 h-56 flex flex-col items-center text-center rounded-xl 
                     transform transition duration-300 hover:scale-105 hover:shadow-lg border border-gray-200 dark:border-gray-600"
            >
              <a
                href={student.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 w-5 h-5 opacity-70 hover:opacity-100 transition"
              >
                <SafeImage
                  src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
                  alt="LinkedIn"
                  className="w-full h-full"
                />
              </a>
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 dark:border-blue-400 shadow-inner">
                <SafeImage src={student.image} alt={student.name} className="w-full h-full object-cover" />
              </div>
              <p className="mt-3 text-md font-bold text-gray-800 dark:text-white">{student.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-300">{student.role}</p>
              <SafeImage
                src={student.logo}
                alt={student.company}
                className="w-20 mt-2 object-contain transition-transform hover:scale-110"
              />
            </div>
          ))}
        </Marquee>
      </div>

      {/* Call to Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-10">
        {buttons.map((btn, i) => (
          btn.href ? (
            <a key={i} href={btn.href} className="group relative block w-fit">
              <button className="relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                {btn.label}
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </a>
          ) : (
            <div key={i} className="group relative block w-fit">
              <button
                onClick={btn.onClick}
                className="relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                {btn.label}
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )
        ))}
      </div>

      {/* Conditionally render component */}
      {showDemoForm && (
        <div className="mt-8">
          <FreeDemoForm onClose={() => setShowDemoForm(false)} title1={"Experience Before You Enroll"} title2={"Speak to a Counselor"}/>
        </div>
      )}
    </div>


  );
};

export default PlacedStudents;
