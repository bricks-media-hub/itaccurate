import React from "react";
import SAPHighlightSection from "./SapHighlightSection";

const Panel3 = ({ data }) => {
  console.log(data);
  return (
<>
<section className="mt-7 px-4 md:px-8 lg:px-16 py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 dark:text-indigo-400 mb-4">
          {data?.heading}
        </h2>
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg mb-6">
          {data?.description}
        </p>

        {/* Grid for Modules */}
        <div className="flex flex-wrap justify-center gap-6">
          {data?.modules.map((module, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-8 w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] 
             rounded-xl border border-indigo-100 dark:border-indigo-900 
             bg-indigo-50 dark:bg-gray-800 
             hover:bg-indigo-500 dark:hover:bg-indigo-700/50 
             transition-all duration-300 shadow-lg hover:shadow-2xl 
             transform hover:-translate-y-2 group"
            >
              {/* Icon Container */}
              <div className="flex items-center justify-center rounded-full bg-white dark:bg-gray-700 shadow-lg p-5 mb-6">
                <div
                  className="p-4 rounded-full border group-hover:border-0 border-blue-700 bg-white dark:bg-gray-700 shadow-sm 
                     group-hover:bg-indigo-500 dark:group-hover:bg-indigo-900/50
                     transition-colors duration-300"
                >
                  <img
                    src={module.icon}
                    alt="icon"
                    className="h-12 w-12 text-indigo-600 dark:text-indigo-400"
                  />
                </div>
              </div>

              <h3
                className="text-xl font-semibold text-indigo-800 dark:text-indigo-100 mb-3 text-center
                     group-hover:text-indigo-100 dark:group-hover:text-white"
              >
                {module?.title}
              </h3>
              <p
                className="text-indigo-600/80 dark:text-indigo-300/80 text-sm text-center leading-relaxed
                   group-hover:text-indigo-100 dark:group-hover:text-white"
              >
                {module?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-7 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <p
            className="text-gray-700 dark:text-gray-200 text-base md:text-lg"
            dangerouslySetInnerHTML={{ __html: data?.footerNote }}
          />
        </div>
      </div>
    </section>
    <div>
        <SAPHighlightSection />
    </div>
</>
  );
};

export default Panel3;
