import React from 'react';
import Slider from 'react-slick';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-black bg-clip-text text-transparent dark:bg-white">
              What Our <span className="text-blue-600">Students</span> Say
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg md:text-xl">
            Hear from our alumni about their learning experiences and career transformations
          </p>
        </motion.div>

        {/* Slider */}
        <Slider {...settings}>
          {reviews.map((item, index) => (
            <div key={index} className="px-2">
              <div className="relative flex flex-col items-center pt-20 sm:pt-24 pb-10">
                {/* Avatar */}
                <div className="absolute top-8 sm:top-4 z-10">
                  <img
                    src={item.image === 'default' ? '/icons/profile-user.svg' : item.image}
                    alt={item.name}
                    className="w-32 h-32 sm:w-44 sm:h-44 object-cover rounded-full dark:border-gray-800"
                  />
                </div>

                {/* Card */}
                <motion.div
                  initial={{ y: -5 }}
                  animate={{ y: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl px-6 pt-28 pb-10 text-center shadow-lg min-h-[320px] sm:min-h-[360px] flex flex-col justify-between relative overflow-visible"
                >
                  {/* Curved Cut-out to simulate bounce */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-white dark:bg-gray-800 rounded-b-full z-0"></div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                    "{item.review}"
                  </p>

                  <div className="flex justify-between items-center mt-auto">
                    <div className="text-left">
                      <h4 className="font-bold text-blue-700 dark:text-blue-400 text-lg">{item.name.toUpperCase()}</h4>
                      <p className="text-blue-600 dark:text-blue-300 text-sm">{item.role}</p>
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.span
                          key={i}
                          className="text-yellow-400 text-lg"
                          whileHover={{ scale: 1.2 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          ★
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Decorative Quote Marks */}
                  <div className="absolute -top-5 left-4 bg-slate-300 dark:bg-slate-500 rounded-full h-10 w-10 flex items-center justify-center">
                    <RiDoubleQuotesL className="text-gray-500 dark:text-blue-900 text-xl" />
                  </div>
                  <div className="absolute -bottom-5 right-4 bg-slate-300 dark:bg-slate-500 rounded-full h-10 w-10 flex items-center justify-center">
                    <RiDoubleQuotesR className="text-gray-500 dark:text-blue-900 text-xl" />
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialSlider;
