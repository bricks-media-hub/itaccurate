import React, { useState } from "react";
import FreeDemoForm from "../components/ContactUs/FreeDemoForm";
import Stats from "../components/Career/Stats";

function Panel1({
  data,
  showImage = true,
  imageUrl = "/icons/corporate-training.png",
  showButtons = true,
  reverseLayout = false,
  showStats = true,
  isLoading = false,
}) {
  const [showForm, setShowForm] = useState(false);

  if (!data && !isLoading) return null;

  return (
    <>
      {showForm && <FreeDemoForm onClose={() => setShowForm(false)} />}

      <div
        className={`max-w-7xl mx-auto flex flex-col md:flex-row ${
          reverseLayout ? "md:flex-row-reverse" : ""
        } justify-center items-center gap-10 mt-10 px-6 md:px-16 pt-16`}
      >
        {/* Image */}
        {showImage && (
          <section className="flex justify-center md:justify-end w-full md:w-1/2">
            {isLoading ? (
              <div className="min-h-[400px] w-full max-w-lg bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"></div>
            ) : (
              <img
                src={imageUrl}
                alt="Course"
                className="max-h-[640px] w-full max-w-lg sm:max-w-xl md:max-w-2xl object-contain"
              />
            )}
          </section>
        )}

        {/* Content */}
        <section
          className={`w-full ${
            showImage ? "md:w-1/2" : "md:w-2/3"
          } space-y-6 text-center md:text-left`}
        >
          {isLoading ? (
            <>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-3/4 mx-auto md:mx-0"></div>
              <div className="space-y-4">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
              </div>
              {showButtons && (
                <div className="flex justify-center md:justify-start gap-4 pt-6">
                  <div className="h-12 w-32 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                  <div className="h-12 w-32 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                </div>
              )}
            </>
          ) : (
            <>
              <h1
                className="text-3xl md:text-4xl font-bold text-indigo-700 dark:text-indigo-400 text-balance"
                dangerouslySetInnerHTML={{ __html: data?.heading }}
              />
              <p
                className="text-gray-700 dark:text-gray-300 text-md sm:text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: data?.content }}
              />
              {showButtons && (
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
              )}
            </>
          )}
        </section>
      </div>

      {showStats && (
        <div className="pt-16 -mb-14">
          {isLoading ? (
            <div className="h-40 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"></div>
          ) : (
            <Stats />
          )}
        </div>
      )}
    </>
  );
}

export default Panel1;
