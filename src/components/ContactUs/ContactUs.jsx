import React, { useEffect, useState } from "react";
import GoogleMap from "../../lib/GoogleMap";
import config from "../../lib/config";

const ContactUs = ({ initialLocation = "nagpur" }) => {
  const [selectedLocation, setSelectedLocation] = useState("nagpur");
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [formData, setFormData] = useState({ name: "", phone: "", course: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Add this useEffect to handle initial hash and changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#contact-thane') {
        setSelectedLocation('thane');
        setIsFormVisible(false); // Optional: hide form to show full map
      } else {
        setSelectedLocation('nagpur');
      }
    };

    // Check initial hash on load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const courses = [
    "SAP", "Salesforce", "AWS", "DevOps", "Python",
    "AI & ML", "Data Analytics", "Business Analytics",
    "ServiceNow", "HR Training", "Share Market"
  ];

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone must be 10 digits";
    }
    if (!formData.course) errors.course = "Please select a course";
    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const formSubmissionData = {
      access_key: "fabb3cfb-5cb8-4f83-81ae-b1c5caf0797a",
      ...formData,
    };

    try {
      const web3FormsResponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formSubmissionData),
      });

      const web3FormsResult = await web3FormsResponse.json();

      if (web3FormsResult.success) {
        const dbResponse = await fetch(`${config.apiUrl}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const dbResult = await dbResponse.json();
        setSuccessMessage(dbResult.success
          ? "Form submitted successfully!"
          : "Form submitted, but database save failed");
        setFormData({ name: "", phone: "", course: "" });
      } else {
        setErrorMessage("Submission failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-us" className="w-full px-4 py-12 md:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Main Container */}
        <div className={`relative ${isFormVisible ? "md:flex" : ""}`}>
          {/* Map Section - Takes full width when form is hidden */}
          <div className={`${isFormVisible ? "w-full md:w-1/2" : "w-full"} h-[400px] md:h-[500px] bg-gray-100 dark:bg-gray-700 relative`}>
            <GoogleMap
              location={selectedLocation} // Add this prop
            />

            {/* Toggle Button - Positioned absolutely in top-right corner */}
            <button
              onClick={() => setIsFormVisible(!isFormVisible)}
              className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition z-10"
              aria-label={isFormVisible ? "Show full map" : "Show contact form"}
            >
              {isFormVisible ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              )}
            </button>

            {/* Show Form Button (only visible when form is hidden) */}
            {!isFormVisible && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <button
                  onClick={() => setIsFormVisible(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md transition-all duration-300"
                >
                  Show Contact Form
                </button>
              </div>
            )}
          </div>

          {/* Form Section - Only visible when isFormVisible is true */}
          {isFormVisible && (
            <div className="w-full md:w-1/2 p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Contact Us</h2>
                <button
                  onClick={() => setIsFormVisible(false)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  aria-label="Hide form"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                      }`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.phone ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                      }`}
                    placeholder="9876543210"
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Select Course <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.course ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                      }`}
                  >
                    <option value="">Select a course...</option>
                    {courses.map((course) => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                  {errors.course && <p className="text-sm text-red-500">{errors.course}</p>}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium rounded-lg shadow-md transition-all duration-300 ${isSubmitting ? "opacity-75" : ""
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>

                {successMessage && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg border border-green-200 dark:border-green-800">
                    {successMessage}
                  </div>
                )}

                {errorMessage && (
                  <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800">
                    {errorMessage}
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;