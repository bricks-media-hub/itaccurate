import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheck, FiUser, FiPhone, FiBookOpen, FiMail, FiMapPin } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

export default function FreeDemoForm() {

  const courses = [
    "SAP", "Salesforce", "AWS", "DevOps",
    "Python", "AI & ML", "Data Analytics",
    "Business Analytics", "ServiceNow", "HR Training"
  ];
  const SAPCourses = [
    "SAP",
    "SAP MM",
    "SAP FICO",
    "SAP SD",
    "SAP HCM",
    "SAP ABAP",
    "SAP BASIS",
    "SAP SCM",
    "SAP ARIBA",
    "SAP PP",
    "SAP PM",
    "SAP QM",
    "SAP LE&SL",
    "SAP WM&EWM",
    "SAP FIORI",
    "SAP BTP",
  ]

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: '',
    location: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [courseName, setCourseData] = useState([]);
  const location = useLocation();
  
  useEffect(()=> {
    if(location.pathname.includes('sap')){
      setCourseData(SAPCourses);
    }
    else{
      setCourseData(courses);
    }
  }, [location.pathname])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', course: '', location: '' });
    }, 5000);
  };

  return (
    <section className="w-full max-w-md mx-auto my-4 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -right-20 -top-20 w-40 h-40 bg-blue-100 dark:bg-blue-900 rounded-full opacity-10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -left-20 -bottom-20 w-40 h-40 bg-purple-100 dark:bg-purple-900 rounded-full opacity-10"
        />

        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4"
          >
            Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Free Demo</span>
          </motion.h2>

          <AnimatePresence>
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-200 p-4 rounded-lg mb-4 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full mb-2">
                  <FiCheck className="text-xl text-green-600 dark:text-green-300" />
                </div>
                <h3 className="font-semibold mb-1">Thank you!</h3>
                <p className="text-sm">We'll contact you shortly.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                      <img src='/icons/user.svg' alt='user' className="inline mr-2 w-5 h-5 -mt-1" /> Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                      <img src='/icons/phone.svg' alt='contact' className="inline mr-2 w-5 h-5 -mt-1" /> Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      placeholder="Your phone number"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                      <img src='/icons/map-pin-icon.png' alt='contact' className="inline mr-2 w-5 h-5 -mt-1" /> Your Location
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        placeholder="Enter your location"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                      <img src='/icons/select-course.svg' alt='contact' className="inline mr-2 w-7 h-7 -mt-1" /> Course
                    </label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-black dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select a course</option>
                      {courseName.map(course => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <motion.button
                  onHoverStart={() => setHovered(true)}
                  onHoverEnd={() => setHovered(false)}
                  whileHover={{ scale: 1.02, boxShadow: "0 5px 15px -3px rgba(99, 102, 241, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium py-3 px-4 rounded-lg shadow-md relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Book Demo <FiArrowRight className={`ml-2 transition-transform ${hovered ? 'translate-x-1' : ''}`} />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            We respect your privacy. No spam, guaranteed.
          </p>
        </div>
      </motion.div>
    </section>
  );
}