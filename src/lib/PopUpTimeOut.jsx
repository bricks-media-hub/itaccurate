import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FreeDemoForm from '../components/ContactUs/FreeDemoForm';

function PopUpTimeOut() {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show first popup immediately after route change
    // setShowPopup(true);

    // Set interval for every 15 sec
    const interval = setInterval(() => {
      setShowPopup(true);
    }, 15000);

    return () => clearInterval(interval); 
  }, [location.pathname]);

  return (
    <>
      {showPopup && <FreeDemoForm onClose={() => setShowPopup(false)} />}
    </>
  );
}

export default PopUpTimeOut;
