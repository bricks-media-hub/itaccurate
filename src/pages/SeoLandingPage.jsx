import React from "react";
import { motion } from "framer-motion";
import { useLoaderData, useLocation, useNavigation } from "react-router-dom";
import AboutCourseSkeleton from "../components/ui/SkeletonEffects/AboutCourseSkeleton";
import FormComponent from "../components/ContactUs/FormComponent"; 
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
import PopUpTimeOut from "../lib/PopUpTimeOut";
import TrainingSyllabus from "../components/CourseDetails/TrainingSyllabus";
import { getSeoData } from "../lib/seoUtil";

function SeoLandingPage() {
  const location = useLocation();
  const navigation = useNavigation();
  const landingPageDetails = useLoaderData() || {};

  /* ✅ FIX: derive city from URL */
  const path = location.pathname.slice(1);
  const city = path.split("-").pop();
  const formattedCity =
    city.charAt(0).toUpperCase() + city.slice(1);

  const seo = getSeoData(path);

  if (navigation.state === "loading") {
    return <AboutCourseSkeleton />;
  }

  return (
    <>
      {/* SEO */}
      <title>{seo.metaTitle}</title>
      <meta name="description" content={seo.metaDescription} />
      <link rel="canonical" href={seo.canonicalTag} />

      <div className="relative bg-white dark:bg-gray-900 transition-colors duration-300">
        <PopUpTimeOut />

        {/* Hero Section */}
        <section className="relative w-full overflow-visible py-16 sm:py-20 md:py-24 bg-white dark:bg-gray-900">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: landingPageDetails?.bgImage
                ? `url('${landingPageDetails.bgImage}')`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 opacity-90 bg-gradient-to-r from-blue-100 to-purple-200 z-0 backdrop-blur-sm" />

          <div className="relative max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-6">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-[85%] text-center md:text-left z-20 pt-5"
            >
              {/* ✅ ONLY FIXED PART */}
              {location.pathname.includes("sap") ? (
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-gray-700">
                  {landingPageDetails?.title}
                  <span className="text-blue-600">
                    Practical Training with 100% Placement
                  </span>
                </h1>
              ) : (
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-blue-600">
                  <span className="text-gray-700">Best </span>
                  {landingPageDetails?.title}
                  <span className="text-gray-700">
                    {" in "}{formattedCity}
                  </span>
                </h1>
              )}

              {/* 🔒 ICON / BULLET SECTION — UNTOUCHED */}
              {Array.isArray(landingPageDetails?.detail?.points) && (
                <ul className="space-y-3 text-left">
                  {landingPageDetails.detail.points.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start text-base sm:text-lg md:text-xl font-semibold text-gray-700"
                    >
                      <span className="mr-2 text-blue-600">
                        <div className="mr-4 mt-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-100">
                          <SafeImage
                            src="/icons/blue-tick.svg"
                            alt="blue-tick"
                          />
                        </div>
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>

            {/* Form */}
            <div className="w-full md:w-[55%] md:sticky top-6 z-10 sm:block hidden">
              <div className="rounded-xl shadow-lg sticky">
                <FormComponent />
              </div>
            </div>
          </div>
        </section>

        {/* Everything below is unchanged */}
        {location.pathname.includes("sap") && <Modules courseName={landingPageDetails?.name} />}
        <UpcomingBatches />
        <DemoBanner />
        {landingPageDetails?.trainingSyllabus && (
          <TrainingSyllabus syllabus={landingPageDetails.trainingSyllabus} />
        )}
        {landingPageDetails?.courseLocation && (
          <CourseLocationDetails
            title={landingPageDetails.courseLocation.title}
            points={landingPageDetails.courseLocation.points}
            bgImage={landingPageDetails.courseLocation.imageUrl}
          />
        )}
        <CertificationSection
          courseName={landingPageDetails?.name}
          certificationPoints={landingPageDetails?.certificationPoints}
        />
        <PlacedStudents />
        <CompanyMarquee />
        <JobPreparation />
        <CourseFeesDuration data={landingPageDetails?.FeesDuration} />
        <CourseOpportunities pageName={landingPageDetails?.name} />
        {landingPageDetails?.reviews && (
          <TestimonialSlider reviews={landingPageDetails.reviews} />
        )}
        <ContactUs />
      </div>
    </>
  );
}

export default SeoLandingPage;
