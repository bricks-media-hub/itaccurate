import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SafeImage } from "../../lib/SafeImage";

const OfferedCourses = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const courses = [
    {
      id: 1,
      title: "Python Full Stack",
      description: "Master Django, Backend, and frontend integration for complete web solutions",
      icon: "/icons/python-fullstack.png",
      color: "bg-gradient-to-br from-blue-500 to-indigo-600",
      darkColor: "bg-gradient-to-br from-blue-600 to-indigo-800",
      link: "/python-full-stack",
      highlights: [
        "Django & Flask frameworks",
        "REST API development",
        "Frontend integration",
        "Database design"
      ]
    },
    {
      id: 2,
      title: "Java Full Stack",
      description: "End-to-end development with Spring Boot and modern JavaScript frameworks",
      icon: "/icons/java.svg",
      color: "bg-gradient-to-br from-purple-500 to-indigo-700",
      darkColor: "bg-gradient-to-br from-purple-600 to-indigo-900",
      link: "/java-full-stack",
      highlights: [
        "Spring Boot ecosystem",
        "Microservices architecture",
        "React/Angular integration",
        "Security best practices"
      ]
    },
    {
      id: 3,
      title: "MERN Stack",
      description: "Build dynamic apps with MongoDB, Express, React, and Node.js",
      icon: "/icons/mern-stack.png",
      color: "bg-gradient-to-br from-indigo-500 to-blue-700",
      darkColor: "bg-gradient-to-br from-indigo-600 to-blue-800",
      link: "/mern-stack",
      highlights: [
        "Full JavaScript stack",
        "Real-time applications",
        "State management",
        "Cloud deployment"
      ]
    },
    {
      id: 4,
      title: ".NET Full Stack",
      description: "Develop scalable web applications using ASP.NET Core, C#, SQL Server, and modern frameworks",
      icon: "/icons/super-computer.svg",
      color: "bg-gradient-to-br from-purple-600 to-blue-700",
      darkColor: "bg-gradient-to-br from-indigo-600 to-blue-800",
      link: "/dotnet-full-stack",
      highlights: [
        "ASP.NET Core MVC",
        "Entity Framework",
        "Azure deployment",
        "Blazor/React integration"
      ]
    },
  ];

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
            Our Programs
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Transform Your Career With Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Tech Courses</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Industry-aligned programs designed to equip you with in-demand skills for today's tech landscape
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="relative group"
              onMouseEnter={() => setHoveredCard(course.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`absolute inset-0 ${course.color} dark:${course.darkColor} rounded-2xl shadow-xl transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2`}></div>
              
              <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-md transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2">
                <div className="p-6 h-full flex flex-col">
                  {/* Icon */}
                  <div className={`mb-6 w-16 h-16 rounded-lg ${hoveredCard === course.id ? course.color : 'bg-gray-100 dark:bg-gray-700'} flex items-center justify-center transition-colors duration-300`}>
                    <SafeImage 
                      src={course.icon} 
                      alt={course.title} 
                      className="w-10 h-10 object-contain" 
                    />
                  </div>
                  
                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{course.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-5">{course.description}</p>
                  
                  {/* Highlights */}
                  <div className="mt-auto">
                    <ul className="space-y-2 mb-6">
                      {course.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-4 h-4 text-blue-500 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* CTA Button */}
                    <Link
                      to={course.link}
                      className={`inline-block w-full text-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-300 ${
                        hoveredCard === course.id 
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600 text-white shadow-md'
                          : 'bg-gray-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      Explore Course
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        {/* <div className="text-center mt-16">
          <Link 
            to="/courses" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-colors duration-300"
          >
            View All Programs
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default OfferedCourses;