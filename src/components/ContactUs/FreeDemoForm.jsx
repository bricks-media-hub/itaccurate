import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheck, FiUser, FiPhone, FiBookOpen, FiX } from 'react-icons/fi';

export default function FreeDemoForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Demo courses data
  const courses = [
    "SAP",
    "Salesforce",
    "AWS",
    "DevOps",
    "Python",
    "AI & ML",
    "Data Analytics",
    "Business Analytics",
    "ServiceNow",
    "HR Training",
    "Share Market",
    "Data Engineering"
  ];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      handleClose();
    }, 3000);
  };

  // Close the form with animation
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Match this with the animation duration
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.section
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            id="enquiry"
            className="w-full max-w-2xl relative"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute -top-3 -right-3 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close form"
            >
              <FiX className="text-gray-800 dark:text-gray-200 text-xl" />
            </button>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
              <div className="md:flex">
                {/* Left side - Info */}
                <div className="md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 p-6 md:p-8 text-white flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full"></div>
                  <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-white/5 rounded-full"></div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10"
                  >
                    <h2 className="text-2xl font-bold mb-2">For Free Demo</h2>
                    <h3 className="text-3xl font-bold mb-6">Enquiry Now!</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <FiCheck className="mr-2 text-xl" /> Get free career counseling
                      </li>
                      <li className="flex items-center">
                        <FiCheck className="mr-2 text-xl" /> Attend demo classes
                      </li>
                      <li className="flex items-center">
                        <FiCheck className="mr-2 text-xl" /> Flexible timings
                      </li>
                      <li className="flex items-center">
                        <FiCheck className="mr-2 text-xl" /> Expert trainers
                      </li>
                    </ul>
                  </motion.div>
                </div>
                
                {/* Right side - Form */}
                <div className="md:w-1/2 p-6 md:p-8 relative">
                  <AnimatePresence>
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-lg mb-6"
                      >
                        Thank you for your enquiry! We'll contact you shortly.
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <motion.form
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-4">
                      <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium" htmlFor="name">
                        <FiUser className="inline mr-2" /> Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium" htmlFor="phone">
                        <FiPhone className="inline mr-2" /> Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                        required
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium" htmlFor="course">
                        <FiBookOpen className="inline mr-2" /> Select a Course
                      </label>
                      <select
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                        required
                      >
                        <option value="">-- Select a Course --</option>
                        {courses.map(course => (
                          <option key={course} value={course}>{course}</option>
                        ))}
                      </select>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Submit Now <FiArrowRight className="inline ml-2" />
                    </motion.button>
                  </motion.form>
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}