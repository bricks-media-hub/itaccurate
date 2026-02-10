import React from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { SafeImage } from "../../lib/SafeImage";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OfferLetters = ({ letters = [], reviews = [] }) => {
  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <section
      aria-label="Placed students and offer letters"
      className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-center gap-8">
        {/* LEFT: Students placed + slider */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/3 flex flex-col items-center lg:items-center text-center lg:text-left gap-6"
        >
          <div className="flex flex-col items-center lg:items-center gap-4">
            <SafeImage
              src="/icons/small-logo.svg"
              alt="IT Accurate logo"
              className="w-10 h-10 sm:w-14 sm:h-14"
            />

            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
              Students Placed By{" "}
              <span className="text-blue-600">IT ACCURATE</span>
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm">
              Our students have successfully landed roles across industries.
              Below are a few placed students.
            </p>
          </div>

          {/* Student slider: one student per slide, image left, text right */}
          <div className="w-full mt-2 hidden lg:block">
            <Slider {...sliderSettings} className="">
              {reviews?.length ? (
                reviews.map((student, i) => (
                  <div
                    key={student?.id ?? i}
                    className="flex flex-row items-center gap-4 justify-center p-2 min-h-[84px] ml-36"
                  >
                    <div>
                      <SafeImage
                        src={student?.image || "/icons/profile-user.svg"}
                        alt={student?.name || "Student"}
                        className="flex-shrink-0 w-20 h-20 sm:w-28 sm:h-28 rounded-full border-2 border-blue-500 object-cover cursor-pointer"
                        draggable={false}
                      />
                    </div>

                    <div className="flex flex-col justify-center">
                      <span className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200">
                        {student?.name.toUpperCase()}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        {student?.role}
                      </span>
                    </div>
                  </div>
                ))
              ) : ( 
                null
              )}
            </Slider>
          </div>
        </motion.div>

        {/* RIGHT: Description + Marquee of offer letters */}
        <div className="w-full lg:w-2/3 flex flex-col items-center lg:items-start gap-6">
          {/* Static heading & description */}
          <div className="w-full px-2 lg:px-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">
              See Our Placed Students' Offer Letters
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 max-w-3xl">
              Our alumni have received offers from startups and established
              companies — browse a selection of anonymized offer letters below
              to get a feel for outcomes.
            </p>
          </div>

          {/* Marquee */}
          <div className="relative w-full">
            <Marquee gradient={false} speed={60} className="py-3 sm:py-6">
              {letters?.length ? (
                letters.map((letter, idx) => (
                  <motion.div
                    key={letter?.id ?? idx}
                    className="flex justify-center items-center px-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06, duration: 0.45 }}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-md shadow-md border border-gray-200 dark:border-gray-700 h-52 sm:h-80 md:h-80 w-40 sm:w-56 md:w-72 p-2 overflow-hidden">
                      <SafeImage
                        src={letter?.src}
                        alt={letter?.alt || `Offer Letter ${idx + 1}`}
                        className="w-full h-full object-cover rounded-sm"
                        draggable={false}
                      />
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="px-4">No offer letters to display</div>
              )}
            </Marquee>

            {/* Fade overlays (left/right) */}
            <div className="pointer-events-none absolute top-0 left-0 h-full w-12 sm:w-16 bg-gradient-to-r from-blue-50 dark:from-gray-900 to-transparent z-10" />
            <div className="pointer-events-none absolute top-0 right-0 h-full w-12 sm:w-16 bg-gradient-to-l from-blue-50 dark:from-gray-900 to-transparent z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferLetters;
