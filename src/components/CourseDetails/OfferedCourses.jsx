// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const OfferedCourses = () => {
//   const [activeCard, setActiveCard] = useState(null);

//   const courses = [
//     {
//       id: 1,
//       title: "Python Full Stack",
//       description:
//         "Master Django, Backend, and frontend integration for complete web solutions",
//       icon: "/icons/python-fullstack.png",
//       color: "from-blue-500 to-indigo-600",
//       darkColor: "from-blue-600 to-indigo-800",
//       link: "/python-full-stack",
//     },
//     {
//       id: 2,
//       title: "Java Full Stack",
//       description:
//         "End-to-end development with Spring Boot and modern JavaScript frameworks",
//       icon: "/icons/java.svg",
//       color: "from-purple-500 to-indigo-700",
//       darkColor: "from-purple-600 to-indigo-900",
//       link: "/java-full-stack",
//     },
//     {
//       id: 3,
//       title: "MERN Stack",
//       description:
//         "Build dynamic apps with MongoDB, Express, React, and Node.js",
//       icon: "/icons/mern-stack.png",
//       color: "from-indigo-500 to-blue-700",
//       darkColor: "from-indigo-600 to-blue-800",
//       link: "/mern-stack",
//     },
//     {
//       id: 4,
//       title: ".NET Full Stack",
//       description:
//         "Develop scalable web applications using ASP.NET Core, C#, SQL Server, and modern framework",
//       icon: "/icons/super-computer.svg",
//       color: "from-purple-600 to-blue-700",
//       darkColor: "from-indigo-600 to-blue-800",
//       link: "/dotnet-full-stack",
//     },
//   ];

//   return (
//     <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-500">
//       <div className="max-w-7xl mx-auto">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800 dark:from-blue-400 dark:to-indigo-300">
//             Courses We Offer
//           </h2>
//           <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
//             Cutting-edge programs designed to launch your tech career with
//             industry-relevant skills
//           </p>
//         </div>

//         {/* Card Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {courses.map((course) => (
//             <div
//               key={course.id}
//               className="relative h-96 perspective-1000"
//               onMouseEnter={() => setActiveCard(course.id)}
//               onMouseLeave={() => setActiveCard(null)}
//             >
//               <div
//                 className={`relative w-full h-full transition-all duration-700 transform-style-3d ${
//                   activeCard === course.id ? "rotate-y-180" : ""
//                 }`}
//               >
//                 {/* Front Face */}
//                 <div
//                   className={`absolute w-full h-full backface-hidden rounded-2xl shadow-2xl overflow-hidden 
//                   bg-gradient-to-br ${course.color} dark:${course.darkColor} transition-colors duration-500`}
//                 >
//                   <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.jpg')] bg-cover"></div>

//                   <div className="p-8 h-full flex flex-col justify-between">
//                     <div>
//                       <div className="bg-white/30 dark:bg-black/30 backdrop-blur-sm rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
//                         <div className="p-2 bg-white rounded-full">
//                           <img
//                             src={course.icon}
//                             alt={course.title}
//                             className="w-16 h-16 object-contain rounded-xl"
//                           />
//                         </div>
//                       </div>

//                       <h3 className="text-2xl font-bold text-white text-center mb-3">
//                         {course.title}
//                       </h3>
//                       <p className="text-white text-opacity-90 dark:text-white/80 text-center">
//                         {course.description}
//                       </p>
//                     </div>

//                     <div className="text-center mt-6">
//                       <span className="inline-block px-4 py-2 bg-white/30 dark:bg-black/30 backdrop-blur-sm rounded-full text-white font-medium animate-pulse">
//                         Hover to Explore
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Back Face */}
//                 <div className="absolute w-full h-full backface-hidden rounded-2xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800 rotate-y-180 transition-colors duration-500">
//                   <div className="p-8 h-full flex flex-col">
//                     <div className="mb-6">
//                       <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
//                     </div>

//                     <div className="flex-grow">
//                       <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
//                         {course.title}
//                       </h3>

//                       <ul className="space-y-2 text-gray-700 dark:text-gray-300">
//                         <li className="flex items-center">
//                           <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
//                           Industry-relevant curriculum
//                         </li>
//                         <li className="flex items-center">
//                           <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
//                           Hands-on projects
//                         </li>
//                         <li className="flex items-center">
//                           <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
//                           Expert mentorship
//                         </li>
//                         <li className="flex items-center">
//                           <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
//                           Career support
//                         </li>
//                       </ul>
//                     </div>

//                     <div className="text-center mt-6">
//                       <Link
//                         to={`${course.link}`}
//                         className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600 rounded-full text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
//                       >
//                         Explore Curriculum
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OfferedCourses;




import React, { useState } from "react";
import { Link } from "react-router-dom";

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
                    <img 
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