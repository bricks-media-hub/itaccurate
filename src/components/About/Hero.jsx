import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiCheck, FiCalendar, FiGlobe, FiBook, FiAward, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { SafeImage } from '../../lib/SafeImage';

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
        { label: 'Qualified Trainers', value: 92, icon: "/icons/batch.svg", color: 'from-blue-500 to-blue-400' },
        { label: 'Live Classes/Month', value: 250, icon: "/icons/calendar2.svg", color: 'from-purple-500 to-purple-400' },
        { label: 'Global Accreditations', value: 120, icon: "/icons/wireframe-globe.svg", color: 'from-emerald-500 to-emerald-400' },
        { label: 'Courses Offered', value: 10, icon: "/icons/book.svg", color: 'from-amber-500 to-amber-400' },
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
                                        Popular Courses {i + 1}
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
                            icon: "/icons/badge2.svg",
                            bg: "bg-gradient-to-r from-blue-50 to-yellow-50 dark:from-blue-900/20 dark:to-yellow-900/10",
                            iconBg: "bg-yellow-400",
                            number: "01",
                            numberColor: "text-yellow-400",
                            content: "Our practical, job-oriented training program will not only provide you with internationally accepted certificates but also with knowledge equivalent to a minimum of 1+ years of field experience. We value your time as much as ours. Hence, we provide an industry-based syllabus with industrial-experienced trainers, plus technical mock interviews, resume preparation, and 100% guaranteed job assistance. All global certifications are available under one roof in Nagpur."
                        },
                        {
                            icon: "/icons/users.svg",
                            bg: "bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/10",
                            iconBg: "bg-blue-400",
                            number: "02",
                            numberColor: "text-blue-400",
                            content: "Additionally, IT Accurate assists you in honing your soft skills, including communication skills, public speaking, email etiquette, personal interviews, and HR grooming sessions. You'll ace the interviews both during and after the training using these abilities."
                        },
                        {
                            icon: "/icons/sap.svg",
                            bg: "bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/10",
                            iconBg: "bg-green-500",
                            number: "03",
                            numberColor: "text-green-400",
                            content: "We proudly consider ourselves the highest placement-providing institute in Nagpur, as per our last 10 years' records, with 400+ placement tie-ups with IT, service, and manufacturing companies across PAN India."
                        },
                        {
                            icon: "/icons/internet-globe.svg",
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
                                {/* <div className={`${item.iconBg} w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:mr-4 flex items-center justify-center transform group-hover:rotate-12 transition-transform`}> */}
                                <SafeImage src={item.icon} alt="icon" className="w-8 h-8 sm:w-14 sm:h-14 object-contain" />
                                {/* </div> */}

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
                                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-6 mx-auto bg-white/20 rounded-full backdrop-blur-sm">
                                    <SafeImage src={icon} alt="icons" className='w-10 h-10 sm:w-20 sm:h-20'/>
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