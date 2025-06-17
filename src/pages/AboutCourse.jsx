import { motion } from 'framer-motion';
import { useLoaderData } from "react-router";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FormComponent from "../components/ContactUs/FormComponent";
import WhatIs from '../components/CourseDetails/WhatIs';
import KeyFeatures from '../components/CourseDetails/KeyFeatures';
import TopicsSection from '../components/CourseDetails/TopicsSection';
import UpcomingBatches from '../components/CourseDetails/UpcomingBatches';
import DemoBanner from '../components/CourseDetails/DemoBanner';
import RoadMap from '../components/CourseDetails/RoadMap';
import TrainingSyllabus from '../components/CourseDetails/TrainingSyllabus';
import { TiTick } from 'react-icons/ti';
import JobPreparation from '../components/CourseDetails/JobPreparation';
import CertificationSection from '../components/CourseDetails/CertificationSection';
import Modules from '../components/CourseDetails/Modules';
import PlacedStudents from "../components/HomePage/PlacedStudents";
import FAQSection from '../components/CourseDetails/FAQSection';
import ContactUs from '../components/ContactUs/ContactUs';
import CompanyMarquee from '../components/CourseDetails/CompanyMarquee';
import CourseOpportunities from '../components/CourseDetails/CourseOpportunities';

function AboutCourse() {
  const courseDetail = useLoaderData();
  const location = useLocation();
  const { name, trainingSyllabus, trainingSyllabus2, faqs } = courseDetail;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Simulate loading time

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse p-6 space-y-10 max-w-7xl mx-auto">
        <div className="h-10 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded w-full"></div>
        <div className="h-6 bg-gray-200 rounded w-full"></div>
        <div className="h-6 bg-gray-200 rounded w-5/6"></div>
        <div className="h-52 bg-gray-200 rounded w-full"></div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-[70%] space-y-3">
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-5/6"></div>
          </div>
          <div className="w-full md:w-[30%] bg-gray-200 rounded h-80"></div>
        </div>
      </div>
    );
  }

  return (
    <div className='relative bg-white dark:bg-gray-900 transition-colors duration-300'>
      {/* Hero Section */}
      <section className="relative w-full overflow-visible py-16 sm:py-20 md:py-24 bg-white dark:bg-gray-900">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: courseDetail.bgImage
              ? `url('${courseDetail.bgImage}')`
              : 'none',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        />
        <div className="absolute inset-0 opacity-90 bg-gradient-to-r from-blue-100 to-purple-200 dark:from-blue-400 dark:to-purple-500 z-0 backdrop-blur-sm" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-[85%] lg:w-[88%] text-center md:text-left z-20 pt-5"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4 text-gray-700 dark:text-black">
              <span className='text-blue-600 dark:text-indigo-800'>IT Accurate - </span>
              {courseDetail.title}
              <span className='text-blue-600 dark:text-indigo-800'> - Fees, Placements</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-800 mb-4 sm:mb-5">
              {courseDetail.detail.paragraph1}
            </p>
            <p
              className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-800 mb-5 sm:mb-6"
              dangerouslySetInnerHTML={{ __html: courseDetail.detail.paragraph2 }}
            />

            {Array.isArray(courseDetail.detail.extras) && courseDetail.detail.extras.length > 0 && (
              <div className="pt-2 space-y-3">
                <div className="flex items-center text-blue-600 dark:text-blue-400">
                  <div className='rounded-full bg-blue-600 dark:text-indigo-800'>
                    <TiTick className='text-white font-bold' />
                  </div>
                  <h3 className="text-xl font-bold text-blue-600 dark:text-indigo-800 pl-3">Course Highlights</h3>
                </div>
                <ul className="space-y-2 pl-2">
                  {courseDetail.detail.extras.map((extra, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3 rounded-full text-green-500 dark:text-green-400">
                        <div className='rounded-full bg-green-500 dark:text-green-800'>
                          <TiTick className='text-white font-bold' />
                        </div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-800 text-lg font-semibold">{extra}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          <div className="w-full md:w-[55%] lg:w-[52%] sticky top-6 z-10">
            <div className="rounded-xl shadow-lg p-5 sm:p-6 md:p-6 lg:p-7">
              <FormComponent />
            </div>
          </div>
        </div>
      </section>

      <TopicsSection courseDetail={courseDetail} />
      <WhatIs />
      <KeyFeatures />
      <UpcomingBatches />
      <DemoBanner />

      {courseDetail.roadMap && <RoadMap />}
      {courseDetail.roadMap && <TrainingSyllabus syllabus={trainingSyllabus} />}
      {location.pathname.slice(1) === "sap-mm" && <TrainingSyllabus syllabus={trainingSyllabus2} />}
      <JobPreparation />
      <CertificationSection certificateImg={null} courseName={name} />
      <Modules />
      <div className='-mt-16'>
        <PlacedStudents className={`text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 dark:text-white`} />
      </div>
      <FAQSection faqs={faqs} />
      <div className='py-11 bg-gray-100 dark:bg-slate-900'>
        <img className="md:w-[70vw] m-auto w-10vw" src="./addons1.png" alt="addon" />
      </div>
      <CourseOpportunities pageName={name} />
      <CompanyMarquee />
      <ContactUs />
    </div>
  );
}

export default AboutCourse;
