import React from 'react';
import Slider from 'react-slick';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';

const PrevArrow = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-all"
    aria-label="Previous"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <FiChevronLeft className="text-blue-700 dark:text-blue-400 text-xl" />
  </motion.button>
);

const NextArrow = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-all"
    aria-label="Next"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <FiChevronRight className="text-blue-700 dark:text-blue-400 text-xl" />
  </motion.button>
);

const testimonials = [
  {
    name: 'HARSHIT MANKAR',
    review: 'I enrolled in the Data Analytics course at Sapalogy Institute, Nagpur, and it was a game-changer for me. The instructors were knowledgeable, the curriculum was comprehensive, and the hands-on projects really enhanced my skills. I highly recommend it to anyone looking to delve into the world of data analytics.',
    image: '/path-to-image1.jpg',
    role: 'Data Analyst'
  },
  {
    name: 'AARYA YADAV',
    review: 'The Data Analytics course at Sapalogy Institute was a fantastic experience. The instructors were patient and always willing to help. The real-world applications and case studies made the concepts easy to grasp. I feel well-prepared to apply my skills in the professional arena.',
    image: '/path-to-image2.jpg',
    role: 'Business Intelligence Developer'
  },
  {
    name: 'AADVIK JAIN',
    review: 'Sapalogy Institute\'s Data Analytics course was worth every penny. The curriculum was up-to-date with industry standards, and the practical approach to learning made it enjoyable. The institute\'s support system is commendable, and I now feel confident in my ability to handle complex data analytics tasks.',
    image: '/path-to-image3.jpg',
    role: 'Data Scientist'
  },
  {
    name: 'PRIYA SHARMA',
    review: 'The course structure was perfect for beginners and intermediates alike. The mentors provided excellent guidance throughout the program, and the projects were challenging yet rewarding. I landed my dream job right after completing this course!',
    image: '/path-to-image4.jpg',
    role: 'Data Engineer'
  },
  {
    name: 'RAHUL VERMA',
    review: 'What impressed me most was the practical orientation of the course. We worked with real datasets and tools used in the industry. The career support team was also very helpful in preparing me for interviews and resume building.',
    image: '/path-to-image5.jpg',
    role: 'Analytics Consultant'
  }
];

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  // Animation variants
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      {/* Animated background elements - light version */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 dark:opacity-5 transition-opacity duration-300">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-300 dark:bg-blue-600"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(40px)'
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            What Our Students Say
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg transition-colors duration-300">
            Hear from our alumni about their learning experiences and career transformations
          </p>
        </motion.div>

        <div className="relative">
          <Slider {...settings}>
            {testimonials.map((item, index) => (
              <div key={index} className="px-3">
                <motion.div
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl px-6 pt-16 pb-8 text-center relative shadow-lg h-full min-h-[400px] flex flex-col transition-colors duration-300"
                  whileHover={{ 
                    y: -10,
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardVariants}
                >
                  {/* Image with smooth cut effect */}
                  <div className="absolute left-1/2 -top-12 transform -translate-x-1/2">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden transition-colors duration-300"
                      style={{
                        clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)'
                      }}
                    >
                      <div className="w-full h-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          item.name.charAt(0)
                        )}
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="flex-grow flex flex-col">
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <motion.span 
                          key={i} 
                          className="text-yellow-400 text-xl"
                          whileHover={{ scale: 1.2 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          ★
                        </motion.span>
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow line-clamp-5 transition-colors duration-300">
                      "{item.review}"
                    </p>
                    <div className="mt-auto">
                      <h4 className="font-bold text-blue-700 dark:text-blue-400 text-lg transition-colors duration-300">
                        {item.name}
                      </h4>
                      <p className="text-blue-600 dark:text-blue-300 text-sm transition-colors duration-300">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;