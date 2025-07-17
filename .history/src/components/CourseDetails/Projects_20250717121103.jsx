import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition-all transform hover:scale-110"
    aria-label="Next"
  >
    <FiChevronRight className="text-blue-600 dark:text-blue-400 text-xl" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition-all transform hover:scale-110"
    aria-label="Previous"
  >
    <FiChevronLeft className="text-blue-600 dark:text-blue-400 text-xl" />
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

  const fallbackColors = [
    'bg-gradient-to-br from-blue-900 to-blue-700',
    'bg-gradient-to-br from-purple-900 to-blue-800',
    'bg-gradient-to-br from-teal-900 to-blue-600',
    'bg-gradient-to-br from-indigo-900 to-purple-700'
  ];

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-black py-24 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="text-blue-600 dark:text-blue-400">{name}</span> Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto leading-relaxed">
            Explore our innovative data-driven solutions that enhance business intelligence and transform customer experiences.
          </p>
        </div>

        <div className="relative px-6">
          <Slider {...settings}>
            {filteredProjects.map((project, index) => (
              <div key={index} className="px-3 py-2 h-full focus:outline-none">
                <div className="relative rounded-xl overflow-hidden shadow-xl dark:shadow-slate-800 hover:shadow-2xl dark:hover:shadow-slate-700 transition-all duration-300 h-[420px] group">
                  {/* Background with fallback */}
                  <div className={`absolute inset-0 ${fallbackColors[index % fallbackColors.length]}`}>
                    {project.image && (
                      <img
                        src={project.images}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent dark:from-black/90 dark:via-black/50" />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-6">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold uppercase tracking-wider text-white bg-blue-600/90 px-3 py-1.5 rounded-full">
                        Case Study {index + 1}
                      </span>
                      <div className="bg-white/90 dark:bg-slate-800 p-2 rounded-lg">
                        {/* <div
                          className="text-blue-600 dark:text-blue-400 text-xl"
                          dangerouslySetInnerHTML={{ __html: projects[0]?.icon }}
                        /> */}
                        <img src={projects[0]?.icon} alt="icon" className='w-10 h-10'/>
                      </div>
                    </div>

                    <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                      <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-gray-200 dark:text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">
                        {project.detail}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.technologies?.map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs font-medium text-blue-100 bg-blue-900/40 dark:bg-blue-700/50 px-2.5 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      {project.link && (
                        <a
                          href={project.link}
                          className="mt-4 inline-block text-sm font-medium text-white hover:text-blue-200 dark:hover:text-blue-300 transition-colors"
                        >
                          View Project →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
