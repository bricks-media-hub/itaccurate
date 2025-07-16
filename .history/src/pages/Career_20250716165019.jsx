import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';

const FloatingIcons = () => {
    return (
        <Canvas camera={{ position: [0, 0, 10], fov: 25 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
            <group position={[0, 0, 0]}>
                {[0, 1, 2, 3, 4].map((i) => (
                    <Sphere key={i} args={[0.5, 32, 32]} position={[
                        Math.sin(i * 2) * 3,
                        Math.cos(i * 2) * 3,
                        -i * 2
                    ]}>
                        <meshStandardMaterial
                            color={i % 2 === 0 ? '#3b82f6' : '#1d4ed8'}
                            transparent
                            opacity={0.8}
                            roughness={0.2}
                            metalness={0.1}
                        />
                    </Sphere>
                ))}
            </group>
        </Canvas>
    );
};

const AnimatedCounter = ({ from = 0, to = 100 }) => {
    const count = useMotionValue(from);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        const animation = animate(count, to, { duration: 2 });

        return animation.stop;
    }, [count, to]);

    return <motion.span>{rounded}</motion.span>;
};

const Career = () => {
    const jobOpenings = [
        {
            role: "B.D.E. (Business Development Executive)",
            qualifications: "Bachelor's degree in business, sales, or marketing",
            experience: "0 - 3 Years",
            location: "India",
            type: "Full-Time",
            applyLink: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSc2hvFxBSJHChaqenWSOp-LbXF9hPu7eNXGBnjaX4qiWS21sg/formResponse"
        },
    ];

    const benefits = [
        {
            icon: "/icons/career-clock.png",
            title: "Flexibility",
            description: "Flexible work hours and remote work options to maintain work-life balance."
        },
        {
            icon: "/icons/career-coffee.png",
            title: "Catered Meals",
            description: "Enjoy delicious catered meals during office hours."
        },
        {
            icon: "/icons/career-users.png",
            title: "Team-building",
            description: "Engage in fun and productive team-building activities regularly."
        },
        {
            icon: "/icons/career-dollar.png",
            title: "Competitive Salary",
            description: "We offer industry-competitive compensation packages."
        },
        {
            icon: "/icons/career-award.png",
            title: "Growth Opportunities",
            description: "Clear career progression paths and professional development."
        },
        {
            icon: "/icons/career-briefcase.png",
            title: "Latest Tech",
            description: "Work with cutting-edge technologies and tools."
        }
    ];

    const stats = [
        { value: 95, label: "Employee Satisfaction", icon: "/icons/user.svg" },
        { value: 100, label: "Projects Completed", icon:"/icons/project.svg" },
        { value: 50, label: "Team Members", icon: "/icons/" },
        { value: 4.9, label: "Average Rating" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
            {/* Hero Section with 3D Background */}
            <section className="relative h-[500px] md:h-[600px]">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="absolute inset-0 z-0">
                    <FloatingIcons />
                </div>
                <div className="relative z-20 h-full flex items-center justify-center">
                    <div className="text-center px-4 max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="text-4xl md:text-6xl font-bold text-white mb-6"
                            >
                                Build Your <span className="text-blue-300">Future</span> With Us
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
                            >
                                We're not just offering jobs - we're offering careers that make an impact.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="mt-10"
                            >
                                <a
                                    href="#openings"
                                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    View Open Positions
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Animated scroll indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: [0, 1, 0],
                        y: [20, 0, -10]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 0.5
                    }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
                >
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                        <motion.div
                            animate={{
                                y: [0, 5, 0],
                                opacity: [1, 0.5, 1]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity
                            }}
                            className="w-1 h-2 bg-white rounded-full mt-2"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gradient-to-b from-blue-600 to-blue-700 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                                className="p-6"
                            >
                                <div className="text-4xl md:text-5xl font-bold mb-2">
                                    <AnimatedCounter from={0} to={stat.value} />{
                                        typeof stat.value === 'number' && !Number.isInteger(stat.value) ? '' : '+'
                                    }
                                </div>
                                <div className="text-lg md:text-xl">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Current Openings Section */}
            <section id="openings" className="py-20 px-4 max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="inline-block mb-4"
                    >
                        <div className="relative">
                            <div className="absolute -inset-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg blur opacity-75"></div>
                            <h2 className="relative text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                                Current Openings
                            </h2>
                        </div>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                    >
                        We're always looking for talented individuals to join our growing team.
                    </motion.p>
                </motion.div>

                {/* Desktop Table View */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                                <tr>
                                    <th className="px-8 py-5 text-left text-sm font-medium">Role</th>
                                    <th className="px-8 py-5 text-left text-sm font-medium">Location</th>
                                    <th className="px-8 py-5 text-left text-sm font-medium">Type</th>
                                    <th className="px-8 py-5 text-left text-sm font-medium">Apply</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {jobOpenings.map((job, index) => (
                                    <motion.tr
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="font-medium text-lg text-gray-800 dark:text-white">{job.role}</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                                <span className="font-medium">Qualification:</span> {job.qualifications}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                <span className="font-medium">Experience:</span> {job.experience}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-gray-600 dark:text-gray-300">
                                            <div className="flex items-center">
                                                <img src="/icons/map-pin-icon.png" alt="Location" className="w-5 h-5 mr-2" />
                                                {job.location}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${job.type === 'Full-Time'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                                : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                                                }`}>
                                                {job.type}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <motion.a
                                                href={job.applyLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                                            >
                                                Apply Now <img src="/icons/career-apply.svg" alt="Send" className="w-4 h-4 ml-2" />
                                            </motion.a>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-6">
                    {jobOpenings.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-blue-500"
                        >
                            <div className="mb-3 text-xl font-semibold text-gray-800 dark:text-white">{job.role}</div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
                                <img src="/icons/map-pin-icon.png" alt="Location" className="w-4 h-4 mr-2" />
                                {job.location}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                <span className="font-medium">Qualification:</span> {job.qualifications}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                <span className="font-medium">Experience:</span> {job.experience}
                            </div>
                            <div className="flex justify-between items-center">
                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${job.type === 'Full-Time'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                    : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                                    }`}>
                                    {job.type}
                                </span>
                                <motion.a
                                    href={job.applyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium inline-flex items-center"
                                >
                                    Apply <img src="/images/briefcase-icon.png" alt="Briefcase" className="w-4 h-4 ml-1" />
                                </motion.a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <div className="max-w-7xl mx-auto">
                    {/* Section Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-16 text-center"
                    >
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
                        >
                            Why <span className="text-blue-600">Join</span> Us?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                        >
                            We invest in our team's growth, happiness, and well-being.
                        </motion.p>
                    </motion.div>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30, rotateY: 90 }}
                                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                                whileHover={{ scale: 1.02, rotateX: 1, rotateY: 1 }}
                                className="relative bg-white/60 dark:bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden transition-all duration-500 border border-transparent hover:border-blue-400/50 dark:hover:border-blue-500/30 group"
                            >
                                {/* Glow ring on hover */}
                                <div className="absolute inset-0 rounded-2xl pointer-events-none transition duration-300 group-hover:ring-2 group-hover:ring-blue-300/30 dark:group-hover:ring-blue-500/20"></div>

                                <div className="p-8 flex flex-col items-center text-center space-y-4">
                                    {/* Icon Bubble */}
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center 
                 shadow-[0_0_20px_5px_rgba(59,130,246,0.3)] dark:shadow-[0_0_20px_5px_rgba(59,130,246,0.2)]
                 ring-1 ring-blue-300 dark:ring-blue-700/30 transition-all duration-300"
                                    >
                                        <img src={benefit.icon} alt={benefit.title} className="w-10 h-10" />
                                    </motion.div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                                        {benefit.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            </motion.div>

                        ))}
                    </div>
                </div>
            </section>

            {/* Culture Section */}
            <section className="py-20 px-4 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="md:w-1/2"
                        >
                            <div className="relative">
                                <div className="absolute -inset-4 bg-blue-100 dark:bg-blue-900/20 rounded-2xl blur opacity-75"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                                    alt="Team culture"
                                    className="relative rounded-xl shadow-2xl w-full h-auto"
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="md:w-1/2"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
                                Our <span className="text-blue-600">Culture</span>
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                We foster a culture of innovation, collaboration, and continuous learning. Our team is our greatest asset, and we prioritize creating an environment where everyone can thrive.
                            </p>
                            <ul className="space-y-4">
                                {['Collaborative Environment', 'Continuous Learning', 'Work-Life Balance', 'Diversity & Inclusion'].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                                        className="flex items-start"
                                    >
                                        <span className="flex-shrink-0 mt-1 mr-3">
                                            <img src="/icons/career-tick.svg" alt="Check" className="w-5 h-5" />
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-3xl md:text-4xl font-bold mb-6"
                        >
                            Ready to Start Your Journey With Us?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-xl mb-8 max-w-2xl mx-auto"
                        >
                            Even if you don't see the perfect role, we'd love to hear from you. Amazing talent always has a place here.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="flex flex-col sm:flex-row justify-center gap-4"
                        >
                            <motion.a
                                href="#openings"
                                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg shadow-lg transition-all duration-300"
                            >
                                View All Openings
                            </motion.a>
                            <Link
                                to={`/contact`}
                                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block bg-transparent border-2 border-white hover:bg-white/10 font-medium py-3 px-8 rounded-lg shadow-lg transition-all duration-300"
                            >
                                Contact Our Team
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Career;