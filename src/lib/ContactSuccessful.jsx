import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactSuccessful = ({
  title = "Thank You!",
  message = "Thank you for submitting the form. Our team will be reaching out to you shortly.",
  primaryButtonText = "Go Back to Recent Page",
  secondaryButtonText = "Go Back to Home Page",
  className = "",
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  autoRedirect = false,
  redirectTimeout = 5000,
  redirectPath = "/"
}) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(Math.ceil(redirectTimeout / 1000));
  const [isVisible, setIsVisible] = useState(false);

  // Handle entrance animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle auto-redirect if enabled
  useEffect(() => {
    if (autoRedirect) {
      const timer = setTimeout(() => {
        if (onSecondaryButtonClick) {
          onSecondaryButtonClick();
        } else {
          navigate(redirectPath);
        }
      }, redirectTimeout);
      
      return () => clearTimeout(timer);
    }
  }, [autoRedirect, redirectTimeout, redirectPath, navigate, onSecondaryButtonClick]);

  // Countdown timer for auto redirect
  useEffect(() => {
    if (autoRedirect && timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      
      return () => clearTimeout(timerId);
    }
  }, [autoRedirect, timeLeft]);

  // Memoized button click handlers for performance
  const handlePrimaryClick = useCallback(() => {
    if (onPrimaryButtonClick) {
      onPrimaryButtonClick();
    } else {
      navigate(-1); // Go back to previous page
    }
  }, [onPrimaryButtonClick, navigate]);

  const handleSecondaryClick = useCallback(() => {
    if (onSecondaryButtonClick) {
      onSecondaryButtonClick();
    } else {
      navigate(redirectPath);
    }
  }, [onSecondaryButtonClick, navigate, redirectPath]);

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 transition-all duration-700 ${className}`}>
      <div className={`max-w-md w-full p-8 rounded-2xl shadow-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                      transform transition-all duration-700 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} 
                      hover:shadow-3xl`}>
        
        {/* Animated Checkmark Container */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Background circle with gradient and pulse animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-500 rounded-full blur-lg opacity-30 animate-pulse scale-125"></div>
            
            {/* Main checkmark circle */}
            <div className="relative flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full shadow-lg">
              {/* Animated Checkmark */}
              <svg 
                className="w-12 h-12 text-white animate-checkmark" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
              
              {/* Circular progress indicator for auto redirect */}
              {autoRedirect && (
                <svg className="absolute inset-0 w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="4"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * timeLeft) / Math.ceil(redirectTimeout / 1000)}
                    className="transition-all duration-1000 ease-linear"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
        
        {/* Title with subtle animation */}
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4 transform transition-all duration-700 delay-150 
                      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
          {title}
        </h1>
        
        {/* Message with subtle animation */}
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-8 leading-relaxed transform transition-all duration-700 delay-300 
                     ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
          {message}
        </p>
        
        {/* Buttons with staggered animation */}
        <div className="flex flex-col sm:flex-row gap-4 transform transition-all duration-700 delay-500 
                       ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
          <button
            onClick={handlePrimaryClick}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 
                      text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
                      transform hover:-translate-y-1 active:translate-y-0"
          >
            {primaryButtonText}
          </button>
          <button
            onClick={handleSecondaryClick}
            className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 
                      text-gray-800 dark:text-white font-medium rounded-lg transition-all duration-300 
                      shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 
                      dark:focus:ring-offset-gray-800 transform hover:-translate-y-1 active:translate-y-0"
          >
            {secondaryButtonText}
          </button>
        </div>
        
        {/* Auto redirect countdown */}
        {autoRedirect && (
          <div className="mt-6 text-center transform transition-all duration-700 delay-700 
                         ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
            <div className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 py-1 px-3 rounded-full">
              <span>Redirecting in </span>
              <div className="ml-1 w-8 h-5 flex justify-center items-center bg-white dark:bg-gray-600 rounded">
                <span className="font-mono font-medium text-blue-600 dark:text-blue-400">
                  {timeLeft}
                </span>
              </div>
              <span className="ml-1">seconds</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes checkmark {
          0% {
            stroke-dashoffset: 50;
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            stroke-dashoffset: 0;
            transform: scale(1);
          }
        }
        .animate-checkmark {
          stroke-dasharray: 50;
          stroke-dashoffset: 0;
          animation: checkmark 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 15px rgba(0, 0, 0, 0.07);
        }
      `}</style>
    </div>
  );
};

export default ContactSuccessful;