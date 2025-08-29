import React from "react";
import { SafeImage } from "../../lib/SafeImage";

const CallIcon = () => {
  const handleClick = () => {
    window.open("tel:9175978889");
  };

  return (
    <div
      onClick={handleClick}
      className="
        fixed 
        sm:top-[76vh]   /* Slightly above WhatsApp */
        sm:right-6 
        top-[78vh]
        right-7
        z-50 
        cursor-pointer 
        rounded-full 
        hover:scale-110 
        transition-transform
      "
    >
      <SafeImage
        src="https://cdn-icons-png.flaticon.com/512/724/724664.png"
        alt="Call"
        className="w-[45px] h-[45px] md:w-[45px] md:h-[45px]"
      />
    </div>
  );
};

export default CallIcon;
