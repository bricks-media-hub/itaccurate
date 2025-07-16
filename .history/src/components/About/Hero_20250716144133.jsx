// import { useState, useEffect } from 'react';

// const Counter = ({ endValue }) => {
//     const [count, setCount] = useState(0);

//     useEffect(() => {
//         let start = 0;
//         const duration = 2000;
//         const incrementTime = 30;
//         const increment = endValue / (duration / incrementTime);

//         const timer = setInterval(() => {
//             start += increment;
//             if (start >= endValue) {
//                 setCount(endValue);
//                 clearInterval(timer);
//             } else {
//                 setCount(Math.ceil(start));
//             }
//         }, incrementTime);

//         return () => clearInterval(timer);
//     }, [endValue]);

//     return <span>{count}</span>;
// };

// const AboutUs = () => {
//     const stats = [
//         { label: 'Qualified Trainers', value: 92, icon: '👨‍🏫', color: 'from-blue-500 to-blue-300' },
//         { label: 'Live Classes Per Month', value: 250, icon: '📅', color: 'from-purple-500 to-purple-300' },
//         { label: 'Global Accreditations', value: 120, icon: '🌎', color: 'from-green-500 to-green-300' },
//         { label: 'Courses', value: 10, icon: '📚', color: 'from-yellow-500 to-yellow-300' },
//     ];

//     const courses1 = ['SAP', 'Salesforce Training', 'Data Analytics Training', 'Data Science Training', 'Business Analytics Training'];
//     const courses2 = ['AI Artificial Intelligence Training', 'AWS Training', 'DevOps Training', 'Full Stack Developer Training', 'Python Training'];

//     return (
//         <section className="overflow-hidden bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-white transition-colors duration-500">
//             {/* Hero Section */}
//             <section className="relative bg-gradient-to-br from-blue-300 to-indigo-400 text-white py-32">
//                 <div className="absolute inset-0">
//                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
//                     <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-indigo-400 dark:from-blue-400 dark:to-indigo-700 opacity-40 dark:opacity-60 backdrop-blur-sm z-0" />
//                 </div>
//                 <div className="relative z-10 container mx-auto px-6 text-center">
//                     <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-indigo-900 animate-fade-in-down">
//                         About IT Accurate
//                     </h1>
//                     <p className="text-xl md:text-2xl text-blue-50 animate-fade-in-up">
//                         Award-winning IT training institute in Nagpur, shaping careers since 2012
//                     </p>
//                     <div className="mt-12 animate-bounce-slow">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//                         </svg>
//                     </div>
//                 </div>
//             </section>

//             {/* Who We Are */}
//             <div className="container mx-auto px-6 py-16 max-w-7xl">
//                 <section className="mb-20">
//                     <div className='flex justify-center items-center flex-col'>
//                         <h2 className="text-3xl md:text-4xl font-bold mb-8 relative inline-block after:block after:w-20 after:h-1 after:bg-blue-400 after:absolute after:-bottom-2 after:left-0">
//                             Who We Are?
//                         </h2>
//                         <p className="mb-6 text-lg leading-relaxed bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
//                             IT Accurate is a leading IT training institute founded in 2012 with a mission to bridge academia and industry.
//                         </p>
//                     </div>

//                     {/* Courses */}
//                     <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto">
//                         {[courses1, courses2].map((group, i) => (
//                             <ul
//                                 key={i}
//                                 className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-slate-700"
//                             >
//                                 {group.map((course) => (
//                                     <li
//                                         key={course}
//                                         className="flex items-center py-3 border-b border-gray-100 dark:border-slate-700 last:border-b-0 group"
//                                     >
//                                         <span className="text-blue-500 mr-4 text-lg transform group-hover:scale-110 transition-transform duration-200">
//                                             ▹
//                                         </span>
//                                         <span className="text-gray-800 dark:text-gray-200 text-lg font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
//                                             {course}
//                                         </span>
//                                     </li>
//                                 ))}
//                             </ul>
//                         ))}
//                     </div>
//                 </section>

//                 {/* paragraph section */}
// <div className="space-y-8 my-12">
//   {/* Paragraph 1 */}
//   <div
//     className="relative bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 group overflow-hidden"
//     style={{ transformStyle: 'preserve-3d' }}
//   >
//     <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-yellow-50 dark:from-blue-900/20 dark:to-yellow-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//     <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-4 h-full justify-center items-center">
//       <div className="bg-yellow-400 p-2 rounded-lg sm:mr-4 transform group-hover:rotate-12 transition-transform self-start sm:self-auto">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       </div>
//       <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
//         Our practical, job-oriented training program will not only provide you with internationally accepted certificates but also with knowledge equivalent to a minimum of 1+ years of field experience. We value your time as much as ours. Hence, we provide an industry-based syllabus with industrial-experienced trainers, plus technical mock interviews, resume preparation, and 100% guaranteed job assistance. All global certifications are available under one roof in Nagpur.
//       </p>
//     </div>
//     <div className="absolute bottom-4 right-4 text-yellow-400 opacity-30 text-6xl font-bold transform group-hover:scale-110 transition-transform">01</div>
//   </div>

//   {/* Paragraph 2 */}
//   <div
//     className="relative bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 group overflow-hidden"
//     style={{ transformStyle: 'preserve-3d' }}
//   >
//     <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//     <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-4 h-full justify-center items-center">
//       <div className="bg-blue-400 p-2 rounded-lg sm:mr-4 transform group-hover:-rotate-12 transition-transform self-start sm:self-auto">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//         </svg>
//       </div>
//       <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
//         Additionally, IT Accurate assists you in honing your soft skills, including communication skills, public speaking, email etiquette, personal interviews, and HR grooming sessions. You'll ace the interviews both during and after the training using these abilities.
//       </p>
//     </div>
//     <div className="absolute bottom-4 right-4 text-blue-400 opacity-30 text-6xl font-bold transform group-hover:scale-110 transition-transform">02</div>
//   </div>

//   {/* Paragraph 3 */}
//   <div
//     className="relative bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 group overflow-hidden"
//     style={{ transformStyle: 'preserve-3d' }}
//   >
//     <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//     <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-4 h-full justify-center items-center">
//       <div className="bg-green-500 p-2 rounded-lg sm:mr-4 transform group-hover:rotate-12 transition-transform self-start sm:self-auto">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//         </svg>
//       </div>
//       <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
//         We proudly consider ourselves the highest placement-providing institute in Nagpur, as per our last 10 years' records, with 400+ placement tie-ups with IT, service, and manufacturing companies across PAN India.
//       </p>
//     </div>
//     <div className="absolute bottom-4 right-4 text-green-400 opacity-30 text-6xl font-bold transform group-hover:scale-110 transition-transform">03</div>
//   </div>

//   {/* Paragraph 4 */}
//   <div
//     className="relative bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 group overflow-hidden"
//     style={{ transformStyle: 'preserve-3d' }}
//   >
//     <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//     <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-4 h-full justify-center items-center">
//       <div className="bg-orange-400 p-2 rounded-lg sm:mr-4 transform group-hover:-rotate-12 transition-transform self-start sm:self-auto">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//         </svg>
//       </div>
//       <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
//         We focus on delivering innovative, efficient, and future-proof training to the youth of India, helping them build successful careers. We envision a success story for all our students.
//       </p>
//     </div>
//     <div className="absolute bottom-4 right-4 text-orange-400 opacity-30 text-6xl font-bold transform group-hover:scale-110 transition-transform">04</div>
//   </div>
// </div>


//                 {/* Stats Section */}
//                 <section className="mb-20">
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                         {stats.map(({ label, value, icon, color }, i) => (
//                             <div
//                                 key={i}
//                                 className={`bg-gradient-to-br ${color} text-white p-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-all duration-500`}
//                             >
//                                 <div className="text-4xl mb-4">{icon}</div>
//                                 <div className="text-5xl font-bold mb-2">
//                                     <Counter endValue={value} />+
//                                 </div>
//                                 <div className="text-lg font-medium opacity-90">{label}</div>
//                             </div>
//                         ))}
//                     </div>
//                 </section>

//                 {/* Quote */}
//                 <section className="mb-7 relative bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl dark:shadow-slate-600">
//                     <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-indigo-400 dark:from-blue-500 dark:to-indigo-600 opacity-40 dark:opacity-60 backdrop-blur-sm z-0 rounded-3xl" />

//                     <blockquote className="relative z-10 text-2xl md:text-3xl italic leading-relaxed">
//                         <span className="absolute top-0 left-0 text-6xl text-blue-400 opacity-20">“</span>
//                         We focus on delivering innovative, efficient, and future-proof training to the youth of India, helping them build successful careers.
//                     </blockquote>
//                     <cite className="block mt-6 text-right font-semibold text-gray-700 dark:text-gray-300">– IT Accurate Team</cite>
//                 </section>
//             </div>
//         </section>
//     );
// };

// export default AboutUs;



import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiCheck, FiCalendar, FiGlobe, FiBook, FiAward, FiTrendingUp, FiUsers } from 'react-icons/fi';

const Counter = ({ endValue, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const incrementTime = 30;
        const increment = endValue / (duration / incrementTime);

        const timer = setInterval(() => {
            start += increment;
            if (start >= endValue) {
                setCount(endValue);
                clearInterval(timer);
            } else {
                setCount(Math.ceil(start));
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [endValue, duration]);

    return <span>{count}</span>;
};

const Hero = () => {
    const stats = [
        { label: 'Qualified Trainers', value: 92, icon: <FiUsers className="w-8 h-8" />, color: 'from-blue-500 to-blue-400' },
        { label: 'Live Classes/Month', value: 250, icon: <FiCalendar className="w-8 h-8" />, color: 'from-purple-500 to-purple-400' },
        { label: 'Global Accreditations', value: 120, icon: <FiGlobe className="w-8 h-8" />, color: 'from-emerald-500 to-emerald-400' },
        { label: 'Courses Offered', value: 10, icon: <FiBook className="w-8 h-8" />, color: 'from-amber-500 to-amber-400' },
    ];

    const courses1 = ['SAP', 'Salesforce Training', 'Data Analytics', 'Data Science', 'Business Analytics'];
    const courses2 = ['AI & ML Training', 'AWS Training', 'DevOps Training', 'Full Stack Development', 'Python Training'];

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const staggerContainer = {
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 text-gray-800 dark:text-white transition-colors duration-500">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-500 to-indigo-600 text-white py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/80 to-indigo-600/80 backdrop-blur-sm" />
                    
                    {/* Floating elements */}
                    <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-white/10 animate-float1"></div>
                    <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-white/10 animate-float2"></div>
                    <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-white/10 animate-float3"></div>
                </div>
                
                <div className="relative z-10 container mx-auto px-6 text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-6xl font-bold mb-6"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">About IT Accurate</span>
                    </motion.h1>
                    
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto"
                    >
                        Award-winning IT training institute in Nagpur, shaping careers since 2012
                    </motion.p>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-16 animate-bounce-slow"
                    >
                        <FiArrowDown className="w-10 h-10 mx-auto text-white/80" />
                    </motion.div>
                </div>
            </section>

            {/* Who We Are */}
            <div className="container mx-auto px-6 py-16 max-w-7xl">
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="mb-24"
                >
                    <div className='flex justify-center items-center flex-col mb-16'>
                        <motion.h2 
                            variants={fadeInUp}
                            className="text-3xl md:text-4xl font-bold mb-4 relative inline-block"
                        >
                            <span className="relative">
                                Who We Are?
                                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></span>
                            </span>
                        </motion.h2>
                        
                        <motion.p 
                            variants={fadeInUp}
                            className="mb-6 text-lg leading-relaxed bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg max-w-4xl text-center"
                        >
                            IT Accurate is a leading IT training institute founded in 2012 with a mission to bridge academia and industry through cutting-edge technology education.
                        </motion.p>
                    </div>

                    {/* Courses */}
                    <motion.div 
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto"
                    >
                        {[courses1, courses2].map((group, i) => (
                            <motion.ul
                                key={i}
                                variants={fadeInUp}
                                className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-700 relative overflow-hidden"
                            >
                                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-blue-100/20 dark:bg-blue-900/20"></div>
                                <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-indigo-100/20 dark:bg-indigo-900/20"></div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-6 text-blue-600 dark:text-blue-400 flex items-center">
                                        <FiTrendingUp className="mr-2" />
                                        Popular Courses {i+1}
                                    </h3>
                                    {group.map((course) => (
                                        <li
                                            key={course}
                                            className="flex items-center py-4 border-b border-gray-100 dark:border-slate-700 last:border-b-0 group"
                                        >
                                            <span className="text-blue-500 mr-4 text-xl transform group-hover:scale-125 transition-transform duration-200">
                                                <FiCheck />
                                            </span>
                                            <span className="text-gray-800 dark:text-gray-200 text-lg font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                                {course}
                                            </span>
                                        </li>
                                    ))}
                                </div>
                            </motion.ul>
                        ))}
                    </motion.div>
                </motion.section>

                {/* Key Features */}
<motion.section 
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={staggerContainer}
  className="space-y-8 my-16"
>
  {[
    {
      icon:"/icons/badge2.svg",
      bg: "bg-gradient-to-r from-blue-50 to-yellow-50 dark:from-blue-900/20 dark:to-yellow-900/10",
      iconBg: "bg-yellow-400",
      number: "01",
      numberColor: "text-yellow-400",
      content: "Our practical, job-oriented training program will not only provide you with internationally accepted certificates but also with knowledge equivalent to a minimum of 1+ years of field experience. We value your time as much as ours. Hence, we provide an industry-based syllabus with industrial-experienced trainers, plus technical mock interviews, resume preparation, and 100% guaranteed job assistance. All global certifications are available under one roof in Nagpur."
    },
    {
      icon:"/icons/users.svg" alt="users" className="w-6 h-6 sm:w-8 sm:h-8" />,
      bg: "bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/10",
      iconBg: "bg-blue-400",
      number: "02",
      numberColor: "text-blue-400",
      content: "Additionally, IT Accurate assists you in honing your soft skills, including communication skills, public speaking, email etiquette, personal interviews, and HR grooming sessions. You'll ace the interviews both during and after the training using these abilities."
    },
    {
      icon: <img src="/icons/sap.svg" alt="growth" className="w-6 h-6 sm:w-8 sm:h-8" />,
      bg: "bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/10",
      iconBg: "bg-green-500",
      number: "03",
      numberColor: "text-green-400",
      content: "We proudly consider ourselves the highest placement-providing institute in Nagpur, as per our last 10 years' records, with 400+ placement tie-ups with IT, service, and manufacturing companies across PAN India."
    },
    {
      icon: <img src="/icons/internet-globe.svg" alt="globe" className="w-6 h-6 sm:w-8 sm:h-8" />,
      bg: "bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/10",
      iconBg: "bg-orange-400",
      number: "04",
      numberColor: "text-orange-400",
      content: "We focus on delivering innovative, efficient, and future-proof training to the youth of India, helping them build successful careers. We envision a success story for all our students."
    }
  ].map((item, index) => (
    <motion.div
      key={index}
      variants={fadeInUp}
      className={`relative p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 group overflow-hidden ${item.bg}`}
      whileHover={{ y: -5 }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-6">
<div className={`${item.iconBg} w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:mr-4 flex items-center justify-center transform group-hover:rotate-12 transition-transform`}>
  <img src={item.icon} alt="icon" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
</div>

        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
          {item.content}
        </p>
      </div>
      <div className={`absolute bottom-6 right-6 opacity-20 text-8xl font-bold transform group-hover:scale-110 transition-transform ${item.numberColor}`}>
        {item.number}
      </div>
    </motion.div>
  ))}
</motion.section>


                {/* Stats Section */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="mb-24"
                >
                    <motion.h2 
                        variants={fadeInUp}
                        className="text-3xl md:text-4xl font-bold mb-16 text-center"
                    >
                        <span className="relative">
                            Our Achievements
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></span>
                        </span>
                    </motion.h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map(({ label, value, icon, color }, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className={`bg-gradient-to-br ${color} text-white p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2`}
                                whileHover={{ scale: 1.03 }}
                            >
                                <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto bg-white/20 rounded-full backdrop-blur-sm">
                                    {icon}
                                </div>
                                <div className="text-5xl font-bold mb-3 text-center">
                                    <Counter endValue={value} />+
                                </div>
                                <div className="text-lg font-medium text-center opacity-90">{label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Quote */}
                <motion.section 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 relative bg-white dark:bg-slate-800 p-10 md:p-14 rounded-3xl shadow-2xl overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-indigo-500/10 dark:from-blue-600/20 dark:to-indigo-700/20 backdrop-blur-sm z-0"></div>
                    <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-300/10 dark:bg-blue-700/10"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-indigo-300/10 dark:bg-indigo-700/10"></div>
                    
                    <div className="relative z-10">
                        <blockquote className="text-2xl md:text-3xl italic leading-relaxed">
                            <span className="absolute top-0 left-0 text-8xl text-blue-400/20 dark:text-blue-600/20">“</span>
                            <span className="relative pl-10">
                                We focus on delivering innovative, efficient, and future-proof training to the youth of India, helping them build successful careers.
                            </span>
                        </blockquote>
                        <cite className="block mt-8 text-right font-semibold text-gray-700 dark:text-gray-300">
                            <span className="block text-blue-600 dark:text-blue-400">IT Accurate Team</span>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Since 2012</span>
                        </cite>
                    </div>
                </motion.section>

            </div>

            {/* Global Styles */}
            <style jsx>{`
                @keyframes float1 {
                    0% { transform: translate(0px, 0px) rotate(0deg); }
                    50% { transform: translate(20px, 20px) rotate(180deg); }
                    100% { transform: translate(0px, 0px) rotate(360deg); }
                }
                @keyframes float2 {
                    0% { transform: translate(0px, 0px) rotate(0deg); }
                    50% { transform: translate(-20px, 20px) rotate(-180deg); }
                    100% { transform: translate(0px, 0px) rotate(-360deg); }
                }
                @keyframes float3 {
                    0% { transform: translate(0px, 0px) scale(1); }
                    50% { transform: translate(0px, -20px) scale(1.1); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-float1 {
                    animation: float1 15s infinite ease-in-out;
                }
                .animate-float2 {
                    animation: float2 20s infinite ease-in-out;
                }
                .animate-float3 {
                    animation: float3 10s infinite ease-in-out;
                }
                .animate-bounce-slow {
                    animation: bounce 3s infinite ease-in-out;
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
            `}</style>
        </div>
    );
};

export default Hero;