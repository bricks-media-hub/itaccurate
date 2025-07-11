import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiArrowRight, FiCheck, FiUser, FiPhone, FiBookOpen, FiMail, FiMapPin } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function FreeDemoForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      course: '',
      location: ''
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [courseName, setCourseData] = useState([]);
  const location = useLocation();

  const courses = [
    "SAP", "Salesforce", "AWS", "DevOps",
    "Python", "AI & ML", "Data Analytics",
    "Business Analytics", "ServiceNow", "HR Training"
  ];

  const SAPCourses = [
    "SAP", "SAP MM", "SAP FICO", "SAP SD", "SAP HCM", 
    "SAP ABAP", "SAP BASIS", "SAP SCM", "SAP ARIBA", 
    "SAP PP", "SAP PM", "SAP QM", "SAP LE&SL", 
    "SAP WM&EWM", "SAP FIORI", "SAP BTP"
  ];

  useEffect(() => {
    if (location.pathname.includes('sap')) {
      setCourseData(SAPCourses);
    } else {
      setCourseData(courses);
    }
  }, [location.pathname]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "https://api.web3forms.com/submit",
        {
          access_key: "fabb3cfb-5cb8-4f83-81ae-b1c5caf0797a",
          subject: "Free Demo Request",
          from_name: "IT Training",
          ...data,
          recipient_email: "shivanihiware77@gmail.com",
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (response.data.success) {
        toast.success("Thank you! We'll contact you shortly to schedule your demo.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        reset();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error("Failed to submit the form. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full max-w-md mx-auto py-2 sm:px-6 sm:py-8">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-6 sm:p-8 overflow-hidden"
      >
        {/* Animated background blobs */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -right-24 -top-24 w-40 h-40 bg-blue-100 dark:bg-blue-900 rounded-full opacity-10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -left-24 -bottom-24 w-40 h-40 bg-purple-100 dark:bg-purple-900 rounded-full opacity-10"
        />

        <div className="relative z-10">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6"
          >
            Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Free Demo</span>
          </motion.h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {[
              {
                name: "name",
                label: "Name",
                icon: "/icons/user.svg",
                type: "text",
                placeholder: "Your name",
                validation: {
                  required: "Name is required",
                  minLength: { value: 3, message: "Minimum 3 characters" },
                  maxLength: { value: 50, message: "Maximum 50 characters" },
                  pattern: {
                    value: /^[a-zA-Z\s]*$/,
                    message: "Only letters and spaces allowed"
                  }
                }
              },
              {
                name: "phone",
                label: "Phone",
                icon: "/icons/phone.svg",
                type: "tel",
                placeholder: "Your phone number",
                validation: {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit number"
                  }
                }
              },
              {
                name: "location",
                label: "Your Location",
                icon: "/icons/map-pin-icon.png",
                type: "text",
                placeholder: "Enter your location",
                validation: {
                  required: "Location is required",
                  minLength: { value: 3, message: "Minimum 3 characters" }
                }
              }
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                  <img src={field.icon} alt={field.label} className="w-5 h-5 mr-2" />
                  {field.label}
                </label>
                <input
                  type={field.type}
                  {...register(field.name, field.validation)}
                  placeholder={field.placeholder}
                  className={`w-full px-3 py-2 bg-white dark:bg-gray-800 border rounded-lg focus:ring-2 focus:outline-none ${
                    errors[field.name]
                      ? 'border-red-500 focus:ring-red-500 dark:border-red-400'
                      : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500'
                  }`}
                />
                {errors[field.name] && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors[field.name].message}
                  </p>
                )}
              </div>
            ))}

            {/* Course Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <img src='/icons/select-course.svg' alt='Course' className="w-6 h-6 mr-2" />
                Course
              </label>
              <select
                {...register("course", { required: "Please select a course" })}
                className={`w-full px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.course
                    ? 'border-red-500 focus:ring-red-500 dark:border-red-400'
                    : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500'
                }`}
              >
                <option value="">Select a course</option>
                {courseName.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
              {errors.course && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.course.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              whileHover={{ scale: 1.02, boxShadow: "0 5px 15px -3px rgba(99,102,241,0.3)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium py-3 px-4 rounded-lg shadow-md relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? 'Submitting...' : 'Book Demo'} 
                <FiArrowRight className={`ml-2 transition-transform ${hovered ? 'translate-x-1' : ''}`} />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </motion.button>
          </form>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-5">
            We respect your privacy. No spam, guaranteed.
          </p>
        </div>
      </motion.div>
    </section>
  );
}