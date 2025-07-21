import React from "react";

function Panel5({ data, imageUrl }) {
  return (
      <div
        className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-10 px-6 md:px-16 pt-24">
      <section className="flex justify-center md:justify-end w-full md:w-1/2">
        <img
          src={imageUrl}
          alt="Course"
          className="max-h-[640px] w-full max-w-lg sm:max-w-xl md:max-w-2xl object-contain"
        />
      </section>
      <section className="w-full md:w-1/2 space-y-6 text-center md:text-left">
        <h1
          className="text-3xl md:text-4xl font-bold text-indigo-700 dark:text-indigo-400 text-balance"
          dangerouslySetInnerHTML={{ __html: data?.heading }}
        />
          <p
            className="text-gray-700 dark:text-gray-300 text-md sm:text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data?.content[0] }}
          />
          <br />
          <p
            className="text-gray-700 dark:text-gray-300 text-md sm:text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data?.content[1] }}
          />
        <div className="flex justify-center md:justify-start gap-4 pt-2">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300 shadow-md"
            onClick={() => setShowForm(true)}
          >
            Query Now
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300 shadow-md"
            onClick={() => setShowForm(true)}
          >
            Apply Now
          </button>
        </div>
      </section>
    </div>
  );
}

export default Panel5;
