import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AboutCourseSkeleton from "../components/ui/SkeletonEffects/AboutCourseSkeleton";
import axios from "axios";
import { useLocation } from "react-router-dom";
import FormComponent from "../components/ContactUs/FormComponent";
import { TiTick } from "react-icons/ti";
import Modules from "../components/CourseDetails/Modules";
import WhatIs from "../components/CourseDetails/WhatIs";
import KeyFeatures from "../components/CourseDetails/KeyFeatures";
import CourseLocationDetails from "../SEO/CourseLocationDetails";
import UpcomingBatches from "../components/CourseDetails/UpcomingBatches";
import DemoBanner from "../components/CourseDetails/DemoBanner";
import JobPreparation from "../components/CourseDetails/JobPreparation";
import CertificationSection from "../components/CourseDetails/CertificationSection";
import CourseFeesDuration from "../SEO/CourseFeesDuration";
import PlacedStudents from "../components/HomePage/PlacedStudents";
import CompanyMarquee from "../components/CourseDetails/CompanyMarquee";
import ContactUs from "../components/ContactUs/ContactUs";
import CourseOpportunities from "../components/CourseDetails/CourseOpportunities";
import TestimonialSlider from "../components/CourseDetails/TestimonialSlider";
import TopicsSection from "../components/CourseDetails/TopicsSection";
import { SafeImage } from "../lib/SafeImage";

function SeoLandingPage() {
  const [landingPageDetails, setLandingPageDetails] = useState({});
  const [loading, isLoading] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      let DATA_URL;
      if (location.pathname === "/sap-course-in-nagpur") {
        DATA_URL = "/data/seo/updated-sap-nagpur.json";
      } else if (location.pathname === "/sap-course-in-thane") {
        DATA_URL = "/data/seo/updated-sap-thane.json";
      } else if (location.pathname === "/sap-fico-course-in-nagpur") {
        DATA_URL = "/data/seo/updated-sap-fico-nagpur.json";
      }

      if (!DATA_URL) return;

      isLoading(true);
      try {
        const { data } = await axios.get(DATA_URL);
        const key = location.pathname.replace("/", "");
        setLandingPageDetails(data[key]);
      } catch (error) {
        console.log("Landing Page Data :: Error :: ", error);
      } finally {
        isLoading(false);
      }
    };
    fetchData();
  }, [location.pathname]);

  if (loading) {
    return <AboutCourseSkeleton />;
  }

  return (
    <div className="relative bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero/Banner Section */}
      <section className="relative w-full overflow-visible py-16 sm:py-20 md:py-24 bg-white dark:bg-gray-900">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: landingPageDetails?.bgImage
              ? `url('${landingPageDetails?.bgImage}')`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Gradient Background */}
        <div className="absolute inset-0 opacity-90 bg-gradient-to-r from-blue-100 to-purple-200 dark:from-blue-400 dark:to-purple-500 z-0 backdrop-blur-sm" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-6 md:gap-8">
          {/* content section  */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-[85%] lg:w-[88%] text-center md:text-left z-20 pt-5"
          >
            {/* Dynamic Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-gray-700 dark:text-black">
              {landingPageDetails?.title}
              <span className="text-blue-600 dark:text-indigo-800">
                Practical Training with 100% Placement
              </span>
            </h1>

            {/* Bullet Points */}
            {Array.isArray(landingPageDetails?.detail?.points) &&
              landingPageDetails.detail.points.length > 0 && (
                <ul className="space-y-3 text-left">
                  {landingPageDetails.detail.points.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start text-base sm:text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-800"
                    >
                      <span className="mr-2 text-blue-600">
                        <div className="mr-4 mt-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                          <SafeImage src="/icons/blue-tick.svg" alt="blue-tick" />
                        </div>
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              )}
          </motion.div>

          {/* form section */}
          <div className="w-full md:w-[55%] lg:w-[52%] md:sticky top-6 z-10 sm:block hidden">
            <div className="rounded-xl shadow-lg sticky">
              <FormComponent />
            </div>
          </div>
        </div>
      </section>

      {/* Sap Modules */}
      <Modules />

      {/* Sap Image */}
      <div className="py-11 bg-gray-100 dark:bg-slate-900">
        <SafeImage
          className="md:w-[70vw] m-auto w-10vw"
          src="./addons.png"
          alt="addon"
        />
      </div>

      {/* Topics */}
      <TopicsSection coveringTopics={landingPageDetails?.coveringTopics} />

      {/* Why Choose IT Accurate */}
      {landingPageDetails?.whyChoose && (
        <WhatIs
          defaultText={false}
          name={landingPageDetails?.whyChoose?.title}
          points={landingPageDetails?.whyChoose?.points}
          bgImage={landingPageDetails?.whyChoose?.imageUrl}
        />
      )}

      {/* Key features of sap */}
      {landingPageDetails?.keyFeatures && (
        <KeyFeatures
          name={landingPageDetails?.name}
          keyFeatures={landingPageDetails?.keyFeatures}
        />
      )}
      
      {/* Upcoming batches */}
      <UpcomingBatches />

      {/* Demo Form */}
      <DemoBanner />

      {/* Course Location and Details */}
      {landingPageDetails?.courseLocation && (
        <CourseLocationDetails
          title={landingPageDetails?.courseLocation?.title}
          points={landingPageDetails?.courseLocation?.points}
          bgImage={landingPageDetails?.courseLocation?.imageUrl}
        />
      )}

      {/* Sap Certification */}
      <CertificationSection
        certificateImg={null}
        courseName={landingPageDetails?.name}
        certificationPoints={landingPageDetails?.certificationPoints}
      />

      {/* Successful Students */}
      <div className="-mt-16">
        <PlacedStudents
          className={`text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 dark:text-white`}
        />
      </div>

      {/* Companies marquee */}
      <CompanyMarquee />

      {/* Professional Success */}
      <JobPreparation />

      {/* Course Fees & Duration details */}
      <CourseFeesDuration data={landingPageDetails?.FeesDuration} />



      {/* Career Oppurtunities */}
      <CourseOpportunities pageName={"SAP"} />

      {/* Testimonials */}
      {landingPageDetails?.reviews && <TestimonialSlider reviews={landingPageDetails?.reviews} />}



      {/* Contact Us */}
      <ContactUs />
    </div>
  );
}

export default SeoLandingPage;
