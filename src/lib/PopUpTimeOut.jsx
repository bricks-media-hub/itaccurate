// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import FreeDemoForm from '../components/ContactUs/FreeDemoForm';

// function PopUpTimeOut() {
//   const location = useLocation();
//   const [showPopup, setShowPopup] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setShowPopup(true);
//     }, 15000);

//     return () => clearInterval(interval); 
//   }, [location.pathname]);

//   return (
//     <>
//       {showPopup && <FreeDemoForm onClose={() => setShowPopup(false)} />}
//     </>
//   );
// }

// export default PopUpTimeOut;




import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FreeDemoForm from "../components/ContactUs/FreeDemoForm";

function PopUpTimeOut() {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const [popupCount, setPopupCount] = useState(0);

  useEffect(() => {
    if (popupCount >= 2) return;

    const timer = setInterval(() => {
      setShowPopup(true);
      setPopupCount((prev) => prev + 1);
    }, 7000);

    return () => clearTimeout(timer);
  }, [location.pathname, popupCount]);

  return (
    <>
      {showPopup && <FreeDemoForm onClose={() => setShowPopup(false)} />}
    </>
  );
}

export default PopUpTimeOut;
