import { useState, useEffect } from 'react';

const Counter = ({ endValue }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const incrementTime = 30;
        const increment = endValue / (duration / incrementTime);

        const timer = setInterval(() => {
            start += increment;
            if (start >= endValue) {
                setCount(endValue);
                clearInterval(timer);
            } else {
                setCount(Math.ceil(start));
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [endValue]);

    return <span>{count}</span>;
};

const AboutUs = () => {
    const stats = [
        { label: 'Qualified Trainers', value: 92, icon: '👨‍🏫', color: 'from-blue-500 to-blue-300' },
        { label: 'Live Classes Per Month', value: 250, icon: '📅', color: 'from-purple-500 to-purple-300' },
        { label: 'Global Accreditations', value: 120, icon: '🌎', color: 'from-green-500 to-green-300' },
        { label: 'Courses', value: 10, icon: '📚', color: 'from-yellow-500 to-yellow-300' },
    ];

    const courses1 = ['SAP', 'Salesforce Training', 'Data Analytics Training', 'Data Science Training', 'Business Analytics Training'];
    const courses2 = ['AI Artificial Intelligence Training', 'AWS Training', 'DevOps Training', 'Full Stack Developer Training', 'Python Training'];

    return (
        <section className="overflow-hidden bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-white transition-colors duration-500">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-300 to-indigo-400 text-white py-32">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-indigo-400 dark:from-blue-400 dark:to-indigo-700 opacity-40 dark:opacity-60 backdrop-blur-sm z-0" />
                </div>
                <div className="relative z-10 container mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-indigo-900 animate-fade-in-down">
                        About IT Accurate
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-50 animate-fade-in-up">
                        Award-winning IT training institute in Nagpur, shaping careers since 2012
                    </p>
                    <div className="mt-12 animate-bounce-slow">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* Who We Are */}
            <div className="container mx-auto px-6 py-16 max-w-7xl">
                <section className="mb-20">
                    <div className='flex justify-center items-center flex-col'>
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 relative inline-block after:block after:w-20 after:h-1 after:bg-blue-400 after:absolute after:-bottom-2 after:left-0">
                            Who We Are?
                        </h2>
                        <p className="mb-6 text-lg leading-relaxed bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                            IT Accurate is a leading IT training institute founded in 2012 with a mission to bridge academia and industry.
                        </p>
                    </div>

                    {/* Courses */}
                    <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto">
                        {[courses1, courses2].map((group, i) => (
                            <ul
                                key={i}
                                className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-slate-700"
                            >
                                {group.map((course) => (
                                    <li
                                        key={course}
                                        className="flex items-center py-3 border-b border-gray-100 dark:border-slate-700 last:border-b-0 group"
                                    >
                                        <span className="text-blue-500 mr-4 text-lg transform group-hover:scale-110 transition-transform duration-200">
                                            ▹
                                        </span>
                                        <span className="text-gray-800 dark:text-gray-200 text-lg font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                            {course}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </section>

                {/* paragraph section */}
<div className="space-y-8 my-12">
  {/* Paragraph 1 */}
  <div
    className="relative bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 group overflow-hidden"
    style={{ transformStyle: 'preserve-3d' }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-yellow-50 dark:from-blue-900/20 dark:to-yellow-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-4 h-full justify-center items-center">
      <div className="bg-yellow-400 p-2 rounded-lg sm:mr-4 transform group-hover:rotate-12 transition-transform self-start sm:self-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
        Our practical, job-oriented training program will not only provide you with internationally accepted certificates but also with knowledge equivalent to a minimum of 1+ years of field experience. We value your time as much as ours. Hence, we provide an industry-based syllabus with industrial-experienced trainers, plus technical mock interviews, resume preparation, and 100% guaranteed job assistance. All global certifications are available under one roof in Nagpur.
      </p>
    </div>
    <div className="absolute bottom-4 right-4 text-yellow-400 opacity-30 text-6xl font-bold transform group-hover:scale-110 transition-transform">01</div>
  </div>

  {/* Paragraph 2 */}
  <div
    className="relative bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 group overflow-hidden"
    style={{ transformStyle: 'preserve-3d' }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-4 h-full justify-center items-center">
      <div className="bg-blue-400 p-2 rounded-lg sm:mr-4 transform group-hover:-rotate-12 transition-transform self-start sm:self-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
        Additionally, IT Accurate assists you in honing your soft skills, including communication skills, public speaking, email etiquette, personal interviews, and HR grooming sessions. You'll ace the interviews both during and after the training using these abilities.
      </p>
    </div>
    <div className="absolute bottom-4 right-4 text-blue-400 opacity-30 text-6xl font-bold transform group-hover:scale-110 transition-transform">02</div>
  </div>

  {/* Paragraph 3 */}
  <div
    className="relative bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 group overflow-hidden"
    style={{ transformStyle: 'preserve-3d' }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-4 h-full justify-center items-center">
      <div className="bg-green-500 p-2 rounded-lg sm:mr-4 transform group-hover:rotate-12 transition-transform self-start sm:self-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
        We proudly consider ourselves the highest placement-providing institute in Nagpur, as per our last 10 years' records, with 400+ placement tie-ups with IT, service, and manufacturing companies across PAN India.
      </p>
    </div>
    <div className="absolute bottom-4 right-4 text-green-400 opacity-30 text-6xl font-bold transform group-hover:scale-110 transition-transform">03</div>
  </div>

  {/* Paragraph 4 */}
  <div
    className="relative bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 group overflow-hidden"
    style={{ transformStyle: 'preserve-3d' }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-4 h-full justify-center items-center">
      <div className="bg-orange-400 p-2 rounded-lg sm:mr-4 transform group-hover:-rotate-12 transition-transform self-start sm:self-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
        We focus on delivering innovative, efficient, and future-proof training to the youth of India, helping them build successful careers. We envision a success story for all our students.
      </p>
    </div>
    <div className="absolute bottom-4 right-4 text-orange-400 opacity-30 text-6xl font-bold transform group-hover:scale-110 transition-transform">04</div>
  </div>
</div>


                {/* Stats Section */}
                <section className="mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map(({ label, value, icon, color }, i) => (
                            <div
                                key={i}
                                className={`bg-gradient-to-br ${color} text-white p-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-all duration-500`}
                            >
                                <div className="text-4xl mb-4">{icon}</div>
                                <div className="text-5xl font-bold mb-2">
                                    <Counter endValue={value} />+
                                </div>
                                <div className="text-lg font-medium opacity-90">{label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Quote */}
                <section className="mb-7 relative bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl dark:shadow-slate-600">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-indigo-400 dark:from-blue-500 dark:to-indigo-600 opacity-40 dark:opacity-60 backdrop-blur-sm z-0 rounded-3xl" />

                    <blockquote className="relative z-10 text-2xl md:text-3xl italic leading-relaxed">
                        <span className="absolute top-0 left-0 text-6xl text-blue-400 opacity-20">“</span>
                        We focus on delivering innovative, efficient, and future-proof training to the youth of India, helping them build successful careers.
                    </blockquote>
                    <cite className="block mt-6 text-right font-semibold text-gray-700 dark:text-gray-300">– IT Accurate Team</cite>
                </section>
            </div>
        </section>
    );
};

export default AboutUs;
