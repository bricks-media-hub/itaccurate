import React from 'react';
import {
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaInstagram,
    FaYoutube,
    FaChevronDown,
} from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Footer = ({ activeLocation, setActiveLocation }) => {
    const courses = useSelector((state) => state.courses.courseData);

    const quickLinks = [
        { label: 'Home', to: '/' },
        { label: 'Courses', to: '#training-courses', hasDropdown: true },
        { label: 'About', to: '/about-us' },
        { label: 'Blogs', to: '/blog' },
        { label: 'Contact', to: '/contact' },
    ];

    const legalLinks = [
        { label: 'Terms of Service', to: '/terms' },
        { label: 'Privacy Policy', to: '/privacy' },
        { label: 'Refund Policy', to: '/refund' },
    ];

    const contactInfo = [
        {
            icon: <img src="/icons/mail.svg" alt='mail' className='w-4 h-4' />,
            label: 'info@itaccurate.com',
            href: 'mailto:info@itaccurata.com',
        },
        {
            icon: <img src="/icons/phone.svg" alt='mail' className='w-4 h-4' />,
            label: '09175978889',
            href: 'tel:09175978889',
        },
        {
            icon: <img src="/icons/map-pin-icon.png" alt='mail' className='w-5 h-5' />,
            location: 'Nagpur',
            mapId: 'nagpur',
            address: '607, 608 B-wing, Lokmat Bhavan, Lokmat Square, Ramdaspehi, Nagpur Ph. - ',
            phone: '09175978889',
            phoneLink: 'tel:09175978889',
            mapLink: 'https://www.google.com/maps/dir//607,+608+B-wing,+Lokmat+Bhavan,+Lokmat+Square,+Ramdaspeth,+Nagpur,+Maharashtra+440012'
        },
        {
            icon: <img src="/icons/map-pin-icon.png" alt='mail' className='w-5 h-5' />,
            location: 'Thane',
            mapId: 'thane',
            address: "Office No. 806, 8th Floor, Paradise Tower, next to McDonald's, Naupada, Thane West Ph. - ",
            phone: '07738277389',
            phoneLink: 'tel:07738277389',
            mapLink: 'https://maps.app.goo.gl/gmcV17DF4sUR2VVj7'
        },
    ];


  const handleLocationClick = (e, mapId) => {
    e.preventDefault();
      console.log("Setting location to:", mapId); // Debug log
      console.log("Current location:", location); // Should print 'thane' when clicked
    setActiveLocation(mapId);

      // Force complete reload
  const iframe = document.querySelector('#map-section iframe');
  if (iframe) {
    iframe.src = iframe.src.split('?')[0] + `?t=${Date.now()}`;
  }
    
    // Update URL hash
    window.location.hash = mapId;
    
    // Scroll to contact section
    const contactSection = document.getElementById('contact-us');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Force iframe reload after a slight delay
    setTimeout(() => {
      const iframe = document.querySelector('#map-section iframe');
      if (iframe) {
        iframe.src = iframe.src;
      }
    }, 100);
  };

    const socialLinks = [
        { icon: <FaFacebook />, href: 'https://www.facebook.com/itaccurate/' },
        { icon: <FaInstagram />, href: 'https://www.instagram.com/it.accurate/' },
        { icon: <FaYoutube />, href: 'https://www.youtube.com/channel/UCXZYBXNxKE02guTUKujOq7w' },
    ];

    return (
        <footer className="bg-gray-50 dark:bg-black text-gray-800 dark:text-gray-200 pt-12 pb-6 px-4 sm:px-6 lg:px-8 shadow-lg transition-colors duration-300">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* Brand & Quick Links */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">IT ACCURATE</h2>
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-indigo-500 after:rounded-full">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link, index) => (
                                <li key={index} className="relative group">
                                    <Link to={link.to} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 flex items-center">
                                        <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                                        {link.hasDropdown && <FaChevronDown className="ml-1 text-xs opacity-70 group-hover:rotate-180 transition-transform duration-200" />}
                                    </Link>
                                    {link.hasDropdown && (
                                        <div className="absolute left-0 md:bottom-full mb-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                                            {courses.map((course, idx) => (
                                                <Link key={idx} to={``} className="block px-4 py-2 hover:bg-indigo-50 dark:hover:bg-gray-700">{course.title}</Link>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Legal Links */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-indigo-500 after:rounded-full">
                        Legal
                    </h3>
                    <ul className="space-y-2">
                        {legalLinks.map((link, index) => (
                            <li key={index}>
                                <Link to={link.to} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 flex items-center group">
                                    <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-indigo-500 after:rounded-full">
                        Contact
                    </h3>
                    <ul className="space-y-3">
                        {contactInfo.map((item, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0">{item.icon}</span>
                                {item.href ? (
                                    <a href={item.href} className="ml-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                                        {item.label}
                                    </a>
                                ) : (
                                    <div className="ml-2">
                                        {item.mapId ? (
                                            <div className="ml-2">
                                                <button
                                                    onClick={(e) => handleLocationClick(e, item.mapId)}
                                                    className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 ${activeLocation === item.mapId ? 'font-bold text-indigo-600 dark:text-indigo-400' : ''
                                                        }`}
                                                >
                                                    {item.location}:
                                                </button>
                                                <p className="text-sm">
                                                    <a href={item.mapLink} target="_blank" rel="noopener noreferrer">
                                                        {item.address}
                                                    </a>
                                                    <a href={item.phoneLink}>{item.phone}</a>
                                                </p>
                                            </div>
                                        ) : (
                                            item.location + ":"
                                        )}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social Media */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-indigo-500 after:rounded-full">
                        Follow Us
                    </h3>
                    <div className="flex space-x-4">
                        {socialLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-gray-900 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>&copy; {new Date().getFullYear()} IT ACCURATE. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;