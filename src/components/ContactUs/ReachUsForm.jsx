import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheck, FiUser, FiPhone, FiBookOpen, FiMapPin } from 'react-icons/fi';

export default function ReachUsForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        course: '',
        location: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const courses = [
        "SAP", "Salesforce", "AWS", "DevOps", "Python",
        "AI & ML", "Data Analytics", "Business Analytics",
        "ServiceNow", "HR Training", "Share Market", "Data Engineering"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', phone: '', course: '' }); // Reset form
        }, 3000);
    };

    return (
        <div className="bg-white dark:bg-gray-950">

            <section id="enquiry" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row-reverse">
                        {/* Right side - Info (visual section) */}
                        <div className="md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 p-6 md:p-8 text-white relative overflow-hidden">
                            {/* Decorative elements */}
                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full"></div>
                            <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-white/5 rounded-full"></div>
                            <div className="absolute left-10 top-1/2 w-24 h-24 bg-white/5 rounded-full"></div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="relative z-10 h-full flex flex-col justify-center"
                            >
                                <h2 className="text-lg font-bold mb-2">Why IT ACCURATE?
                                </h2>
                                <h3 className="text-md font-semibold mb-6 text-gray-100">Be a part of our comprehensive training programs & start your journey towards becoming a Professional Developer today.</h3>

                                <ul className="space-y-3 text-sm sm:text-base">
                                    <li className="flex items-center">
                                        <div className="flex-shrink-0 mr-3 p-1 bg-white/20 rounded-full">
                                            <FiCheck className="text-white" />
                                        </div>
                                        Start learning with us!
                                    </li>
                                    <li className="flex items-center">
                                        <div className="flex-shrink-0 mr-3 p-1 bg-white/20 rounded-full">
                                            <FiCheck className="text-white" />
                                        </div>
                                        Become industry ready
                                    </li>
                                    <li className="flex items-center">
                                        <div className="flex-shrink-0 mr-3 p-1 bg-white/20 rounded-full">
                                            <FiCheck className="text-white" />
                                        </div>
                                        24*7 support
                                    </li>
                                    <li className="flex items-center">
                                        <div className="flex-shrink-0 mr-3 p-1 bg-white/20 rounded-full">
                                            <FiCheck className="text-white" />
                                        </div>
                                        Attend live webinars every week
                                    </li>

                                    <li className="flex items-center">
                                        <div className="flex-shrink-0 mr-3 p-1 bg-white/20 rounded-full">
                                            <FiCheck className="text-white" />
                                        </div>
                                        Access to study material
                                    </li>

                                    <li className="flex items-center">
                                        <div className="flex-shrink-0 mr-3 p-1 bg-white/20 rounded-full">
                                            <FiCheck className="text-white" />
                                        </div>
                                        Job placement assistance
                                    </li>
                                </ul>
                            </motion.div>
                        </div>

                        {/* Left side - Form */}
                        <div className="md:w-1/2 p-6 sm:p-8 relative">
                            <AnimatePresence>
                                {submitted && (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="bg-green-100 dark:bg-green-900/80 text-green-800 dark:text-green-200 p-4 rounded-lg mb-6 flex items-center"
                                    >
                                        <FiCheck className="mr-2 flex-shrink-0" />
                                        Thank you for your enquiry! We'll contact you shortly.
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.form
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium" htmlFor="name">
                                        <FiUser className="inline mr-2" /> Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm transition-all"
                                        required
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium" htmlFor="phone">
                                        <FiPhone className="inline mr-2" /> Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm transition-all"
                                        required
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium" htmlFor="location">
                        <FiMapPin className="inline mr-2" /> Your Location
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm pr-10"
                          required
                          placeholder="Enter your location"
                        />
                      </div>
                    </div>
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium" htmlFor="course">
                                        <FiBookOpen className="inline mr-2" /> Select a Course
                                    </label>
                                    <select
                                        id="course"
                                        name="course"
                                        value={formData.course}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
                                        required
                                    >
                                        <option value="">-- Select a Course --</option>
                                        {courses.map(course => (
                                            <option key={course} value={course}>{course}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="pt-2">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                                    >
                                        Submit Now <FiArrowRight className="ml-2" />
                                    </motion.button>
                                </div>
                            </motion.form>

                            <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
                                We respect your privacy. Your information is secure with us.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}