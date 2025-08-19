import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  FiUser,
  FiPhone,
  FiBookOpen,
  FiMapPin,
  FiMail,
  FiGlobe,
  FiSend,
  FiMap,
} from "react-icons/fi";
import { GoogleMap } from "../lib/GoogleMap";
import config from "../lib/config";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      course: "",
      location: "",
      message: "", // This will remain local-only
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const messageContent = watch("message"); // Track message field but don't submit it
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
    "Share Market",
    "Data Engineering",
  ];

  const locations = [
    {
      icon: (
        <img src="/icons/location.svg" alt="location" className="w-10 h-10" />
      ),
      location: "Nagpur",
      address:
        "607, 608 B-wing, Lokmat Bhavan, Lokmat Square, Ramdaspeth, Nagpur 440012",
      phoneLink: "tel:09175978889",
      phone: "09175978889",
      email: "info@itaccurate.com",
      emailLink: "mailto:info@itaccurate.com",
      mapLink:
        "https://www.google.com/maps/place/Sapalogy+Training-+IT+ACCURATE/@21.135481,79.078029,2702m/data=!3m1!1e3!4m6!3m5!1s0x3bd4bf33b07e2643:0x1b45df16c0e6fa96!8m2!3d21.1354806!4d79.0780286!16s%2Fg%2F11ff0vtdt7!5m1!1e1?hl=en&entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      icon: (
        <img src="/icons/location.svg" alt="location" className="w-10 h-10" />
      ),
      location: "Thane",
      address: "Office No. 806, 8th Floor, Paradise Tower, next to McDonald's, Naupada, Thane West 400602",
      phoneLink: "tel:07738277389",
      phone: "07738277389",
      email: "info@itaccurate.com",
      emailLink: "mailto:info@itaccurate.com",
      mapLink:
        "https://www.google.com/maps/place/IT+Accurate+%E2%80%93+SAP+%26+Data+Analytics+in+Thane/@19.1876259,72.9727232,17z/data=!4m14!1m7!3m6!1s0x3be7b90d997fd167:0x5439eb8e12dbc517!2sIT+Accurate+%E2%80%93+SAP+%26+Data+Analytics+in+Thane!8m2!3d19.1876209!4d72.9752981!16s%2Fg%2F11m606w0kg!3m5!1s0x3be7b90d997fd167:0x5439eb8e12dbc517!8m2!3d19.1876209!4d72.9752981!16s%2Fg%2F11m606w0kg?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D",
    },
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Remove message field before submission
    const { message, ...submissionData } = data;

    try {
      const response = await axios.post(
        "https://api.web3forms.com/submit",
        {
          access_key: "fabb3cfb-5cb8-4f83-81ae-b1c5caf0797a",
          subject: "Contact Form Submission",
          from_name: "IT Accurate",
          ...submissionData,
          recipient_email: "shivanihiware77@gmail.com",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        await axios.post(config.apiUrl, data);
        // toast.success("Thank you for your message! We'll contact you soon.", {
        //   position: "top-center",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        // });
        reset();
        navigate("/successful");
      } else {
        throw new Error("Form submission failed");
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 mt-14">
      <ToastContainer />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 text-white py-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-purple-400 opacity-20 animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-blue-400 opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-indigo-400 opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Floating chat icons */}
        <div className="absolute left-10 top-1/4 animate-float">
          <svg
            className="w-12 h-12 text-white opacity-80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
        </div>
        <div className="absolute right-10 bottom-1/4 animate-float animation-delay-3000">
          <svg
            className="w-12 h-12 text-white opacity-80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
        </div>

        {/* Main content of designs and styles */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-white bg-opacity-30 rounded-full blur-md"></div>
              <div className="relative bg-white bg-opacity-20 rounded-full p-3">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Let's <span className="text-yellow-300">Connect</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
          >
            We're here to help! Reach out for inquiries, support, or just to say
            hello.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center px-6 py-3 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-full shadow-lg hover:bg-opacity-20 transition-all duration-300"
          >
            <span className="mr-2">Get in touch</span>
            <svg
              className="w-5 h-5 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </motion.div>
        </div>

        {/* Animated SVG character */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute right-10 bottom-0 hidden lg:block w-64 h-64"
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            {/* Head */}
            <circle cx="100" cy="80" r="40" fill="#ffffff" />

            {/* Eyes */}
            <circle cx="85" cy="70" r="5" fill="#3B82F6">
              <animate
                attributeName="cy"
                values="70;65;70"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="115" cy="70" r="5" fill="#3B82F6">
              <animate
                attributeName="cy"
                values="70;65;70"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Smile */}
            <path
              d="M85 100 Q100 110 115 100"
              stroke="#3B82F6"
              strokeWidth="3"
              fill="none"
            >
              <animate
                attributeName="d"
                values="M85 100 Q100 110 115 100; M85 95 Q100 115 115 95; M85 100 Q100 110 115 100"
                dur="3s"
                repeatCount="indefinite"
              />
            </path>

            {/* Body */}
            <rect
              x="70"
              y="120"
              width="60"
              height="60"
              rx="10"
              fill="#ffffff"
            />

            {/* Phone */}
            <rect
              x="100"
              y="130"
              width="20"
              height="30"
              rx="2"
              fill="#E5E7EB"
            />
            <rect
              x="105"
              y="135"
              width="10"
              height="20"
              rx="1"
              fill="#9CA3AF"
            />

            {/* Hand wave animation */}
            <rect x="60" y="130" width="10" height="20" rx="5" fill="#ffffff">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 60 140; 20 60 140; 0 60 140"
                dur="2s"
                repeatCount="indefinite"
              />
            </rect>
          </svg>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                  Our Locations
                </h2>

                <div className="space-y-8">
                  {locations.map((loc, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                          {loc.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-2">
                            {loc.location}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-3">
                            {loc.address}
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center text-gray-700 dark:text-gray-300">
                              {/* <MdPhone className="mr-2 text-blue-600" /> */}
                              <img
                                src="/icons/phone.svg"
                                alt="telephone"
                                className="w-5 h-5 mr-2"
                              />
                              <a href={loc.phoneLink}>
                              <span>{loc.phone}</span>
                              </a>
                            </div>
                            <div className="flex items-center text-gray-700 dark:text-gray-300">
                              {/* <MdOutlineEmail className="mr-2 text-blue-600" /> */}
                              <img
                                src="/icons/mail.svg"
                                alt="email"
                                className="w-5 h-5 mr-2"
                              />
                              <a href={loc.emailLink}>
                              <span className="hover:underline hover:text-blue-900 dark:hover:text-blue-300 hover:cursor-pointer">
                                {loc.email}
                              </span>
                              </a>
                            </div>
                          </div>
                          <a
                            href={loc.mapLink}
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mt-3 text-sm font-medium"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {/* <FiMapPin className="mr-1" />  */}
                            <img
                              src="/icons/map-location.svg"
                              alt="email"
                              className="w-7 h-7 mr-1"
                            />
                            View on map
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  General Information
                </h3>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-4">
                        {/* <FiMail className="text-blue-600" /> */}
                        <img
                          src="/icons/email.svg"
                          alt="email"
                          className="w-7 h-7"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-500 dark:text-gray-400">
                          Email
                        </h4>
                        <p className="text-gray-800 dark:text-white">
                          <a href="https://mail.google.com/mail/u/0/#inbox?compose=jrjtXMlxTRkbrvBTmzcVKrHcNszZPmsvkcJstrkTTrzVPKdszcRMKTfjnClQSXGCtNcXGlCP">
                            info@itaccurate.com
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-4">
                        {/* <FiGlobe className="text-blue-600" /> */}
                        <img
                          src="/icons/internet-globe.svg"
                          alt="email"
                          className="w-7 h-7"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-500 dark:text-gray-400">
                          Website
                        </h4>
                        <p className="text-gray-800 dark:text-white">
                          <a href="/">www.itaccurate.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
              >
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  Send us a message
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Fill out the form below and we'll get back to you soon.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-5">
                    {/* Name Field */}
                    <div>
                      <label className="flex text-gray-700 dark:text-gray-300 mb-2 font-medium">
                        <img
                          src="/icons/user.svg"
                          alt="user"
                          className="w-5 h-5 mr-2"
                        />{" "}
                        Full Name
                      </label>
                      <input
                        {...register("name", {
                          required: "Name is required",
                          minLength: {
                            value: 3,
                            message: "Minimum 3 characters",
                          },
                          pattern: {
                            value: /^[a-zA-Z\s]*$/,
                            message: "Only letters and spaces allowed",
                          },
                        })}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.name
                            ? "border-red-500 focus:ring-red-500 dark:border-red-400"
                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                        } dark:bg-gray-700 dark:text-white`}
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className="flex text-gray-700 dark:text-gray-300 mb-2 font-medium">
                        <img
                          src="/icons/phone.svg"
                          alt="phone"
                          className="w-5 h-5 mr-2"
                        />{" "}
                        Phone Number
                      </label>
                      <input
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Please enter a valid 10-digit number",
                          },
                        })}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.phone
                            ? "border-red-500 focus:ring-red-500 dark:border-red-400"
                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                        } dark:bg-gray-700 dark:text-white`}
                        placeholder="Your contact number"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Location Field */}
                    <div>
                      <label className="flex text-gray-700 dark:text-gray-300 mb-2 font-medium">
                        <img
                          src="/icons/map-pin-icon.png"
                          alt="location"
                          className="w-5 h-5 mr-2"
                        />{" "}
                        Your Location
                      </label>
                      <input
                        {...register("location", {
                          required: "Location is required",
                          minLength: {
                            value: 3,
                            message: "Minimum 3 characters",
                          },
                        })}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.location
                            ? "border-red-500 focus:ring-red-500 dark:border-red-400"
                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                        } dark:bg-gray-700 dark:text-white`}
                        placeholder="Your city or address"
                      />
                      {errors.location && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.location.message}
                        </p>
                      )}
                    </div>

                    {/* Course Field */}
                    <div>
                      <label className="flex text-gray-700 dark:text-gray-300 mb-2 font-medium">
                        <img
                          src="/icons/book.svg"
                          alt="course"
                          className="w-6 h-6 mr-2"
                        />{" "}
                        Interested Course
                      </label>
                      <select
                        {...register("course", {
                          required: "Please select a course",
                        })}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.course
                            ? "border-red-500 focus:ring-red-500 dark:border-red-400"
                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                        } dark:bg-gray-700 dark:text-white`}
                      >
                        <option value="">-- Select a Course --</option>
                        {courses.map((course) => (
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

                    {/* Message Field (local only) */}
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                        Your Message (Optional)
                      </label>
                      <textarea
                        {...register("message")}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Any specific questions or requirements?"
                        value={messageContent}
                        onChange={(e) => setValue("message", e.target.value)}
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Send Message <FiSend className="ml-2" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Find Us On Map
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Visit our training centers at these locations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {locations.map((loc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg"
              >
                <div className="h-64 bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                  {/* <span className="text-gray-500 dark:text-gray-400">Map of {loc.location}</span> */}
                  <GoogleMap location={loc.location} />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {loc.location} Center
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {loc.address}
                  </p>
                  <a
                    href={loc.mapLink}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiMapPin className="mr-1" /> Open in Maps
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
