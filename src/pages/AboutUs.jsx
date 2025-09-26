import { useState, useEffect } from "react";
import FreeDemoForm from "../components/ContactUs/FreeDemoForm";
import Hero from "../components/About/Hero";
import Certification from "../components/About/Certification";
import Workshop from "../components/About/Workshop";
import Awards from "../components/About/Awards";
import MOUSlider from "../components/About/MOUSlider";
import PlacementsSection from "../components/About/PlacementSection";
import { motion } from "framer-motion";
import PopUpTimeOut from "../lib/PopUpTimeOut";
import { getSeoData } from "../lib/seoUtil";
import { useLocation } from "react-router-dom";

const AboutUs = () => {
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();
  const path = location.pathname.slice(1);
  const seo = getSeoData(path);

  return (
    <>
    
    {/* seo tags */}
    <title>{seo.metaTitle}</title>
    <meta name="description" content={seo.metaDescription} />

    {/* <meta name="keywords" content={seo.keywords || ''} /> */}
    
    {/* content page */}
    <div className="bg-gray-50 dark:bg-slate-900 dark:text-white transition-colors duration-500">
      <PopUpTimeOut />
      <Hero />
      <Certification />
      <Awards />
      <Workshop />
      <MOUSlider />
      <PlacementsSection />
      {/* CTA Section */}
      {showForm && (
        <FreeDemoForm
          onClose={() => setShowForm(false)}
          title1={"Register for a Free Session"}
          title2={"Get in Touch"}
        />
      )}
      {/* <section className="bg-gradient-to-tr from-blue-500 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your IT Career?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of successful students who have transformed their careers with our training programs.
          </p>
          <button className="bg-blue-300 shadow-2xl shadow-blue-200 hover:scale-95 hover:bg-blue-700 text-blue-900 hover:text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300" onClick={()=> setShowForm(true)}>
            Enroll Now
          </button>
        </div>
      </section> */}
      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-10 md:p-14 rounded-3xl shadow-2xl text-center"
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-6">
          Ready to Transform Your Career?
        </h3>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-blue-100">
          Join hundreds of successful students who've launched their IT careers
          with our training programs.
        </p>
        <button
          className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          onClick={() => setShowForm(true)}
        >
          Enroll Now
        </button>
      </motion.section>
    </div>
    </>
  );
};

export default AboutUs;
