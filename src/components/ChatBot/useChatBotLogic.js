import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import config from "../../lib/config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { GetCourseAbout } from "../../api/fetchComponentData";

// Helper function to find courses
const findCourseByQuery = (courses, query) => {
  query = query.toLowerCase().trim();
  
  // First check exact matches
  for (const category of courses) {
    if (category.title.toLowerCase() === query) {
      return { title: category.title, isSubCourse: false };
    }
    if (category.subMenu) {
      for (const subCourse of category.subMenu) {
        if (subCourse.title.toLowerCase() === query) {
          return { title: subCourse.title, isSubCourse: true };
        }
      }
    }
  }
  
  // Then check partial matches
  for (const category of courses) {
    if (category.title.toLowerCase().includes(query)) {
      return { title: category.title, isSubCourse: false };
    }
    if (category.subMenu) {
      for (const subCourse of category.subMenu) {
        if (subCourse.title.toLowerCase().includes(query)) {
          return { title: subCourse.title, isSubCourse: true };
        }
      }
    }
  }
  
  return null;
};

const useChatBotLogic = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      from: "bot", 
      text: "👋 Hey there! I'm here to help you find the perfect course. How can I assist you today?",
      options: ["Browse courses", "Help me choose", "Ask a question"]
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [step, setStep] = useState("intro");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    course: "",
    location: "",
  });
  const [isTyping, setIsTyping] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);
  const messagesEndRef = useRef(null);
  const courses = useSelector((state) => state.navbar.menuItems);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, expandedCategory, selectedCourseDetails]);

  const validateStep = useCallback((field, value) => {
    if (!value.trim()) return "This field is required.";
    if (field === "phone" && !/^\d{10}$/.test(value))
      return "Please enter a valid 10-digit phone number.";
    return null;
  }, []);

  const addBotMessage = useCallback((text, options = []) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { from: "bot", text, options }]);
      setIsTyping(false);
    }, 800);
  }, []);

  const toggleCategory = useCallback((categoryTitle) => {
    setExpandedCategory(prev => prev === categoryTitle ? null : categoryTitle);
    setSelectedCourseDetails(null);
  }, []);

  const fetchCourseDetails = useCallback(async (courseTitle) => {
    try {
      setIsTyping(true);
      
      const points = await GetCourseAbout(courseTitle);
      if (points && points.length > 0) {
        const markdownList = points.map(point => `- ${point}`).join('\n');
        setSelectedCourseDetails({
          title: courseTitle,
          description: markdownList
        });
      } else {
        addBotMessage(`I'd love to tell you more about ${courseTitle}, but I don't have the full details right now. Would you like me to connect you with a course advisor?`, 
          ["Yes, connect me", "Browse other courses"]);
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
      addBotMessage("Hmm, I'm having trouble accessing the course details at the moment. Would you like to try another course or ask something else?");
    } finally {
      setIsTyping(false);
    }
  }, [addBotMessage]);

  const handleSend = useCallback(async () => {
    if (!userInput.trim()) return;

    const input = userInput.trim();
    setMessages(prev => [...prev, { from: "user", text: input }]);
    setUserInput("");
    setSelectedCourseDetails(null);

    let nextStep = step;

    // Handle course info requests
    const infoMatch = /(tell me about|what is|info about|explain|details on|learn more about|describe|information on) (.+)/i.exec(input);
    if (infoMatch && infoMatch[2]) {
      const courseQuery = infoMatch[2].trim();
      const courseMatch = findCourseByQuery(courses, courseQuery);
      
      if (courseMatch) {
        fetchCourseDetails(courseMatch.title);
        return;
      } else {
        addBotMessage(`I'm not sure about "${courseQuery}". Could you clarify which course you're interested in? Or type "show courses" to see our offerings.`);
        return;
      }
    }

    // Handle course browsing requests
    if (/(courses|list|offer|show me|browse)/i.test(input)) {
      nextStep = "show_courses";
      addBotMessage("Sure! Here are the courses we offer:");
      setExpandedCategory("all");
    }

    // Conversation flow
    switch (step) {
      case "intro":
        if (/(yes|please|sure|ok|start)/i.test(input)) {
          const responses = [
            "Awesome! Let's get started 🤝",
            "Great choice! Let's begin 😊",
            "Perfect! Let's find your ideal course 👍"
          ];
          addBotMessage(responses[Math.floor(Math.random() * responses.length)]);
          addBotMessage("First, what should I call you?");
          nextStep = "name";
        } else if (/(no|not now|later)/i.test(input)) {
          addBotMessage("No problem! I'll be here when you're ready. Just say 'Hi' whenever you need help 👋");
          nextStep = "done";
        } else {
          addBotMessage("I'm here to help with course information. Would you like to explore our offerings?", 
            ["Yes, show courses", "Maybe later"]);
        }
        break;

      case "name": {
        const error = validateStep("name", input);
        if (error) {
          addBotMessage(error);
          return;
        }
        setFormData(f => ({ ...f, name: input }));
        addBotMessage(`Nice to meet you, ${input}! 😊`);
        addBotMessage("Can I have your phone number so we can contact you?", ["Skip for now"]);
        nextStep = "phone";
        break;
      }

      case "phone": {
        if (/skip/i.test(input.toLowerCase())) {
          addBotMessage("No problem! We'll contact you via email then.");
          nextStep = "location";
          break;
        }
        
        const error = validateStep("phone", input);
        if (error) {
          addBotMessage(error);
          return;
        }
        setFormData(f => ({ ...f, phone: input }));
        addBotMessage("Thanks! Where are you from?");
        nextStep = "location";
        break;
      }

      case "location": {
        const error = validateStep("location", input);
        if (error) {
          addBotMessage(error);
          return;
        }
        setFormData(f => ({ ...f, location: input }));
        addBotMessage("Perfect! Now, which course would you like to enroll in?");
        nextStep = "course";
        break;
      }

      case "course": {
        const error = validateStep("course", input);
        if (error) {
          addBotMessage(error);
          return;
        }

        const finalData = { ...formData, course: input };
        setFormData(finalData);
        addBotMessage("Awesome! Submitting your details now... 🔄");

        try {
          const web3Res = await axios.post(
            "https://api.web3forms.com/submit",
            {
              access_key: "fabb3cfb-5cb8-4f83-81ae-b1c5caf0797a",
              subject: "New Contact Form Submission",
              from_name: "Sapalogy Training",
              recipient_email: "shivanihiware77@gmail.com",
              ...finalData,
            },
            { headers: { "Content-Type": "application/json" } }
          );

          if (web3Res.data.success) {
            const dbRes = await axios.post(config.apiUrl, finalData, {
              headers: { "Content-Type": "application/json" },
            });

            if (dbRes.data.success) {
              addBotMessage("✅ All set! We've received your info and will reach out shortly.");
              toast.success("Form submitted successfully!");
            } else {
              addBotMessage("⚠️ Info submitted to Web3Forms, but saving to DB failed.");
              toast.warn("Saved to Web3Forms, but DB failed.");
            }
          } else {
            addBotMessage("❌ Web3Forms submission failed.");
            toast.error("Web3Forms submission failed.");
          }
        } catch (err) {
          console.error("Submission Error:", err);
          addBotMessage("❌ Something went wrong while submitting.");
          toast.error("Something went wrong while submitting.");
        }

        nextStep = "done";
        break;
      }

      case "show_courses":
        addBotMessage("Here are the courses we offer:");
        nextStep = "course_selection";
        break;

      case "course_selection":
        setFormData(f => ({ ...f, course: input }));
        addBotMessage(`Great choice! You've selected ${input}.`);
        addBotMessage("May I know your name to proceed?");
        nextStep = "name";
        break;
      
      default:
        if (/hi|hello|start/i.test(input)) {
          const greetings = [
            "👋 Welcome back! Ready to explore courses?",
            "Hello again! How can I assist you today?",
            "Hi there! What can I help you with?"
          ];
          addBotMessage(greetings[Math.floor(Math.random() * greetings.length)]);
          nextStep = "intro";
        } else {
          addBotMessage("I'm here if you need anything else. Just say 'Hi' to start again 👋");
        }
        break;
    }

    setStep(nextStep);
  }, [step, userInput, courses, addBotMessage, fetchCourseDetails, validateStep, formData]);

  const handleQuickReply = useCallback((reply) => {
    setUserInput(reply);
    handleSend();
  }, []);

  const handleCourseSelect = useCallback((courseTitle, isSubCourse = false) => {
    // Handle course info requests
    const infoPhrases = [
      'tell me about', 'what is', 'info about', 
      'explain', 'details on', 'learn more about',
      'describe', 'information on'
    ];
    
    const isInfoRequest = infoPhrases.some(phrase => 
      userInput.toLowerCase().includes(phrase)
    );
    
    if (isInfoRequest) {
      fetchCourseDetails(courseTitle);
      return;
    }

    // Normal selection flow
    if (isSubCourse || !courses.find(c => c.title === courseTitle)) {
      setUserInput(courseTitle);
      handleSend();
    } else {
      toggleCategory(courseTitle);
    }
  }, [userInput, courses, fetchCourseDetails, handleSend, toggleCategory]);



  return {
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
  };
};

export default useChatBotLogic;