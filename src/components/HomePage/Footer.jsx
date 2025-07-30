// import React from "react";
// import {
//   FaFacebook,
//   FaTwitter,
//   FaLinkedin,
//   FaInstagram,
//   FaYoutube,
//   FaChevronDown,
// } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// const Footer = ({ activeLocation, setActiveLocation }) => {
//   const courses = useSelector((state) => state.courses.courseData);

//   const quickLinks = [
//     { label: "Home", to: "/" },
//     { label: "Courses", to: "#training-courses", hasDropdown: true },
//     { label: "About", to: "/about-us" },
//     { label: "Blogs", to: "/blog" },
//     { label: "Contact", to: "/contact" },
//   ];

//   const legalLinks = [
//     { label: "Terms of Service", to: "/terms" },
//     { label: "Privacy Policy", to: "/privacy" },
//     { label: "Refund Policy", to: "/refund" },
//   ];

//   const contactInfo = [
//     {
//       icon: <img src="/icons/mail.svg" alt="mail" className="w-4 h-4" />,
//       label: "info@itaccurate.com",
//       href: "mailto:info@itaccurata.com",
//     },
//     {
//       icon: <img src="/icons/phone.svg" alt="phone" className="w-4 h-4" />,
//       label: "09175978889",
//       href: "tel:09175978889",
//     },
//     {
//       icon: <img src="/icons/map-pin-icon.png" alt="map" className="w-5 h-5" />,
//       location: "Nagpur",
//       mapId: "nagpur",
//       address:
//         "607, 608 B-wing, Lokmat Bhavan, Lokmat Square, Ramdaspeth, Nagpur 440012 – ",
//       phone: "09175978889",
//       phoneLink: "tel:09175978889",
//       mapLink:
//         "https://www.google.com/maps/dir//607,+608+B-wing,+Lokmat+Bhavan,+Lokmat+Square,+Ramdaspeth,+Nagpur,+Maharashtra+440012",
//     },
//     {
//       icon: <img src="/icons/map-pin-icon.png" alt="map" className="w-5 h-5" />,
//       location: "Thane",
//       mapId: "thane",
//       address:
//         "Office No. 806, 8th Floor, Paradise Tower, next to McDonald's, Naupada, Thane West 400602 – ",
//       phone: "07738277389",
//       phoneLink: "tel:07738277389",
//       mapLink: "https://maps.app.goo.gl/gmcV17DF4sUR2VVj7",
//     },
//   ];

//   const socialLinks = [
//     { icon: <FaFacebook />, href: "https://www.facebook.com/itaccurate/" },
//     { icon: <FaInstagram />, href: "https://www.instagram.com/it.accurate/" },
//     {
//       icon: <FaYoutube />,
//       href: "https://www.youtube.com/channel/UCXZYBXNxKE02guTUKujOq7w",
//     },
//   ];

//   const handleLocationClick = (e, mapId) => {
//     e.preventDefault();
//     setActiveLocation(mapId);

//     // Force iframe reload in your contact section (if any)
//     const iframe = document.querySelector("#map-section iframe");
//     if (iframe) {
//       iframe.src = iframe.src.split("?")[0] + `?t=${Date.now()}`;
//     }

//     // Scroll into view
//     const section = document.getElementById("contact-us");
//     section?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <footer className="w-full bg-gray-50 dark:bg-black text-gray-800 dark:text-gray-200 pt-12 pb-6 shadow-lg transition-colors duration-300">
//       {/* Outer responsive padding wrapper */}
//       <div className="w-full ml-10 px-4 sm:px-6 lg:px-8 3xl:px-20 4xl:px-32 5xl:px-52 transition-all duration-300">
//         {/* Grid container up to 5xl */}
//         <div className="mx-auto w-full max-w-screen-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 3xl:gap-12 4xl:gap-16 5xl:gap-20">
//           {/* Brand & Quick Links */}
//           <div className="space-y-4">
//             <img
//               src="./logo.svg"
//               alt="IT Accurate Logo"
//               className="md:h-12 w-auto h-10"
//             />
//             <div className="space-y-2">
//               <h3 className="text-lg font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-indigo-500 after:rounded-full">
//                 Quick Links
//               </h3>
//               <ul className="space-y-2">
//                 {quickLinks.map((link, idx) => (
//                   <li key={idx} className="relative group">
//                     <Link
//                       to={link.to}
//                       className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 flex items-center"
//                     >
//                       <span className="group-hover:translate-x-1 transition-transform duration-200">
//                         {link.label}
//                       </span>
//                       {link.hasDropdown && (
//                         <FaChevronDown className="ml-1 text-xs opacity-70 group-hover:rotate-180 transition-transform duration-200" />
//                       )}
//                     </Link>
//                     {link.hasDropdown && (
//                       <div className="absolute left-0 bottom-full mb-1 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out transform -translate-y-1 group-hover:translate-y-0 border border-gray-100 dark:border-gray-700">
//                         {courses.map((course, i) => (
//                           <Link
//                             key={i}
//                             to={course.link}
//                             className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors duration-150 hover:text-indigo-600 dark:hover:text-indigo-400"
//                           >
//                             {course.title}
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Legal Links */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-indigo-500 after:rounded-full">
//               Legal
//             </h3>
//             <ul className="space-y-2">
//               {legalLinks.map((link, idx) => (
//                 <li key={idx}>
//                   <Link
//                     to={link.to}
//                     className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
//                   >
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-indigo-500 after:rounded-full">
//               Contact
//             </h3>
//             <ul className="space-y-3">
//               {contactInfo.map((item, idx) => (
//                 <li key={idx} className="flex items-start">
//                   <span className="text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0">
//                     {item.icon}
//                   </span>
//                   {item.href ? (
//                     <a
//                       href={item.href}
//                       className="ml-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
//                     >
//                       {item.label}
//                     </a>
//                   ) : (
//                     <div className="ml-2">
//                       <button
//                         onClick={(e) => handleLocationClick(e, item.mapId)}
//                         className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 ${
//                           activeLocation === item.mapId
//                             ? "font-bold text-indigo-600 dark:text-indigo-400"
//                             : ""
//                         }`}
//                       >
//                         {item.location}:
//                       </button>
//                       <p className="text-sm">
//                         <a
//                           href={item.mapLink}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="hover:underline hover:text-blue-900 dark:hover:text-blue-300"
//                         >
//                           {item.address}
//                         </a>
//                         <a href={item.phoneLink}>{item.phone}</a>
//                       </p>
//                     </div>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Social Media */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-indigo-500 after:rounded-full">
//               Follow Us
//             </h3>
//             <div className="flex space-x-4">
//               {socialLinks.map((link, idx) => (
//                 <a
//                   key={idx}
//                   href={link.href}
//                   className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-gray-900 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
//                 >
//                   {link.icon}
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom bar */}
//       <div className="w-full px-4 sm:px-6 lg:px-8 3xl:px-20 4xl:px-32 5xl:px-52 transition-all duration-300">
//         <div className="mx-auto w-full max-w-screen-5xl mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
//           <p>&copy; {new Date().getFullYear()} IT ACCURATE. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import React, { useContext } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaChevronDown,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useMapContext } from "../../lib/MapContext";

const Footer = ({ activeLocation, setActiveLocation }) => {
  const courses = useSelector((state) => state.courses.courseData);
  const { mapLocation, setMapLocation } = useMapContext();

  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "Courses", to: "#training-courses", hasDropdown: true },
    { label: "About", to: "/about-us" },
    { label: "Blogs", to: "/blog" },
    { label: "Contact", to: "/contact" },
  ];

  const legalLinks = [
    { label: "Terms of Service", to: "/terms" },
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Refund Policy", to: "/refund" },
  ];

  const contactInfo = [
    {
      icon: <img src="/icons/mail.svg" alt="mail" className="w-4 h-4" />,
      label: "info@itaccurate.com",
      href: "mailto:info@itaccurate.com",
    },
    {
      icon: <img src="/icons/phone.svg" alt="phone" className="w-4 h-4" />,
      label: "09175978889",
      href: "tel:09175978889",
    },
    {
      icon: <img src="/icons/map-pin-icon.png" alt="map" className="w-5 h-5" />,
      location: "Nagpur",
      mapId: "nagpur",
      address:
        "607, 608 B-wing, Lokmat Bhavan, Lokmat Square, Ramdaspeth, Nagpur 440012 – ",
      phone: "09175978889",
      phoneLink: "tel:09175978889",
      mapLink:
        "https://www.google.com/maps/place/Sapalogy+Training-+IT+ACCURATE/@21.135481,79.078029,2702m/data=!3m1!1e3!4m6!3m5!1s0x3bd4bf33b07e2643:0x1b45df16c0e6fa96!8m2!3d21.1354806!4d79.0780286!16s%2Fg%2F11ff0vtdt7!5m1!1e1?hl=en&entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      icon: <img src="/icons/map-pin-icon.png" alt="map" className="w-5 h-5" />,
      location: "Thane",
      mapId: "thane",
      address:
        "Office No. 806, 8th Floor, Paradise Tower, next to McDonald's, Naupada, Thane West 400602 – ",
      phone: "07738277389",
      phoneLink: "tel:07738277389",
      mapLink:
        "https://www.google.com/maps/place/IT+Accurate+%E2%80%93+SAP+%26+Data+Analytics+in+Thane/@19.1876259,72.9727232,17z/data=!4m14!1m7!3m6!1s0x3be7b90d997fd167:0x5439eb8e12dbc517!2sIT+Accurate+%E2%80%93+SAP+%26+Data+Analytics+in+Thane!8m2!3d19.1876209!4d72.9752981!16s%2Fg%2F11m606w0kg!3m5!1s0x3be7b90d997fd167:0x5439eb8e12dbc517!8m2!3d19.1876209!4d72.9752981!16s%2Fg%2F11m606w0kg?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D",
    },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: "https://www.facebook.com/itaccurate/" },
    { icon: <FaInstagram />, href: "https://www.instagram.com/it.accurate/" },
    {
      icon: <FaYoutube />,
      href: "https://www.youtube.com/channel/UCXZYBXNxKE02guTUKujOq7w",
    },
  ];

const handleLocationClick = (e, location) => {
  e.preventDefault();
  setMapLocation(location); // make sure this matches your location IDs
  const section = document.getElementById("contact-us");
  section?.scrollIntoView({ behavior: "smooth" });
};

  return (
    <footer className="w-full bg-gray-50 dark:bg-black text-gray-800 dark:text-gray-200 pt-12 pb-6 shadow-lg transition-colors duration-300">
      {/* Responsive outer padding */}
      <div className="w-full lg:ml-16 px-4 sm:px-6 lg:px-8 3xl:px-20 4xl:px-32 5xl:px-52 transition-all duration-300">
        {/* Constrain content up to 5xl */}
        <div className="max-w-screen-5xl mx-auto">
          {/* Mobile Accordion */}
          <div className="lg:hidden space-y-6">
            {/* Logo */}
            <div className="flex justify-center">
              <img src="./new-logo.png" alt="Logo" className="h-10 w-auto" />
            </div>
            {/* Quick Links */}
            <details className="border-b border-gray-200 dark:border-gray-700 pb-4 group">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="text-lg font-semibold">Quick Links</h3>
                <FaChevronDown className="text-xs opacity-70 transform group-open:rotate-180 transition-transform duration-200" />
              </summary>
              <ul className="mt-3 space-y-2 pl-2">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.to}
                      className="block py-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                    {link.hasDropdown && (
                      <div className="ml-4 mt-1 space-y-1">
                        {courses.map((c, idx) => (
                          <Link
                            key={idx}
                            to={c.link}
                            className="block text-sm py-1 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                          >
                            {c.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </details>
            {/* Legal */}
            <details className="border-b border-gray-200 dark:border-gray-700 pb-4 group">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="text-lg font-semibold">Legal</h3>
                <FaChevronDown className="text-xs opacity-70 transform group-open:rotate-180 transition-transform duration-200" />
              </summary>
              <ul className="mt-3 space-y-2 pl-2">
                {legalLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.to}
                      className="block py-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
            {/* Contact */}
            <details className="border-b border-gray-200 dark:border-gray-700 pb-4 group" open>
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="text-lg font-semibold">Contact</h3>
                <FaChevronDown className="text-xs opacity-70 transform group-open:rotate-180 transition-transform duration-200" />
              </summary>
              <ul className="mt-3 space-y-3 pl-2">
                {contactInfo.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0">
                      {item.icon}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="ml-2 break-words hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <div className="ml-2">
                        <button
                          onClick={(e) => handleLocationClick(e, item.location)}
                          className={`block text-left hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 ${
                            activeLocation === item.location ? "font-bold" : ""
                          }`}
                        >
                          {item.location}:
                        </button>
                        <p className="text-sm mt-1">
                          <a
                            href={item.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block hover:text-indigo-600 dark:hover:text-indigo-400"
                          >
                            {item.address}
                          </a>
                          <a
                            href={item.phoneLink}
                            className="block hover:text-indigo-600 dark:hover:text-indigo-400"
                          >
                            {item.phone}
                          </a>
                        </p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </details>
            {/* Social */}
            <div className="pb-4 text-center">
              <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
              <div className="flex justify-center space-x-4">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid grid-cols-4 gap-8 3xl:gap-12 4xl:gap-16 5xl:gap-20">
            {/* Brand & Quick */}
            <div className="space-y-4">
              <img src="./new-logo.png" alt="Logo" className="h-12 w-auto" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-indigo-500 after:rounded-full">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  {quickLinks.map((link, i) => (
                    <li key={i} className="relative group">
                      <Link
                        to={link.to}
                        className="flex items-center hover:text-indigo-600 transition-colors duration-200"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {link.label}
                        </span>
                        {link.hasDropdown && (
                          <FaChevronDown className="ml-1 text-xs opacity-70 group-hover:rotate-180 transition-transform duration-200" />
                        )}
                      </Link>
                      {link.hasDropdown && (
                        <div className="absolute left-0 bottom-full mb-1 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform -translate-y-1 group-hover:translate-y-0 border border-gray-100 dark:border-gray-700">
                          {courses.map((c, idx) => (
                            <Link
                              key={idx}
                              to={c.link}
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors duration-150 hover:text-indigo-600 dark:hover:text-indigo-400"
                            >
                              {c.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-indigo-500 after:rounded-full">
                Legal
              </h3>
              <ul className="space-y-2">
                {legalLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.to}
                      className="hover:text-indigo-600 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-indigo-500 after:rounded-full">
                Contact
              </h3>
              <ul className="space-y-3">
                {contactInfo.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0">
                      {item.icon}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="ml-2 hover:text-indigo-600 transition-colors duration-200"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <div className="ml-2">
                        <button
                          onClick={(e) => handleLocationClick(e, item.location)}
                          className={`hover:text-indigo-600 transition-colors duration-200${
                            activeLocation === item.location ? "font-bold" : ""
                          }`}
                        >
                          {item.location}:
                        </button>
                        <p className="text-sm mt-1">
                          <a
                            href={item.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block hover:text-indigo-600 hover:underline"
                          >
                            {item.address}
                          </a>
                          <a
                            href={item.phoneLink}
                            className="block hover:text-indigo-600"
                          >
                            {item.phone}
                          </a>
                        </p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-indigo-500 after:rounded-full">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} IT ACCURATE. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

