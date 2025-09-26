
import React, { useMemo, memo } from "react";
import { motion } from "framer-motion";
import { useLoaderData, useNavigation, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

// Local components
import FormComponent from "../components/ContactUs/FormComponent";
import WhatIs from "../components/CourseDetails/WhatIs";
import KeyFeatures from "../components/CourseDetails/KeyFeatures";
import TopicsSection from "../components/CourseDetails/TopicsSection";
import UpcomingBatches from "../components/CourseDetails/UpcomingBatches";
import DemoBanner from "../components/CourseDetails/DemoBanner";
import RoadMap from "../components/CourseDetails/RoadMap";
import TrainingSyllabus from "../components/CourseDetails/TrainingSyllabus";
import JobPreparation from "../components/CourseDetails/JobPreparation";
import CertificationSection from "../components/CourseDetails/CertificationSection";
import Modules from "../components/CourseDetails/Modules";
import PlacedStudents from "../components/HomePage/PlacedStudents";
import FAQSection from "../components/CourseDetails/FAQSection";
import ContactUs from "../components/ContactUs/ContactUs";
import CompanyMarquee from "../components/CourseDetails/CompanyMarquee";
import CourseOpportunities from "../components/CourseDetails/CourseOpportunities";
import Projects from "../components/CourseDetails/Projects";
import TestimonialSlider from "../components/CourseDetails/TestimonialSlider";
import AboutCourseSkeleton from "../components/ui/SkeletonEffects/AboutCourseSkeleton";
import OfferedCourses from "../components/CourseDetails/OfferedCourses";
import PopUpTimeOut from "../lib/PopUpTimeOut";
import { SafeImage } from "../lib/SafeImage";
import CourseFeesDuration from "../SEO/CourseFeesDuration";
import OfferLetters from "../components/CourseDetails/OfferLetters";
import JobOpenings from "../components/CourseDetails/JobOpenings";
import { TiTick } from "react-icons/ti";
import { getSeoData } from "../lib/seoUtil";

/**
 * Constants moved outside component to avoid re-creation on each render and to
 * keep component body focused on rendering logic. In a real app these might
 * come from a static config or a CMS API.
 */
const SAP_OFFER_LETTERS = [
  { src: "/OfferLetters/Sap/offer1.jfif" },
  { src: "/OfferLetters/Sap/offer2.png" },
  { src: "/OfferLetters/Sap/offer3.jfif" },
  { src: "/OfferLetters/Sap/offer4.jfif" },
  { src: "/OfferLetters/Sap/offer5.png" },
  { src: "/OfferLetters/Sap/offer6.png" },
  { src: "/OfferLetters/Sap/offer7.png" },
  { src: "/OfferLetters/Sap/offer8.jfif" },
  { src: "/OfferLetters/Sap/offer9.jfif" },
  { src: "/OfferLetters/Sap/offer10.jfif" },
  { src: "/OfferLetters/Sap/offer11.jfif" },
  { src: "/OfferLetters/Sap/offer12.png" },
];

const ALL_TECH_OFFER_LETTERS = [
  { src: "/OfferLetters/AllTechs/offer1.jpg" },
  { src: "/OfferLetters/AllTechs/offer2.webp" },
  { src: "/OfferLetters/AllTechs/offer3.jfif" },
  { src: "/OfferLetters/AllTechs/offer4.jpg" },
  { src: "/OfferLetters/AllTechs/offer5.jpg" },
  { src: "/OfferLetters/AllTechs/offer6.jpg" },
  { src: "/OfferLetters/AllTechs/offer7.jfif" },
  { src: "/OfferLetters/AllTechs/offer8.jfif" },
  { src: "/OfferLetters/AllTechs/offer9.jfif" },
  { src: "/OfferLetters/AllTechs/offer10.webp" },
  { src: "/OfferLetters/AllTechs/offer11.webp" },
  { src: "/OfferLetters/AllTechs/offer12.webp" },
];

/**
 * Small presentational component for listing course highlights/extras.
 * Kept inside module because it's tiny and tightly coupled to AboutCourse.
 */
const ExtrasList = memo(function ExtrasList({ items }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className="pt-2 space-y-3" aria-labelledby="course-highlights">
      <div className="flex items-center text-blue-600 dark:text-blue-400">
        <div className="rounded-full bg-blue-600 dark:text-indigo-800" aria-hidden>
          <TiTick className="text-white font-bold" />
        </div>
        <h3 id="course-highlights" className="text-xl font-bold text-blue-600 dark:text-indigo-800 pl-3">
          Course Highlights
        </h3>
      </div>

      <ul className="space-y-2 pl-2" role="list">
        {items.map((extra, idx) => (
          <li key={idx} className="flex items-start">
            <div className="flex-shrink-0 mt-1 mr-3 rounded-full">
              <div className="rounded-full bg-green-500" aria-hidden>
                <TiTick className="text-white font-bold" />
              </div>
            </div>
            <span className="text-gray-700 dark:text-gray-300 text-lg font-semibold text-start">
              {extra}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
});

ExtrasList.displayName = "ExtrasList";
ExtrasList.propTypes = { items: PropTypes.array };

/**
 * AboutCourse — a single-page course details view. This is a refactor of the
 * original file with improvements for readability, maintainability and
 * enterprise-grade patterns (memoization, small components, constants,
 * prop-types and accessibility hints).
 */
function AboutCourse() {
  // data loaded via react-router loader on the route definition
  const courseDetail = useLoaderData() || {};
  const location = useLocation();
  const navigation = useNavigation();
  const path = location.pathname.slice(1);
  const seo = getSeoData(path);

  // Defensive destructuring with sensible defaults
  const {
    title = "",
    name = "",
    bgImage = null,
    detail = {},
    coveringTopics = [],
    coveringTopics2 = null,
    whatIs = null,
    keyFeatures = null,
    roadMap = null,
    trainingSyllabus = [],
    trainingSyllabus2 = [],
    projects = [],
    faqs = [],
    reviews = [],
    certificationPoints = [],
    FeesDuration = null,
    JobOpenings: jobOpenings = null,
  } = courseDetail;

  // Show skeleton while route is loading — keeps UX consistent across app
  if (navigation?.state === "loading") {
    return <AboutCourseSkeleton />;
  }

  // Memoized values to avoid re-computation on each render
  const isSapPath = useMemo(() => location.pathname.includes("sap"), [location.pathname]);
  const isSapMM = useMemo(() => location.pathname.slice(1) === "sap-mm", [location.pathname]);
  const isFullStack = useMemo(() => location.pathname.slice(1) === "full-stack-developer", [location.pathname]);

  // Select appropriate set of offer letters depending on path
  const offerLetters = useMemo(() => (isSapPath ? SAP_OFFER_LETTERS : ALL_TECH_OFFER_LETTERS), [isSapPath]);

  // Normalize faq shape — many backends return object for a single FAQ
  const normalizedFaqs = useMemo(() => {
    if (!faqs) return [];
    if (Array.isArray(faqs)) return faqs;
    if (typeof faqs === "object") return [faqs];
    return [];
  }, [faqs]);

  // extras from detail can be an array or undefined — guard for rendering
  const extras = Array.isArray(detail?.extras) ? detail.extras : [];

  return (
    <>

    {/* seo tags */}
    <title>{seo.metaTitle}</title>
    <meta name="description" content={seo.metaDescription} />

    {/* <meta name="keywords" content={seo.keywords || ''} /> */}

    {/* content page */}
    <div className="relative bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Global timed popup (kept at top-level for z-index simplicity) */}
      <PopUpTimeOut />

      {/* Hero Section */}
      <section
        className="relative w-full overflow-visible py-16 sm:py-20 md:py-24"
        aria-labelledby="course-title"
      >
        {/* Background image & gradient overlay */}
        <div
          className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: bgImage ? `url('${bgImage}')` : "none" }}
          aria-hidden
        />

        <div className="absolute inset-0 opacity-90 bg-gradient-to-r from-blue-100 to-purple-200 dark:from-blue-400 dark:to-purple-500 z-0 backdrop-blur-sm" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-6 md:gap-8">
          {/* Left: Course text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-[85%] lg:w-[88%] text-center md:text-left z-20 pt-5"
          >
            <h1 id="course-title" className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4 text-gray-700 dark:text-black">
              <span className="text-blue-600 dark:text-indigo-800">IT Accurate - </span>
              {title}
              <span className="text-blue-600 dark:text-indigo-800"> - Fees, Placements</span>
            </h1>

            {/* Short description — prefer paragraph1 as guard */}
            {detail?.paragraph1 && (
              <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-800 mb-4 sm:mb-5">
                {detail.paragraph1}
              </p>
            )}

            {/* paragraph2 & paragraph3 — allow HTML via dangerouslySetInnerHTML only when necessary */}
            {detail?.paragraph2 && (
              <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-800 mb-5 sm:mb-6" dangerouslySetInnerHTML={{ __html: detail.paragraph2 }} />
            )}

            {detail?.paragraph3 && (
              <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-800 mb-5 sm:mb-6" dangerouslySetInnerHTML={{ __html: detail.paragraph3 }} />
            )}

            {/* Course extras/highlights */}
            <ExtrasList items={extras} />
          </motion.div>

          {/* Right: Sticky lead form — hidden on small screens to keep focus */}
          <aside className="w-full md:w-[55%] lg:w-[52%] md:sticky top-6 z-10 sm:block hidden" aria-label="lead form">
            <div className="rounded-xl shadow-lg">
              <FormComponent />
            </div>
          </aside>
        </div>
      </section>

      {/* Topics / coveringTopics sections: prefer explicit checks and predictable ordering */}
      {coveringTopics2 ? (
        <>
          <TopicsSection
            coveringTopics={coveringTopics2}
            heading={
              <span>
                All the <span className="text-blue-600">Topics</span> Will Be Covered in <span className="text-blue-600">Detail</span>
              </span>
            }
          />

          <TopicsSection
            coveringTopics={coveringTopics}
            heading={<span className="text-blue-600">Also Include</span>}
          />
        </>
      ) : (
        <TopicsSection coveringTopics={coveringTopics} />
      )}

      {/* WhatIs & KeyFeatures (only when available) */}
      {whatIs && <WhatIs name={whatIs.name} points={whatIs.points} bgImage={bgImage} />}
      {keyFeatures && <KeyFeatures name={whatIs?.name} keyFeatures={keyFeatures} />}

      {/* Reusable UI components (no data coupling) */}
      <UpcomingBatches />
      <DemoBanner />

      {/* RoadMap */}
      {roadMap && <RoadMap data={roadMap} title={whatIs?.name} />}

      {/* Training syllabus — main + sap-mm special-case */}
      {Array.isArray(trainingSyllabus) && trainingSyllabus.length > 0 && <TrainingSyllabus syllabus={trainingSyllabus} />}

      {isSapMM && Array.isArray(trainingSyllabus2) && trainingSyllabus2.length > 0 && <TrainingSyllabus syllabus={trainingSyllabus2} />}

      {/* SAP-specific addon image */}
      {isSapPath && (
        <div className="py-11 bg-gray-100 dark:bg-slate-900">
          <SafeImage className="md:w-[70vw] m-auto w-10vw" src="./addons.png" alt="addon" />
        </div>
      )}

      {/* Offer conditional components */}
      {isFullStack && <OfferedCourses />}

      <JobPreparation />

      <CertificationSection certificateImg={null} courseName={name} certificationPoints={certificationPoints} />

      {/* Projects: hidden for sap pages to avoid duplication */}
      {!isSapPath && projects && projects.length > 0 && <Projects projects={projects} name={name} />}

      {/* Only render SAP modules on SAP pages */}
      {isSapPath && <Modules />}

      <OfferLetters letters={offerLetters} reviews={reviews && reviews.length ? reviews : undefined} />

      {/* Job openings (if provided) */}
      {jobOpenings && <JobOpenings name={whatIs?.name} keyFeatures={jobOpenings} />}

      {/* Visual separator before placed students */}
      <div className="-mt-16">
        <PlacedStudents className={`text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 dark:text-white`} />
      </div>

      {/* FAQ normalization and rendering */}
      {normalizedFaqs.length > 0 && <FAQSection faqs={normalizedFaqs} />}

      {FeesDuration && <CourseFeesDuration data={FeesDuration} />}

      <CourseOpportunities pageName={String(name).trim()} />

      {/* Testimonials, marquee and contact — last in the flow */}
      {reviews && reviews.length > 0 && <TestimonialSlider reviews={reviews} />}

      <CompanyMarquee />

      <ContactUs />
    </div>
    </>
  );
}

AboutCourse.propTypes = {};

// Export memoized component for minimal re-renders when router data doesn't change
export default memo(AboutCourse);
