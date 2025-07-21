import { useState } from "react";
import { Search, Volume2 } from "lucide-react";

export default function Panel9({ data }) {
  const [openIndex, setOpenIndex] = useState(null);

  // Split FAQs into two columns
  const faqsLeft = data?.faqs?.filter((_, idx) => idx % 2 === 0);
  const faqsRight = data?.faqs?.filter((_, idx) => idx % 2 !== 0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4">
        {/* Heading */}
        <div className="flex items-center justify-between mb-8">
          <Search className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-700 dark:text-indigo-300 text-center flex-grow">
            {data?.heading}
          </h2>
          <Volume2 className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {[faqsLeft, faqsRight].map((column, colIdx) => (
            <div key={colIdx} className="space-y-4">
              {column.map((item, i) => {
                const actualIndex = colIdx === 0 ? i * 2 : i * 2 + 1;
                const isOpen = openIndex === actualIndex;

                return (
                  <div
                    key={actualIndex}
                    onClick={() => toggle(actualIndex)}
                    className="bg-indigo-50 dark:bg-indigo-800 text-indigo-900 dark:text-white rounded-xl p-5 shadow-sm cursor-pointer transition-all hover:bg-indigo-100 dark:hover:bg-indigo-700"
                  >
                    <div className="flex justify-between items-center font-medium text-base">
                      {item.question}
                      <span className="text-xl">
                        {isOpen ? "−" : "+"}
                      </span>
                    </div>
                    {isOpen && (
                      <p className="mt-2 text-sm text-gray-700 dark:text-indigo-100">
                        {item.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
