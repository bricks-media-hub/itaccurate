
import React, { useState, memo } from "react";
import { useLocation, useNavigation } from "react-router-dom";

// Core UI
import Loader from "../components/ui/Loader";

// Sections
import PopUpTimeOut from "../lib/PopUpTimeOut";
import Banner from "../components/HomePage/Banner/Banner";
import FeatureSection from "../components/HomePage/Banner/FeatureSection";
import CompanyPartnersRatings from "../components/HomePage/CompanyPartnersRatings";
import TrainingCourses from "../components/HomePage/TrainingCourses";
import { WhatMakesUsDifferent } from "../components/HomePage/WhatMakesUsDifferent";
import PlacedStudents from "../components/HomePage/PlacedStudents";
import ReachUsForm from "../components/ContactUs/ReachUsForm";
import SalaryHikeSection from "../components/HomePage/SalaryHikeSection";
import { LearningOutcomes } from "../components/HomePage/LearningOutcomes";
import TrainerDetails from "../components/HomePage/AboutTrainer";
import AlumniMarquee from "../components/HomePage/AlumniMarquee";
import FeesDetails from "../components/HomePage/FeesDetails";
import JobPreparation from "../components/HomePage/JobPreparation";
import ContactUs from "../components/ContactUs/ContactUs";
import { getSeoData } from "../lib/seoUtil";
// import NavBar from "../components/HomePage/Navbar/NavBar";
// import Slider from "../components/HomePage/Slider";
// import Footer from "../components/HomePage/Footer";

/**
 * Home Page Component
 * - Renders landing page sections in a responsive layout
 * - Uses `useNavigation` from React Router to show a loader during transitions
 */
function Home() {
  const [activeLocation, setActiveLocation] = useState("nagpur");
  const navigation = useNavigation();
  const location = useLocation();
    const path = location.pathname.slice(1);
    const seo = getSeoData(path);

  // Show loader while navigating
  if (navigation.state === "loading") {
    return <Loader />;
  }

  return (
    <>
        
    {/* seo tags */}
    <title>{seo.metaTitle}</title>
    <meta name="description" content={seo.metaDescription} />
    <link rel="canonical" href={seo.canonicalTag} />
    {/* <meta name="keywords" content={seo.keywords || ''} /> */}
    
    {/* content page */}
    <div className="font-sans">
      {/* Timed Popup */}
      <PopUpTimeOut />

      {/* Hero Section */}
      {/* <NavBar /> */}
      <Banner />

      {/* Mobile Sections */}
      <div className="sm:hidden">
        <TrainingCourses />
      </div>
      <div className="sm:hidden">
        <WhatMakesUsDifferent />
      </div>
      <div className="sm:hidden">
        <FeatureSection />
      </div>

      {/* Desktop Sections */}
      <div className="hidden sm:block mt-32">
        <CompanyPartnersRatings />
      </div>
      <div className="hidden sm:block">
        <TrainingCourses />
      </div>
      <div className="hidden sm:block">
        <WhatMakesUsDifferent />
      </div>

      {/* Common Sections */}
      <PlacedStudents />
      <ReachUsForm />
      <SalaryHikeSection />
      <LearningOutcomes />
      <TrainerDetails />
      <AlumniMarquee />
      <FeesDetails />
      <JobPreparation />

      {/* Mobile: Company Ratings after Job Prep */}
      <div className="sm:hidden">
        <CompanyPartnersRatings />
      </div>

      {/* Contact Section */}
      <ContactUs
        initialLocation={activeLocation}
        setActiveLocation={setActiveLocation}
      />

      {/* Optional Sections */}
      {/* <Slider /> */}
      {/* <Footer setSelectedLocation={setSelectedLocation} /> */}
    </div>
    </>
  );
}

export default memo(Home);
