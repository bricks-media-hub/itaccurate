import React, { useEffect, useState } from "react";
import NavBar from "../components/HomePage/Navbar/NavBar";
import Banner from "../components/HomePage/Banner/Banner";
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
import Slider from "../components/HomePage/Slider";
import Footer from "../components/HomePage/Footer";
import PopUpTimeOut from "../lib/PopUpTimeOut";
import FeatureSection from "../components/HomePage/Banner/FeatureSection";
import { useNavigation } from "react-router-dom";
import Loader from "../components/ui/Loader";

function Home() {
  const [activeLocation, setActiveLocation] = useState("nagpur");
  const navigation = useNavigation();

  if(navigation.state === "loading") return <Loader />

  return (
    <div className="font-sans">

      <PopUpTimeOut />
      {/* <NavBar /> */}
      <Banner />
      <div className="sm:hidden">
        <TrainingCourses />
      </div>
      <div className="sm:hidden">
        <WhatMakesUsDifferent />
      </div>
      <div className="mt-32 sm:block hidden">
        <CompanyPartnersRatings />
      </div>
      <div className="sm:hidden">
        <FeatureSection />
      </div>
      <div className="hidden sm:block">
        <TrainingCourses />
      </div>
      <div className="sm:block hidden">
        <WhatMakesUsDifferent />
      </div>
      <PlacedStudents />
      <ReachUsForm />
      <SalaryHikeSection />

      <LearningOutcomes />
      <TrainerDetails />
      <AlumniMarquee />
      <FeesDetails />
      <JobPreparation />
      <div className="sm:hidden">
        <CompanyPartnersRatings />
      </div>
      {/* <Slider /> */}
      <ContactUs
        initialLocation={activeLocation}
        setActiveLocation={setActiveLocation} // Pass this if needed
      />
      {/* <Footer setSelectedLocation={setSelectedLocation} /> */}
    </div>
  );
}

export default Home;
