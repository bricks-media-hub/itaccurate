import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  FiArrowRight,
  FiCheck,
  FiUser,
  FiPhone,
  FiBookOpen,
  FiMapPin,
  FiX,
} from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import config from "../../lib/config";
import { SafeImage } from "../../lib/SafeImage";

export default function ReachUsForm() {
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

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Submit to Web3Forms
      const web3Response = await axios.post(
        "https://api.web3forms.com/submit",
        {
          access_key: "fabb3cfb-5cb8-4f83-81ae-b1c5caf0797a",
          subject: "New Contact Form Submission",
          from_name: "IT Accurate",
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

        toast.success(
          "Thank you for your enquiry! We'll contact you shortly.",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );

        reset();
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

  return (
    <div className="bg-white dark:bg-gray-950">
      <ToastContainer />
      <section
        id="enquiry"
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
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
                <h2 className="text-lg font-bold mb-2">Why IT ACCURATE?</h2>
                <h3 className="text-md font-semibold mb-6 text-gray-100">
                  Be a part of our comprehensive training programs & start your
                  journey towards becoming a Professional Developer today.
                </h3>

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
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div>
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
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                      errors.name
                        ? "border-red-500 focus:ring-red-500 dark:border-red-400"
                        : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                    } dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
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
                        message: "Name should contain only letters and spaces",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
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
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                      errors.phone
                        ? "border-red-500 focus:ring-red-500 dark:border-red-400"
                        : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                    } dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                    placeholder="Enter your phone number"
                    {...register("phone", {
                      required: "Phone number is required",
                      maxLength: {
                        value: 10,
                        message: "Enter a valid 10-digit phone number.",
                      },
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Please enter a valid 10-digit phone number",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
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
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                      errors.location
                        ? "border-red-500 focus:ring-red-500 dark:border-red-400"
                        : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                    } dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                    placeholder="Enter your location"
                    {...register("location", {
                      required: "Location is required",
                      minLength: {
                        value: 3,
                        message: "Location must be at least 3 characters",
                      },
                      maxLength: {
                        value: 100,
                        message: "Location must be less than 100 characters",
                      },
                    })}
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                <div>
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
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                      errors.course
                        ? "border-red-500 focus:ring-red-500 dark:border-red-400"
                        : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                    } dark:bg-gray-700 dark:text-white appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]`}
                    {...register("course", {
                      required: "Please select a course",
                    })}
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

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Now"}{" "}
                    <FiArrowRight className="ml-2" />
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
