import React from 'react';
import Slider from 'react-slick';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri';

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
          <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            <span className="bg-black bg-clip-text text-transparent dark:bg-white text-black">
              What Our <span className='text-blue-600'>Students</span> Say
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg md:text-xl transition-colors duration-300">
            Hear from our alumni about their learning experiences and career transformations
          </p>
        </motion.div>

        {/* main cards and content part */}
        <div className="">
          <Slider {...settings}>
            {reviews.map((item, index) => (
              <div className='flex flex-col -mt-16'>
                <div className='h-32 w-32 rounded-full relative top-16 left-40 z-50 border-2'>
                  <img 
                  src={item.image} 
                  alt={item.role} 
                  className='rounded-full object-contain p-1'
                  />
                </div>
              <div key={index} className="px-3">
                <motion.div
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl px-6 pt-16 pb-8 text-center shadow-lg h-full min-w-[400px] flex flex-col transition-all duration-300 hover:shadow-xl relative overflow-visible cursor-pointer mb-5"
                  whileHover={{
                    y: -10,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.2 }}
                >
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
                   <div className="flex justify-center items-center absolute -top-5 left-6 bg-slate-300 dark:bg-slate-500 rounded-full h-12 w-12">
                    <RiDoubleQuotesL className='h-10 w-10 text-gray-500 dark:text-blue-900' />
                  </div>
                  <div className="flex justify-center items-center absolute -bottom-5 right-6 bg-slate-300 dark:bg-slate-500 rounded-full h-12 w-12">
                    <RiDoubleQuotesR className='h-10 w-10 text-gray-500 dark:text-blue-900' />
                  </div> 
                </motion.div>
              </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;

// this i ii this wi ifh he is trying to start new project and gpt is writing new things