import React, { useEffect, useState } from 'react';
import NavBar from '../components/HomePage/Navbar/NavBar';
import Banner from '../components/HomePage/Banner/Banner';
import CompanyPartnersRatings from '../components/HomePage/CompanyPartnersRatings';
import TrainingCourses from '../components/HomePage/TrainingCourses';
import { WhatMakesUsDifferent } from '../components/HomePage/WhatMakesUsDifferent';
import PlacedStudents from '../components/HomePage/PlacedStudents';
import ReachUsForm from '../components/ContactUs/ReachUsForm';
import SalaryHikeSection from '../components/HomePage/SalaryHikeSection';
import { LearningOutcomes } from '../components/HomePage/LearningOutcomes';
import TrainerDetails from '../components/HomePage/AboutTrainer';
import AlumniMarquee from '../components/HomePage/AlumniMarquee';
import FeesDetails from '../components/HomePage/FeesDetails';
import JobPreparation from '../components/HomePage/JobPreparation';
import ContactUs from '../components/ContactUs/ContactUs';
import Slider from '../components/HomePage/Slider';
import Footer from '../components/HomePage/Footer';
import PopUpTimeOut from '../lib/PopUpTimeOut';

function Home() {
  const [activeLocation, setActiveLocation] = useState('nagpur');

  return (
    <div className="font-sans">
      <PopUpTimeOut />
      {/* <NavBar /> */}
      <Banner />
      <div className='mt-32'>
        <CompanyPartnersRatings />
      </div>
      <TrainingCourses />
      <WhatMakesUsDifferent />
      <PlacedStudents />
      <ReachUsForm />
      <SalaryHikeSection />
      <LearningOutcomes />
      <TrainerDetails />
      <AlumniMarquee />
      <FeesDetails />
      <JobPreparation />
      {/* <Slider /> */}
      <ContactUs
        initialLocation={activeLocation}
        setActiveLocation={setActiveLocation} // Pass this if needed
      />{/* <Footer setSelectedLocation={setSelectedLocation} /> */}
    </div>
  );
}

export default Home;
