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

// const testimonials = [
//   {
//     name: 'HARSHIT MANKAR',
//     review: 'I enrolled in the Data Analytics course at Sapalogy Institute, Nagpur, and it was a game-changer for me. The instructors were knowledgeable, the curriculum was comprehensive, and the hands-on projects really enhanced my skills. I highly recommend it to anyone looking to delve into the world of data analytics.',
//     image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80',
//     role: 'Data Analyst'
//   },
//   {
//     name: 'AARYA YADAV',
//     review: 'The Data Analytics course at Sapalogy Institute was a fantastic experience. The instructors were patient and always willing to help. The real-world applications and case studies made the concepts easy to grasp. I feel well-prepared to apply my skills in the professional arena.',
//     image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80',
//     role: 'Business Intelligence Developer'
//   },
//   {
//     name: 'AADVIK JAIN',
//     review: 'Sapalogy Institute\'s Data Analytics course was worth every penny. The curriculum was up-to-date with industry standards, and the practical approach to learning made it enjoyable. The institute\'s support system is commendable, and I now feel confident in my ability to handle complex data analytics tasks.',
//     image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80',
//     role: 'Data Scientist'
//   },
//   {
//     name: 'PRIYA SHARMA',
//     review: 'The course structure was perfect for beginners and intermediates alike. The mentors provided excellent guidance throughout the program, and the projects were challenging yet rewarding. I landed my dream job right after completing this course!',
//     image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80',
//     role: 'Data Engineer'
//   },
//   {
//     name: 'RAHUL VERMA',
//     review: 'What impressed me most was the practical orientation of the course. We worked with real datasets and tools used in the industry. The career support team was also very helpful in preparing me for interviews and resume building.',
//     image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80',
//     role: 'Analytics Consultant'
//   }
// ];

const TestimonialSlider = ({ reviews }) => {
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
  // const cardVariants = {
  //   offscreen: {
  //     y: 50,
  //     opacity: 1,
  //   },
  //   onscreen: {
  //     y: 0,
  //     opacity: 1,
  //     transition: {
  //       type: "spring",
  //       bounce: 0.4,
  //       duration: 0.8
  //     }
  //   }
  // };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-20 px-4 sm:px-6 lg:px-8 relative transition-colors duration-300">

      <div className="max-w-7xl mx-auto">
        {/* header part */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            <span className="bg-black bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
              What Our <span className='text-blue-600'>Students</span> Say
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg md:text-xl transition-colors duration-300">
            Hear from our alumni about their learning experiences and career transformations
          </p>
        </motion.div>

        {/* main cards and content part */}
        <div className="relative">
          <Slider {...settings}>
            {reviews.map((item, index) => (
              <div key={index} className="px-3">
                <motion.div
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl px-6 pt-16 pb-8 text-center shadow-lg h-full min-w-[400px] flex flex-col transition-all duration-300 hover:shadow-xl relative overflow-visible cursor-pointer " // Added overflow-visible
                  whileHover={{
                    y: -10,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.2 }}
                // variants={cardVariants}
                >
                  {/* Perfectly circular image with proper display */}
                  <div className="absolute left-1/2 -top-3 -translate-x-1/2 z-[60]">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-visible transition-all duration-300"
                    >
                      <div className="absolute w-full h-full">
                        <div className="absolute inset-0 rounded-full p-1 bg-gradient-to-r from-blue-500 to-indigo-600">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full rounded-full object-cover border-2 border-white dark:border-gray-800"
                            style={{
                              objectPosition: 'center',
                              width: 'calc(100% - 4px)',
                              height: 'calc(100% - 4px)',
                              margin: '2px'
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="flex flex-col p-4">
                    {/* Rating Stars */}

                    <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-5 transition-colors duration-300 italic text-center">
                      "{item.review}"
                    </p>
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-bold text-blue-700 dark:text-blue-400 text-lg transition-colors duration-300">
                          {item.name}
                        </h4>
                        <p className="text-blue-600 dark:text-blue-300 text-sm transition-colors duration-300">
                          {item.role}
                        </p>
                      </div>
                      <div className="">
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
                    </div>
                  </div>

                  {/* Decorative quote marks */}
                  {/* <div className="absolute -top-2 left-6 text-gray-700 dark:text-blue-900 text-5xl opacity-30">
                    "
                  </div>
                  <div className="absolute bottom-10 right-6 text-gray-700 dark:text-blue-900 text-5xl opacity-30">
                    "
                  </div> */}
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Trust indicators */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap justify-center gap-8 items-center"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">200+</div>
            <div className="text-gray-600 dark:text-gray-300">Students Trained</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">95%</div>
            <div className="text-gray-600 dark:text-gray-300">Placement Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">4.9/5</div>
            <div className="text-gray-600 dark:text-gray-300">Average Rating</div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default TestimonialSlider;