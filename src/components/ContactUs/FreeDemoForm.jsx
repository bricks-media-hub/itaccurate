import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { FiArrowRight, FiCheck, FiX } from "react-icons/fi";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../../lib/config";
import { useLocation } from "react-router-dom";
import { SafeImage } from "../../lib/SafeImage";
import { useNavigate } from "react-router-dom";

export default function FreeDemoForm({ onClose, title1, title2 }) {
  const [isVisible, setIsVisible] = useState(true);
  const [courseData, setCourseData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
  ];

  useEffect(() => {
    if(location.pathname.includes("sap")){
        setCourseData(SAPCourses);
    }
    else{
      setCourseData(courses);
    }
  }, [location.pathname])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      course: "",
      location: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Submit to Web3Forms
      const web3Response = await axios.post(
        "https://api.web3forms.com/submit",
        {
          access_key: "fabb3cfb-5cb8-4f83-81ae-b1c5caf0797a",
          subject: "New Contact Form Submission",
          from_name: "Sap Training",
          ...data,
          recipient_email: "shivanihiware77@gmail.com",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (web3Response.data.success) {
        // Submit to your backend
        const dbResponse = await axios.post(config.apiUrl, data);
        setIsVisible(false);
        // toast.success(
        //   "Form submitted successfully! We'll contact you shortly.",
        //   {
        //     position: "top-center",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //   }
        // );

        reset();
        navigate("/successful");
        // setTimeout(() => {
          handleClose();
        // }, 3000);
      } else {
        throw new Error("Web3Forms submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
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

  // Close the form with animation
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <>
      <ToastContainer />
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
              transition={{ type: "spring", damping: 25 }}
              id="enquiry"
              className="w-full md:max-w-2xl max-w-sm relative"
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
                      <h2 className="text-2xl font-bold mb-2">
                        {title1 ? title1 : "For Free Demo"}
                      </h2>
                      <h3 className="text-3xl font-bold mb-6">
                        {title2 ? title2 : "Enquiry Now!"}
                      </h3>
                      <ul className="space-y-3 hidden md:block">
                        <li className="flex items-center">
                          <FiCheck className="mr-2 text-xl" /> Get free career
                          counseling
                        </li>
                        <li className="flex items-center">
                          <FiCheck className="mr-2 text-xl" /> Attend demo
                          classes
                        </li>
                        <li className="flex items-center">
                          <FiCheck className="mr-2 text-xl" /> Flexible timings
                        </li>
                        <li className="flex items-center">
                          <FiCheck className="mr-2 text-xl" /> Expert trainers
                        </li>
                        <li className="flex items-center">
                          <FiCheck className="mr-2 text-xl" /> Multiple
                          locations
                        </li>
                      </ul>
                    </motion.div>
                  </div>

                  {/* Right side - Form */}
                  <div className="md:w-1/2 p-6 md:p-8 relative">
                    <motion.form
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium"
                          htmlFor="name"
                        >
                          <SafeImage
                            src="/icons/user.svg"
                            alt="user"
                            className="inline mr-2 w-5 h-5 -mt-1"
                          />{" "}
                          Your Name
                        </label>
                        <input
                          id="name"
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                            errors.name
                              ? "border-red-500 focus:ring-red-500 dark:border-red-400"
                              : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                          } dark:bg-gray-700 dark:text-white`}
                          placeholder="Enter your full name"
                          {...register("name", {
                            required: "Name is required",
                            minLength: {
                              value: 3,
                              message: "Name must be at least 3 characters",
                            },
                            maxLength: {
                              value: 50,
                              message: "Name must be less than 50 characters",
                            },
                            pattern: {
                              value: /^[a-zA-Z\s]*$/,
                              message:
                                "Name should contain only letters and spaces",
                            },
                          })}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium"
                          htmlFor="phone"
                        >
                          <SafeImage
                            src="/icons/phone.svg"
                            alt="contact"
                            className="inline mr-2 w-5 h-5 -mt-1"
                          />{" "}
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          maxLength={10}
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(/\D/g, "");
                          }}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                            errors.phone
                              ? "border-red-500 focus:ring-red-500 dark:border-red-400"
                              : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                          } dark:bg-gray-700 dark:text-white`}
                          placeholder="Enter your phone number"
                          {...register("phone", {
                            required: "Phone number is required",
                            maxLength: {
                              value: 10,
                              message: "Enter a valid 10-digit phone number.",
                            },
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message:
                                "Please enter a valid 10-digit phone number",
                            },
                          })}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium"
                          htmlFor="location"
                        >
                          <SafeImage
                            src="/icons/map-pin-icon.png"
                            alt="contact"
                            className="inline mr-2 w-5 h-5 -mt-1"
                          />{" "}
                          Your Location
                        </label>
                        <input
                          type="text"
                          id="location"
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                            errors.location
                              ? "border-red-500 focus:ring-red-500 dark:border-red-400"
                              : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                          } dark:bg-gray-700 dark:text-white`}
                          placeholder="Enter your location"
                          {...register("location", {
                            required: "Location is required",
                            minLength: {
                              value: 3,
                              message: "Location must be at least 3 characters",
                            },
                            maxLength: {
                              value: 100,
                              message:
                                "Location must be less than 100 characters",
                            },
                          })}
                        />
                        {errors.location && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.location.message}
                          </p>
                        )}
                      </div>

                      <div className="mb-6">
                        <label
                          className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium"
                          htmlFor="course"
                        >
                          <SafeImage
                            src="/icons/select-course.svg"
                            alt="contact"
                            className="inline mr-2 w-7 h-7 -mt-1"
                          />{" "}
                          Select a Course
                        </label>
                        <select
                          id="course"
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                            errors.course
                              ? "border-red-500 focus:ring-red-500 dark:border-red-400"
                              : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                          } dark:bg-gray-700 dark:text-white`}
                          {...register("course", {
                            required: "Please select a course",
                          })}
                        >
                          <option value="">-- Select a Course --</option>
                          {courseData?.map((course) => (
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

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Now"}{" "}
                        <FiArrowRight className="inline ml-2" />
                      </motion.button>
                    </motion.form>
                  </div>
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
