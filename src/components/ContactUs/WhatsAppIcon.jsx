import React from "react";
import { SafeImage } from "../../lib/SafeImage";

const WhatsAppIcon = () => {
  const handleClick = () => {
    window.open("https://wa.me/9175978889", "_blank");
  };

  return (
    <div
      onClick={handleClick}
      className="
        fixed 
        top-[86vh] 
        right-5 
        z-50 
        cursor-pointer 
        rounded-full 
        hover:scale-110 
        transition-transform
      "
    >
      <SafeImage
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        className="w-[60px] h-[60px] md:w-[55px] md:h-[55px]"
      />
    </div>
  );
};

export default WhatsAppIcon;
