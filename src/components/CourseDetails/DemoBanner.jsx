import React, { useState } from 'react';
import { FiUser, FiPhone, FiArrowRight, FiMapPin } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../../lib/config';

function DemoBanner() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      phone: ''
    }
  });

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
          }
        }
      );

      if (web3Response.data.success) {
        // Submit to your backend 
        const dbResponse = await axios.post(config.apiUrl, data);
        toast.success("Form submitted successfully! We'll contact you shortly.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        reset();
      } else {
        throw new Error("Web3Forms submission failed");
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
    <div className="w-full px-4 sm:px-6 lg:px-8 md:-mt-5 mb-5">
      <div className="relative max-w-7xl mx-auto bg-gradient-to-r from-blue-500 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-white/10" />

        <div className="relative z-10 p-6 sm:p-8 lg:p-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
              {/* Left side - Title */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Book Your Free Demo Now!
                </h3>
                <p className="mt-1 text-blue-100 dark:text-blue-200">
                  Limited slots available
                </p>
              </div>

              {/* Middle - Form fields */}
              <div className="flex-1 w-full md:w-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20">
                      <img src="/icons/user.svg" alt="user" className='w-5 h-5'/>
                    </div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      {...register("name", { 
                        required: 'Name is required',
                        minLength: {
                          value: 3,
                          message: 'Name must be at least 3 characters'
                        }
                      })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/30 focus:border-white/50 focus:ring-2 focus:ring-white/30 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 hover:bg-white dark:hover:bg-gray-700/90"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-200 absolute">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20">
                      <img src="/icons/phone.svg" alt="phone" className='w-5 h-5'/>
                    </div>
                    <input
                      type="tel"
                      placeholder="Contact Number"
                      {...register("phone", { 
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Please enter a valid 10-digit phone number'
                        }
                      })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/30 focus:border-white/50 focus:ring-2 focus:ring-white/30 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 hover:bg-white dark:hover:bg-gray-700/90"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-200 absolute">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right side - Button */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-gray-900 text-blue-600 dark:text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 group flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'Submitting...' : 'Book Demo Now!'}</span>
                {!isSubmitting && <FiArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />}
              </button>
            </div>
          </form>
        </div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-600/30 opacity-0 hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
}

export default DemoBanner;