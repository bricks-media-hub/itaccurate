import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 transition-all transform hover:scale-110"
    aria-label="Next"
  >
    <FiChevronRight className="text-blue-600 text-xl" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 transition-all transform hover:scale-110"
    aria-label="Previous"
  >
    <FiChevronLeft className="text-blue-600 text-xl" />
  </button>
);

export default function Projects({ projects, name }) {
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

  const filteredProjects = projects.slice(1);

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-blue-600">{name}</span> Projects
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto leading-relaxed">
            Explore our innovative data-driven solutions that enhance business intelligence and transform customer experiences.
          </p>
        </div>

        <div className="relative px-6">
          <Slider {...settings}>
            {filteredProjects.map((project, index) => (
              <div key={index} className="px-3 py-2 h-full focus:outline-none">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-[420px] p-6 flex flex-col border border-gray-100 hover:border-blue-100 group">
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                      Case Study {index + 1}
                    </span>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl group-hover:from-blue-100 group-hover:to-blue-200 transition-all">
                      <div className="text-blue-600 text-2xl" dangerouslySetInnerHTML={{ __html: projects[0]?.icon }} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {project.detail}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
