import React, { useState } from "react";
import { Link } from "react-router-dom";

const OfferedCourses = () => {
  const [activeCard, setActiveCard] = useState(null);

  const courses = [
    {
      id: 1,
      title: "Python Full Stack",
      description:
        "Master Django, Flask, and frontend integration for complete web solutions",
      icon: "/icons/python-fullstack.png",
      color: "from-blue-500 to-indigo-600",
      darkColor: "from-blue-600 to-indigo-800",
      link: "/python-full-stack"
    },
    {
      id: 2,
      title: "Java Full Stack",
      description:
        "End-to-end development with Spring Boot and modern JavaScript frameworks",
      icon: "/icons/java.svg",
      color: "from-purple-500 to-indigo-700",
      darkColor: "from-purple-600 to-indigo-900",
      link: "/java-full-stack"
    },
    {
      id: 3,
      title: "MERN Stack",
      description:
        "Build dynamic apps with MongoDB, Express, React, and Node.js",
      icon: "/icons/mern-stack.png",
      color: "from-indigo-500 to-blue-700",
      darkColor: "from-indigo-600 to-blue-800",
      link: "/mern-stack"
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800 dark:from-blue-400 dark:to-indigo-300">
            Courses We Offer
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Cutting-edge programs designed to launch your tech career with
            industry-relevant skills
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course) => (
            <div
              key={course.id}
              className="relative h-96 perspective-1000"
              onMouseEnter={() => setActiveCard(course.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div
                className={`relative w-full h-full transition-all duration-700 transform-style-3d ${
                  activeCard === course.id ? "rotate-y-180" : ""
                }`}
              >
                {/* Front Face */}
                <div
                  className={`absolute w-full h-full backface-hidden rounded-2xl shadow-2xl overflow-hidden 
                  bg-gradient-to-br ${course.color} dark:${course.darkColor} transition-colors duration-500`}
                >
                  <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.jpg')] bg-cover"></div>

                  <div className="p-8 h-full flex flex-col justify-between">
                    <div>
                      <div className="bg-white/30 dark:bg-black/30 backdrop-blur-sm rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                        <div className="p-2 bg-white rounded-full">
                          <img
                            src={course.icon}
                            alt={course.title}
                            className="w-16 h-16 object-contain rounded-xl"
                          />
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-white text-center mb-3">
                        {course.title}
                      </h3>
                      <p className="text-white text-opacity-90 dark:text-white/80 text-center">
                        {course.description}
                      </p>
                    </div>

                    <div className="text-center mt-6">
                      <span className="inline-block px-4 py-2 bg-white/30 dark:bg-black/30 backdrop-blur-sm rounded-full text-white font-medium animate-pulse">
                        Hover to Explore
                      </span>
                    </div>
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute w-full h-full backface-hidden rounded-2xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800 rotate-y-180 transition-colors duration-500">
                  <div className="p-8 h-full flex flex-col">
                    <div className="mb-6">
                      <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
                        {course.title}
                      </h3>

                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          Industry-relevant curriculum
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          Hands-on projects
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          Expert mentorship
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          Career support
                        </li>
                      </ul>
                    </div>

                    <div className="text-center mt-6">
                      <Link
                        to={`${course.link}`}
                        className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600 rounded-full text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                      >
                        Explore Curriculum
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferedCourses;
