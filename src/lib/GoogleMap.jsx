// const GoogleMap = () => {
//   return (
//     <iframe
//         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.4248194426546!2d79.07545367401244!3d21.135485584106757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4bf33b07e2643%3A0x1b45df16c0e6fa96!2sSapalogy%20Training!5e0!3m2!1sen!2sin!4v1732527721383!5m2!1sen!2sin"      className="w-full h-full border-0"
//       loading="lazy"
//       allowFullScreen
//       referrerPolicy="no-referrer-when-downgrade"
//     ></iframe>
//   );
// };

// export default GoogleMap;


const GoogleMap = ({ location = "nagpur" }) => {
  const mapUrls = {
    nagpur: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.4248194426546!2d79.07545367401244!3d21.135485584106757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4bf33b07e2643%3A0x1b45df16c0e6fa96!2sIT%20Accurate%20Nagpur!5e0!3m2!1sen!2sin!4v123456789!5m2!1sen!2sin",
    thane: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.258156825989!2d72.9769025740119!3d19.218944182024873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b9d6c8f6f8f9%3A0x1b45df16c0e6fa96!2sIT%20Accurate%20Thane!5e0!3m2!1sen!2sin!4v123456789!5m2!1sen!2sin"
  };

  return (
    <iframe
      key={location} // Important: force re-render when location changes
      src={mapUrls[location]}
      className="w-full h-full border-0"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      title={`Google Maps - ${location}`}
    />
  );
};

export default GoogleMap;