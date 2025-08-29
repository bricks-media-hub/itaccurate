import { useState } from 'react';
import FreeDemoForm from "../ContactUs/FreeDemoForm"
import { SafeImage } from '../../lib/SafeImage';

const FAQSection = ({ faqs = [] }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFAQs = Array.isArray(faqs) 
    ? faqs.filter(faq => {
        const question = String(faq?.question || '');
        const answer = String(faq?.answer || '');
        return (
          question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          answer.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* FAQ Section */}
        <div className="lg:w-2/3">
          <div className="text-center lg:text-left mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-900 dark:text-white mb-4">Frequently Asked Questions</h1>
            <div className="relative max-w-md mx-auto lg:mx-0">
              <input
                type="text"
                placeholder="Search question here"
                className="w-full px-6 py-3 rounded-full border-2 border-indigo-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:border-indigo-500 focus:outline-none shadow-lg transition-all duration-300 hover:shadow-xl focus:shadow-2xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute right-4 top-3.5 h-6 w-6 text-indigo-400 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-6">
            {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ${activeIndex === index ? 'ring-2 ring-indigo-500 dark:ring-indigo-400' : ''}`}
              >
                <button
                  className={`w-full px-6 py-5 text-left flex justify-between items-center transition-all duration-300 ${activeIndex === index ? 'bg-indigo-50 dark:bg-gray-800' : 'hover:bg-indigo-50 dark:hover:bg-gray-800'}`}
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold text-indigo-900 dark:text-white">
                    {faq?.question || 'No question provided'}
                    </h3>
                  <svg
                    className={`h-6 w-6 transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : 'text-indigo-400 dark:text-gray-400'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="prose prose-indigo dark:prose-invert">
                    <p className="text-gray-700 dark:text-gray-300">
                      {faq?.answer || 'No answer provided'}
                      </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No result */}
          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-block p-4 bg-indigo-100 dark:bg-gray-800 rounded-full mb-4">
                <svg className="h-12 w-12 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700 dark:text-white mb-2">No results found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try searching with different keywords</p>
            </div>
          )}
        </div>

        {/* Right Side Illustration */}
        {
          showForm && <FreeDemoForm onClose={() => setShowForm(false)} title1={"Claim Your Spot Today"} title2={"Request a Callback"}/> 
        }
        <div className="hidden lg:block lg:w-1/3 relative">
          <div className="sticky top-24">
            <div className="relative group">
              <SafeImage
                src="./faq.jpg"
                alt="FAQ Illustration"
                className="w-full h-auto rounded-2xl transform transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute -inset-4 bg-indigo-100 dark:bg-gray-700 rounded-2xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -inset-6 bg-indigo-200 dark:bg-gray-600 rounded-2xl -z-20 opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            </div>
            <div className="mt-6 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-indigo-900 dark:text-white mb-2">Need more help?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Can't find what you're looking for? Our team is happy to help!</p>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-full font-medium transition-colors duration-300 shadow-md hover:shadow-lg" onClick={() => setShowForm(true)}>
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default FAQSection;