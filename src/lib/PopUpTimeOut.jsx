import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FreeDemoForm from '../components/ContactUs/FreeDemoForm';

function PopUpTimeOut() {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(false); 
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, [location.pathname]); 

  return (
    <>
      {showPopup && <FreeDemoForm />}
    </>
  );
}

export default PopUpTimeOut;
