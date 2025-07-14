// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import config from "../../lib/config";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { FiSend, FiX, FiMessageSquare, FiChevronDown, FiChevronRight, FiInfo } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";
// import { useSelector } from "react-redux";
// import ReactMarkdown from "react-markdown";
// import { GetCourseAbout } from "../../api/fetchComponentData";

// const ChatBotWidget = () => {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     // default message 
//     { 
//       from: "bot", 
//       text: "👋 Hey there! I'm here to help you join a course. Would you like to get started?",
//       options: ["Yes, please!", "Show me courses", "Not now"]
//     },
//   ]);
//   const [userInput, setUserInput] = useState("");
//   const [step, setStep] = useState("intro");
// //   form filling
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     course: "",
//     location: "",
//   });
//   const [isTyping, setIsTyping] = useState(false);
//   const [expandedCategory, setExpandedCategory] = useState(null);
//   const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);
//   const messagesEndRef = useRef(null);

//   // Get courses from Redux store
//   const courses = useSelector((state) => state.navbar.menuItems);

//   // Auto-scroll to bottom when messages change
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, expandedCategory, selectedCourseDetails]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const validateStep = (field, value) => {
//     if (!value.trim()) return "This field is required.";
//     if (field === "phone" && !/^\d{10}$/.test(value))
//       return "Please enter a valid 10-digit phone number.";
//     return null;
//   };

//   const addBotMessage = (text, options = []) => {
//     setIsTyping(true);
//     setTimeout(() => {
//       setMessages(prev => [...prev, { from: "bot", text, options }]);
//       setIsTyping(false);
//     }, 800);
//   };

//   const handleQuickReply = (reply) => {
//     setUserInput(reply);
//     handleSend();
//   };

//   const toggleCategory = (categoryTitle) => {
//     setExpandedCategory(expandedCategory === categoryTitle ? null : categoryTitle);
//     setSelectedCourseDetails(null); // Clear course details when toggling categories
//   };

// const fetchCourseDetails = async (courseTitle) => {
//   try {
//     setIsTyping(true);

//     const points = await GetCourseAbout(courseTitle); // returns array of strings
//     if (points && points.length > 0) {
//       const markdownList = points.map(point => `- ${point}`).join('\n');

//       setSelectedCourseDetails({
//         title: courseTitle,
//         description: markdownList
//       });
//     } else {
//       addBotMessage(`I don't have detailed information about ${courseTitle} right now. Would you like to enroll or ask something else?`);
//     }
//   } catch (error) {
//     console.error("Error fetching course details:", error);
//     addBotMessage("Sorry, I couldn't fetch the course details right now. Please try again later.");
//   } finally {
//     setIsTyping(false);
//   }
// };


//   const handleCourseSelect = (courseTitle, isSubCourse = false) => {
//     // If user is asking about a course (e.g., "tell me about SAP FICO")
//     console.log("this is course name", courseTitle)
//     if (userInput.toLowerCase().includes('tell me about') || 
//         userInput.toLowerCase().includes('what is') ||
//         userInput.toLowerCase().includes('info about')) {
//       fetchCourseDetails(courseTitle);
//       return;
//     }

//     // Normal course selection flow
//     if (isSubCourse || !courses.find(c => c.title === courseTitle)) {
//       setUserInput(courseTitle);
//       handleSend();
//     } else {
//       toggleCategory(courseTitle);
//     }
//   };

//   const handleSend = async () => {
//     if (!userInput.trim()) return;

//     const input = userInput.trim();
//     setMessages(prev => [...prev, { from: "user", text: input }]);
//     setUserInput("");
//     setSelectedCourseDetails(null); // Clear any displayed course details

//     let nextStep = step;

//     // Check if user is asking about a specific course
//     if (/tell me about|what is|info about/i.test(input.toLowerCase())) {
//       const courseMatch = input.match(/tell me about|what is|info about (.+)/i);
//       if (courseMatch && courseMatch[1]) {
//         const courseName = courseMatch[1].trim();
//         fetchCourseDetails(courseName);
//         return;
//       }
//     }

//     if (/courses|list|offer|show me/i.test(input.toLowerCase())) {
//       nextStep = "show_courses";
//     }

//     switch (step) {
//       case "intro":
//         if (/yes|please|sure|ok/i.test(input.toLowerCase())) {
//           addBotMessage("Awesome! Let's get to know each other. 🤝");
//           addBotMessage("First, may I know your full name?");
//           nextStep = "name";
//         } else if (/no|not now|later/i.test(input.toLowerCase())) {
//           addBotMessage("No problem! I'll be here when you're ready. Just say 'Hi' to start again. 👋");
//           nextStep = "done";
//         } else {
//           addBotMessage("I'm not sure I understand. Would you like to get started with course information?");
//         }
//         break;

//       case "name": {
//         const error = validateStep("name", input);
//         if (error) {
//           addBotMessage(error);
//           return;
//         }
//         setFormData(f => ({ ...f, name: input }));
//         addBotMessage(`Nice to meet you, ${input}! 😊`);
//         addBotMessage("Can I have your phone number so we can contact you?", ["Skip for now"]);
//         nextStep = "phone";
//         break;
//       }

//       case "phone": {
//         if (/skip/i.test(input.toLowerCase())) {
//           addBotMessage("No problem! We'll contact you via email then.");
//           nextStep = "location";
//           break;
//         }
        
//         const error = validateStep("phone", input);
//         if (error) {
//           addBotMessage(error);
//           return;
//         }
//         setFormData(f => ({ ...f, phone: input }));
//         addBotMessage("Thanks! Where are you from?");
//         nextStep = "location";
//         break;
//       }

//       case "location": {
//         const error = validateStep("location", input);
//         if (error) {
//           addBotMessage(error);
//           return;
//         }
//         setFormData(f => ({ ...f, location: input }));
//         addBotMessage("Perfect! Now, which course would you like to enroll in?");
//         nextStep = "course";
//         break;
//       }

//       case "course": {
//         const error = validateStep("course", input);
//         if (error) {
//           addBotMessage(error);
//           return;
//         }

//         const finalData = { ...formData, course: input };
//         setFormData(finalData);
//         addBotMessage("Awesome! Submitting your details now... 🔄");

//         try {
//           const web3Res = await axios.post(
//             "https://api.web3forms.com/submit",
//             {
//               access_key: "fabb3cfb-5cb8-4f83-81ae-b1c5caf0797a",
//               subject: "New Contact Form Submission",
//               from_name: "Sapalogy Training",
//               recipient_email: "shivanihiware77@gmail.com",
//               ...finalData,
//             },
//             { headers: { "Content-Type": "application/json" } }
//           );

//           if (web3Res.data.success) {
//             const dbRes = await axios.post(config.apiUrl, finalData, {
//               headers: { "Content-Type": "application/json" },
//             });

//             if (dbRes.data.success) {
//               addBotMessage("✅ All set! We've received your info and will reach out shortly.");
//               toast.success("Form submitted successfully!");
//             } else {
//               addBotMessage("⚠️ Info submitted to Web3Forms, but saving to DB failed.");
//               toast.warn("Saved to Web3Forms, but DB failed.");
//             }
//           } else {
//             addBotMessage("❌ Web3Forms submission failed.");
//             toast.error("Web3Forms submission failed.");
//           }
//         } catch (err) {
//           console.error("Submission Error:", err);
//           addBotMessage("❌ Something went wrong while submitting.");
//           toast.error("Something went wrong while submitting.");
//         }

//         nextStep = "done";
//         break;
//       }

//       case "show_courses":
//         addBotMessage("Here are the courses we offer:");
//         nextStep = "course_selection";
//         break;

//       case "course_selection":
//         setFormData(f => ({ ...f, course: input }));
//         addBotMessage(`Great choice! You've selected ${input}.`);
//         addBotMessage("May I know your name to proceed?");
//         nextStep = "name";
//         break;

//       default:
//         if (/hi|hello|start/i.test(input.toLowerCase())) {
//           addBotMessage("👋 Welcome back! How can I help you today?");
//           nextStep = "intro";
//         } else {
//           addBotMessage("I'm here if you need anything else. Just say 'Hi' to start again. 👋");
//         }
//         break;
//     }

//     setStep(nextStep);
//   };

//   const renderCourseCard = (course) => {
//     const hasSubCourses = course.subMenu && course.subMenu.length > 0;
    
//     return (
//       <motion.div
//         key={course.title}
//         whileHover={{ scale: 1.02 }}
//         className="border rounded-lg overflow-hidden bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-shadow mb-2"
//       >
//         <div 
//           className="p-4 cursor-pointer flex justify-between items-center"
//           onClick={() => hasSubCourses ? toggleCategory(course.title) : handleCourseSelect(course.title)}
//         >
//           <div className="flex items-center space-x-3">
//             {course.icon ? (
//               <img src={course.icon} alt={course.title} className="w-8 h-8" />
//             ) : (
//               <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
//                 <FiMessageSquare className="text-blue-600 dark:text-blue-300" />
//               </div>
//             )}
//             <div>
//               <h4 className="font-medium">{course.title}</h4>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 {course.description}
//               </p>
//             </div>
//           </div>
//           {hasSubCourses && (
//             <div className="text-gray-400">
//               {expandedCategory === course.title ? <FiChevronDown /> : <FiChevronRight />}
//             </div>
//           )}
//           {!hasSubCourses && (
//             <button 
//               onClick={(e) => {
//                 e.stopPropagation();
//                 fetchCourseDetails(course.title);
//               }}
//               className="text-blue-500 hover:text-blue-700 p-1"
//               title="Learn more about this course"
//             >
//               <FiInfo size={16} />
//             </button>
//           )}
//         </div>

//         {hasSubCourses && expandedCategory === course.title && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="bg-gray-50 dark:bg-gray-600 px-4"
//           >
//             <div className="py-2 border-t border-gray-200 dark:border-gray-500">
//               {course.subMenu.map((subCourse) => (
//                 <div
//                   key={subCourse.title}
//                   className="py-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-500 rounded cursor-pointer flex items-center justify-between"
//                   onClick={() => handleCourseSelect(subCourse.title, true)}
//                 >
//                   <div className="flex items-center">
//                     <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900 flex items-center justify-center mr-2">
//                       <FiChevronRight className="text-blue-500 dark:text-blue-300 text-xs" />
//                     </div>
//                     <span className="text-sm">{subCourse.title}</span>
//                   </div>
//                   <button 
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       fetchCourseDetails(subCourse.title);
//                     }}
//                     className="text-blue-500 hover:text-blue-700 p-1"
//                     title="Learn more about this course"
//                   >
//                     <FiInfo size={16} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </motion.div>
//     );
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50">
//       <ToastContainer position="top-center" autoClose={3000} />
      
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: 20, scale: 0.9 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 20, scale: 0.9 }}
//             transition={{ type: "spring", damping: 20, stiffness: 300 }}
//             className="w-96 max-h-[600px] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl shadow-xl overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700"
//           >
//             <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white flex justify-between items-center">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
//                   <FiMessageSquare size={20} />
//                 </div>
//                 <div>
//                   <h3 className="font-bold">Course Assistant</h3>
//                   <p className="text-xs opacity-80">
//                     {isTyping ? "Typing..." : "Online"}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setOpen(false)}
//                 className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition"
//               >
//                 <FiX size={20} />
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto p-4 space-y-3">
//               {messages.map((msg, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className={`flex ${
//                     msg.from === "bot" ? "justify-start" : "justify-end"
//                   }`}
//                 >
//                   <div
//                     className={`max-w-xs lg:max-w-md rounded-lg p-3 ${
//                       msg.from === "bot"
//                         ? "bg-gray-100 dark:bg-gray-700 rounded-tl-none"
//                         : "bg-blue-500 text-white rounded-tr-none"
//                     }`}
//                   >
//                     {msg.text}
//                     {msg.options && msg.options.length > 0 && (
//                       <div className="mt-2 space-y-2">
//                         {msg.options.map((option, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => handleQuickReply(option)}
//                             className="block w-full text-left px-3 py-2 text-sm rounded bg-white bg-opacity-20 hover:bg-opacity-30 transition"
//                           >
//                             {option}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}

//               {step === "show_courses" && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-3 mt-3"
//                 >
//                   {courses.map(renderCourseCard)}
//                 </motion.div>
//               )}

//               {selectedCourseDetails && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-30 rounded-lg p-4 border border-blue-200 dark:border-blue-800"
//                 >
//                   <h4 className="font-bold text-lg mb-2 flex items-center">
//                     <FiInfo className="mr-2" />
//                     About {selectedCourseDetails.title}
//                   </h4>
//                   <div className="prose prose-sm dark:prose-invert max-w-none">
//                     <ReactMarkdown>{selectedCourseDetails.description}</ReactMarkdown>
//                   </div>
//                   <button
//                     onClick={() => {
//                       setUserInput(selectedCourseDetails.title);
//                       setSelectedCourseDetails(null);
//                     }}
//                     className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
//                   >
//                     Enroll in this course
//                   </button>
//                 </motion.div>
//               )}

//               {isTyping && (
//                 <div className="flex justify-start">
//                   <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 rounded-tl-none">
//                     <div className="flex space-x-1">
//                       <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
//                       <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
//                       <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {step !== "done" && (
//               <div className="p-3 border-t border-gray-200 dark:border-gray-700">
//                 <div className="flex items-center space-x-2">
//                   <input
//                     className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
//                     type="text"
//                     placeholder="Type your message..."
//                     value={userInput}
//                     onChange={(e) => setUserInput(e.target.value)}
//                     onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                   />
//                   <button
//                     onClick={handleSend}
//                     disabled={!userInput.trim()}
//                     className="p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                   >
//                     <FiSend size={18} />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <motion.button
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         onClick={() => setOpen(!open)}
//         className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-white ${
//           open ? "bg-red-500" : "bg-gradient-to-br from-blue-600 to-blue-400"
//         }`}
//       >
//         {open ? <FiX size={24} /> : <FiMessageSquare size={24} />}
//       </motion.button>
//     </div>
//   );
// };

// export default ChatBotWidget;


import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FiSend, FiX, FiMessageSquare } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

import useChatBotLogic from "./useChatBotLogic";
import ChatMessage from "./ChatMessage";
import CourseCard from "./CourseCard";
import CourseDetails from "./CourseDetails";

const ChatBotWidget = () => {
  const {
    open,
    setOpen,
    messages,
    userInput,
    setUserInput,
    isTyping,
    expandedCategory,
    selectedCourseDetails,
    messagesEndRef,
    courses,
    handleQuickReply,
    handleSend,
    toggleCategory,
    handleCourseSelect
  } = useChatBotLogic();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <ToastContainer position="top-center" autoClose={3000} />
      
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="w-96 max-h-[600px] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl shadow-xl overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                  <FiMessageSquare size={20} />
                </div>
                <div>
                  <h3 className="font-bold">Course Assistant</h3>
                  <p className="text-xs opacity-80">
                    {isTyping ? "Typing..." : "Online"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <ChatMessage 
                  key={i} 
                  msg={msg} 
                  handleQuickReply={handleQuickReply} 
                />
              ))}

              {/* Course Listing */}
              {expandedCategory && (
                <div className="space-y-3 mt-3">
                  {courses.map(course => (
                    <CourseCard
                      key={course.title}
                      course={course}
                      expandedCategory={expandedCategory}
                      toggleCategory={toggleCategory}
                      handleCourseSelect={handleCourseSelect}
                    />
                  ))}
                </div>
              )}

              {/* Course Details */}
              {selectedCourseDetails && (
                <CourseDetails 
                  details={selectedCourseDetails} 
                  onEnroll={() => {
                    setUserInput(selectedCourseDetails.title);
                    setSelectedCourseDetails(null);
                  }}
                />
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 rounded-tl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <input
                  className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                  type="text"
                  placeholder="Type your message..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                  onClick={handleSend}
                  disabled={!userInput.trim()}
                  className="p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <FiSend size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-white ${
          open ? "bg-red-500" : "bg-gradient-to-br from-blue-600 to-blue-400"
        }`}
      >
        {open ? <FiX size={24} /> : <FiMessageSquare size={24} />}
      </motion.button>
    </div>
  );
};

export default ChatBotWidget;