import { useState, useEffect } from 'react';
import FreeDemoForm from '../components/ContactUs/FreeDemoForm';
import Hero from '../components/About/Hero';
import Certification from '../components/About/Certification';
import Workshop from '../components/About/Workshop';
import Awards from '../components/About/Awards';

const AboutUs = () => {

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="bg-gray-50 dark:bg-slate-900 dark:text-white transition-colors duration-500">
      
      <Hero />
      <Certification />
      <Awards />
      <Workshop />
      
      {/* CTA Section */}
      { showForm && <FreeDemoForm onClose={()=> setShowForm(false)} /> }
      <section className="bg-gradient-to-tr from-blue-500 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your IT Career?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of successful students who have transformed their careers with our training programs.
          </p>
          <button className="bg-blue-400 hover:bg-blue-500 text-blue-900 font-bold py-3 px-8 rounded-full text-lg transition duration-300" onClick={()=> setShowForm(true)}>
            Enroll Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
