// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import {
//     FiSun,
//     FiMoon,
//     FiMenu,
//     FiX,
//     FiSearch,
//     FiBookOpen,
//     FiUser,
//     FiFileText,
//     FiBriefcase,
//     FiAward,
//     FiUsers,
//     FiMail,
//     FiChevronDown,
//     FiChevronUp,
//     FiArrowRight
// } from 'react-icons/fi';
// import { useSelector } from 'react-redux';
// import { HeaderSkeleton } from '../../ui/SkeletonEffects/HeaderSkeleton';
// import { Link } from 'react-router-dom';
// import MobileNavBar from './MobileNavBar';

// const NavBar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [darkMode, setDarkMode] = useState(false);
//     const [scrolled, setScrolled] = useState(false);
//     const [activeMenu, setActiveMenu] = useState(null);
//     const [activeSubMenu, setActiveSubMenu] = useState(null);
//     const [mobileActiveMenu, setMobileActiveMenu] = useState(null);
//     const [mobileActiveSubMenu, setMobileActiveSubMenu] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [hoverTimeout, setHoverTimeout] = useState(null);

//     // Check for saved theme preference
//     useEffect(() => {
//         const savedMode = localStorage.getItem('darkMode') === 'true';
//         setDarkMode(savedMode);
//         document.documentElement.classList.toggle('dark', savedMode);
//     }, []);

//     // Handle scroll effect
//     useEffect(() => {
//         const handleScroll = () => {
//             setScrolled(window.scrollY > 10);
//         };
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     const toggleDarkMode = () => {
//         const newMode = !darkMode;
//         setDarkMode(newMode);
//         localStorage.setItem('darkMode', newMode);
//         document.documentElement.classList.toggle('dark', newMode);
//     };

//     const handleMenuEnter = (menuName) => {
//         clearTimeout(hoverTimeout);
//         setActiveMenu(menuName);
//     };

//     const handleMenuLeave = () => {
//         // Only close if not hovering over submenu
//         const timeout = setTimeout(() => {
//             if (activeSubMenu === null) {
//                 setActiveMenu(null);
//             }
//         }, 150);
//         setHoverTimeout(timeout);
//     };

//     const handleSubMenuEnter = (subMenuName) => {
//         clearTimeout(hoverTimeout);
//         setActiveSubMenu(subMenuName);
//     };

//     const handleSubMenuLeave = () => {
//         const timeout = setTimeout(() => {
//             setActiveSubMenu(null);
//             // Close parent menu if not hovering over it
//             if (activeMenu === null) {
//                 setActiveSubMenu(null);
//             }
//         }, 150);
//         setHoverTimeout(timeout);
//     };

//     const handleDropdownEnter = () => {
//         clearTimeout(hoverTimeout);
//     };

//     const handleDropdownLeave = () => {
//         const timeout = setTimeout(() => {
//             setActiveMenu(null);
//             setActiveSubMenu(null);
//         }, 150);
//         setHoverTimeout(timeout);
//     };

//     const placementsSubMenu = [
//         {
//             menu: "Placements",
//             link: "/placed"
//         },
//         {
//             menu: "Jobs",
//             link: "/jobs-openings"
//         },
//         {
//             menu: "Career",
//             link: "/career"
//         }
//     ];

//     const navItems = [
//         { name: 'Courses', icon: <img src='/icons/book.svg' alt='book' />, path: '#courses', hasDropdown: true },
//         { name: 'About', icon: <img src='/icons/user.svg' alt='user' />, path: '/about-us' },
//         { name: 'Blog', icon: <img src='/icons/blog.svg' alt='blog' />, path: '/blog' },
//         {
//             name: 'Placements',
//             icon: <img src='/icons/badge.svg' alt='badge' />,
//             path: '#placements',
//             hasDropdown: true,
//             subMenu: placementsSubMenu
//         },
//         { name: 'Contact', icon: <img src='/icons/mail.svg' alt='mail' />, path: '/contact' },
//     ];

//     const menuItems = useSelector((state) => state.navbar.menuItems);
//     const loading = useSelector((state) => state.navbar.status);
//     const error = useSelector((state) => state.navbar.error);

//     if (loading === 'loading') {
//         return <HeaderSkeleton />;
//     }

//     if (error) {
//         return <div className="text-center text-red-500">Error: {error}</div>;
//     }

//     return (
//         <header
//             className={`fixed top-0 z-50 w-full px-2 md:px-0 transition-all duration-300 ${scrolled
//                     ? 'dark:bg-gray-900 bg-white md:w-[96%] md:ml-7 md:mt-3 md:rounded-xl shadow-lg border dark:border-0'
//                     : 'dark:bg-gray-900 bg-white shadow-md'
//                 }`}
//         >
//             <div className={`transition-all duration-300 ${scrolled ? 'max-w-screen-xl mx-auto md:px-10' : 'w-full md:px-4'}`}>
//                 <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//                     {/* Logo */}
//                     <Link to="/" className="flex items-center md:-ml-14">
//                         <img src="./logo.svg" alt="IT Accurate Logo" className="h-10 w-auto md:hidden" />
//                         <img src="./logo.svg" alt="IT Accurate Logo" className="h-16 w-auto hidden md:block" />
//                     </Link>

//                     {/* Desktop Navigation */}
//                     <nav className="hidden md:flex items-center space-x-2 relative z-50">
//                         {navItems.map((item) => (
//                             <div key={item.name} className="relative group">
//                                 <Link
//                                     to={item.path}
//                                     className="px-3 py-2 rounded-md text-lg font-medium dark:text-gray-300 text-gray-700 hover:dark:bg-gray-800 hover:bg-gray-100 transition-colors duration-200 flex items-center"
//                                     onMouseEnter={() => item.hasDropdown && handleMenuEnter(item.name)}
//                                     onMouseLeave={() => item.hasDropdown && handleMenuLeave()}
//                                 >
//                                     <span className="mr-2 w-6 h-6">{item.icon}</span>
//                                     {item.name}
//                                     {item.hasDropdown && (
//                                         <span className="ml-1">
//                                             {activeMenu === item.name ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
//                                         </span>
//                                     )}
//                                 </Link>

//                                 {/* Dropdown */}
//                                 {item.hasDropdown && (
//                                     <motion.div
//                                         initial={{ opacity: 0, y: 10 }}
//                                         animate={{
//                                             opacity: activeMenu === item.name ? 1 : 0,
//                                             y: activeMenu === item.name ? 0 : 10,
//                                             visibility: activeMenu === item.name ? 'visible' : 'hidden',
//                                         }}
//                                         transition={{ duration: 0.2, ease: 'easeOut' }}
//                                         className={`absolute left-0 mt-1 ${item.name === 'Courses' ? 'w-[700px] grid grid-cols-2 gap-2 p-4'
//                                                 : 'w-56 p-2'} bg-slate-50/75 dark:bg-gray-800/75 backdrop-blur-sm rounded-lg shadow-xl z-50 border border-gray-200/70 dark:border-gray-700/50`}
//                                         onMouseEnter={handleDropdownEnter}
//                                         onMouseLeave={handleDropdownLeave}
//                                     >
//                                         {item.name === 'Courses'
//                                             ? menuItems.map((course) => (
//                                                 <Link to={course.link} key={course.title}>
//                                                     <div
//                                                         className="relative group"
//                                                         onMouseEnter={() => course.subMenu && handleSubMenuEnter(course.title)}
//                                                         onMouseLeave={handleSubMenuLeave}
//                                                     >
//                                                         <div
//                                                             className={`p-3 rounded-lg flex items-start hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${activeSubMenu === course.title ? 'bg-gray-100 dark:bg-gray-700' : ''
//                                                                 }`}
//                                                         >
//                                                             <img src={course.icon} alt="icon" className="w-9 h-9 mt-2 mr-3" />
//                                                             <div className="flex-1">
//                                                                 <h3 className="font-medium dark:text-white text-gray-800">{course.title}</h3>
//                                                                 <p className="text-sm text-gray-500 dark:text-gray-400">{course.description}</p>
//                                                             </div>
//                                                             {course.subMenu && <FiArrowRight className="ml-2 text-gray-400 self-center" />}
//                                                         </div>

//                                                         {course.subMenu && (
//                                                             <motion.div
//                                                                 initial={{ opacity: 0, x: course.position === 'left' ? 10 : -10 }}
//                                                                 animate={{
//                                                                     opacity: activeSubMenu === course.title ? 1 : 0,
//                                                                     x: activeSubMenu === course.title ? 0 : course.position === 'left' ? 10 : -10,
//                                                                     visibility: activeSubMenu === course.title ? 'visible' : 'hidden',
//                                                                 }}
//                                                                 transition={{ duration: 0.2, ease: 'easeOut' }}
//                                                                 className={`absolute ${course.position === 'left' ? 'right-full mr-2' : 'left-full ml-2'
//                                                                     } top-0 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 z-50 border max-h-96 overflow-y-auto`}
//                                                                 onMouseEnter={() => handleSubMenuEnter(course.title)}
//                                                                 onMouseLeave={handleSubMenuLeave}
//                                                             >
//                                                                 <h4 className="font-semibold text-gray-800 dark:text-white mb-2 px-2">
//                                                                     {course.title} Courses
//                                                                 </h4>
//                                                                 <ul className="space-y-1">
//                                                                     {course.subMenu.map((subItem) => (
//                                                                         <li key={subItem.title}>
//                                                                             <Link
//                                                                                 to={subItem.link}
//                                                                                 className="block px-3 py-2 rounded-md text-sm dark:text-gray-300 text-gray-700 hover:dark:bg-gray-700 hover:bg-gray-100"
//                                                                             >
//                                                                                 {subItem.title}
//                                                                             </Link>
//                                                                         </li>
//                                                                     ))}
//                                                                 </ul>
//                                                             </motion.div>
//                                                         )}
//                                                     </div>
//                                                 </Link>
//                                             ))
//                                             : item.name === 'Placements' && (
//                                                 <ul className="space-y-1">
//                                                     {item.subMenu.map((subItem) => (
//                                                         <li key={subItem.menu}>
//                                                             <Link
//                                                                 to={subItem.link}
//                                                                 className="block px-3 py-2 rounded-md text-sm dark:text-gray-300 text-gray-700 hover:dark:bg-gray-700 hover:bg-gray-100"
//                                                             >
//                                                                 {subItem.menu}
//                                                             </Link>
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             )}
//                                     </motion.div>
//                                 )}
//                             </div>
//                         ))}
//                     </nav>

//                     {/* Right Section */}
//                     <div className="flex items-center space-x-2 md:-mr-14">
//                         <div className="relative hidden md:block">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                 <FiSearch className="h-5 w-5 text-gray-400" />
//                             </div>
//                             <input
//                                 type="text"
//                                 placeholder="Search..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="pl-10 pr-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
//                             />
//                         </div>

//                         {/* Dark/Light Mode */}
//                         <button
//                             onClick={toggleDarkMode}
//                             className="ml-2 p-2 rounded-full dark:text-yellow-300 text-gray-700 hover:dark:bg-gray-800 hover:bg-gray-100"
//                             aria-label="Toggle dark mode"
//                         >
//                             <motion.div animate={{ rotate: darkMode ? 180 : 0 }} transition={{ duration: 0.5 }}>
//                                 <img
//                                     src={darkMode ? '/icons/sun.svg' : '/icons/moon.svg'}
//                                     alt="mode toggle"
//                                     className="w-7 h-7"
//                                 />
//                             </motion.div>
//                         </button>

//                         {/* Mobile Menu Button */}
//                         <div className="md:hidden flex items-center">
//                             <button
//                                 onClick={() => {
//                                     setIsOpen(!isOpen);
//                                     if (isOpen) {
//                                         setMobileActiveMenu(null);
//                                         setMobileActiveSubMenu(null);
//                                     }
//                                 }}
//                                 className="ml-2 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
//                                 aria-label="Toggle menu"
//                             >
//                                 {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Mobile Navigation */}
//                 <MobileNavBar
//                     isOpen={isOpen}
//                     setIsOpen={setIsOpen}
//                     navItems={navItems}
//                     mobileActiveMenu={mobileActiveMenu}
//                     setMobileActiveMenu={setMobileActiveMenu}
//                     mobileActiveSubMenu={mobileActiveSubMenu}
//                     setMobileActiveSubMenu={setMobileActiveSubMenu}
//                 />
//             </div>
//         </header>
//     );
// };

// export default NavBar;




















// import { useState, useEffect } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import {
//     FiSun,
//     FiMoon,
//     FiMenu,
//     FiX,
//     FiSearch,
//     FiBookOpen,
//     FiUser,
//     FiFileText,
//     FiBriefcase,
//     FiAward,
//     FiUsers,
//     FiMail,
//     FiChevronDown,
//     FiChevronUp,
//     FiArrowRight
// } from 'react-icons/fi';
// import { useSelector } from 'react-redux';
// import { HeaderSkeleton } from '../../ui/SkeletonEffects/HeaderSkeleton';
// import { Link } from 'react-router-dom';
// import MobileNavBar from './MobileNavBar';

// const NavBar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [darkMode, setDarkMode] = useState(false);
//     const [scrolled, setScrolled] = useState(false);
//     const [activeMenu, setActiveMenu] = useState(null);
//     const [activeSubMenu, setActiveSubMenu] = useState(null);
//     const [mobileActiveMenu, setMobileActiveMenu] = useState(null);
//     const [mobileActiveSubMenu, setMobileActiveSubMenu] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [hoverTimeout, setHoverTimeout] = useState(null);

//     // Check for saved theme preference
//     useEffect(() => {
//         const savedMode = localStorage.getItem('darkMode') === 'true';
//         setDarkMode(savedMode);
//         document.documentElement.classList.toggle('dark', savedMode);
//     }, []);

//     // Handle scroll effect
//     useEffect(() => {
//         const handleScroll = () => {
//             setScrolled(window.scrollY > 10);
//         };
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     const toggleDarkMode = () => {
//         const newMode = !darkMode;
//         setDarkMode(newMode);
//         localStorage.setItem('darkMode', newMode);
//         document.documentElement.classList.toggle('dark', newMode);
//     };

//     const handleMenuEnter = (menuName) => {
//         clearTimeout(hoverTimeout);
//         setActiveMenu(menuName);
//     };

//     const handleMenuLeave = () => {
//         // Only close if not hovering over submenu
//         const timeout = setTimeout(() => {
//             if (activeSubMenu === null) {
//                 setActiveMenu(null);
//             }
//         }, 150);
//         setHoverTimeout(timeout);
//     };

//     const handleSubMenuEnter = (subMenuName) => {
//         clearTimeout(hoverTimeout);
//         setActiveSubMenu(subMenuName);
//     };

//     const handleSubMenuLeave = () => {
//         const timeout = setTimeout(() => {
//             setActiveSubMenu(null);
//             // Close parent menu if not hovering over it
//             if (activeMenu === null) {
//                 setActiveSubMenu(null);
//             }
//         }, 150);
//         setHoverTimeout(timeout);
//     };

//     const handleDropdownEnter = () => {
//         clearTimeout(hoverTimeout);
//     };

//     const handleDropdownLeave = () => {
//         const timeout = setTimeout(() => {
//             setActiveMenu(null);
//             setActiveSubMenu(null);
//         }, 150);
//         setHoverTimeout(timeout);
//     };

//     const placementsSubMenu = [
//         {
//             menu: "Placements",
//             link: "/placed"
//         },
//         {
//             menu: "Jobs",
//             link: "/jobs-openings"
//         },
//         {
//             menu: "Career",
//             link: "/career"
//         }
//     ];

//     const navItems = [
//         { name: 'Courses', icon: <img src='/icons/book.svg' alt='book' />, path: '#courses', hasDropdown: true },
//         { name: 'About', icon: <img src='/icons/user.svg' alt='user' />, path: '/about-us' },
//         { name: 'Blog', icon: <img src='/icons/blog.svg' alt='blog' />, path: '/blog' },
//         {
//             name: 'Placements',
//             icon: <img src='/icons/badge.svg' alt='badge' />,
//             path: '#placements',
//             hasDropdown: true,
//             subMenu: placementsSubMenu
//         },
//         { name: 'Contact', icon: <img src='/icons/mail.svg' alt='mail' />, path: '/contact' },
//     ];

//     const menuItems = useSelector((state) => state.navbar.menuItems);
//     const loading = useSelector((state) => state.navbar.status);
//     const error = useSelector((state) => state.navbar.error);

//     if (loading === 'loading') {
//         return <HeaderSkeleton />;
//     }

//     if (error) {
//         return <div className="text-center text-red-500">Error: {error}</div>;
//     }

//     return (
//         <header
//             className={`fixed top-0 z-50 transition-all duration-300 px-2 md:px-0 ${scrolled
//                 ? 'dark:bg-gray-900 bg-white md:w-[96%] md:ml-7 md:mt-3 mt-0 w-full md:rounded-xl shadow-lg border dark:border-0'
//                 : 'dark:bg-gray-900 bg-white shadow-md w-full'
//                 }`}
//         >
//             <div
//                 className={`transition-all duration-300 ${scrolled
//                     ? 'max-w-screen-xl mx-auto md:px-10 md:rounded-none'
//                     : 'w-full md:px-4 rounded-xl'
//                     }`}
//             >
//                 <div className="container mx-auto px-4 py-3">
//                     <div className="flex justify-between items-center">
//                         {/* Logo */}
//                         <div className="flex items-center">
//                             <Link to="/" className="flex items-center">
//                                 {/* Mobile logo */}
//                                 {/* <img
//                                     src="./small-logo.svg"  
//                                     alt="IT Accurate Logo"
//                                     className="h-10 w-auto md:hidden"  /
//                                 /> */}

//                                 {/* Desktop logo */}
//                                 <img
//                                     src="./logo.svg"
//                                     alt="IT Accurate Logo"
//                                     className="md:h-12 w-auto h-10"
//                                 />
//                             </Link>
//                         </div>

//                         {/* Desktop Navigation */}
//                         <nav className="hidden md:flex items-center space-x-1 relative z-50">
//                             {navItems.map((item) => (
//                                 <div
//                                     key={item.name}
//                                     className="relative group"
//                                 >
//                                     <Link
//                                         to={item.path}
//                                         className="px-3 py-2 rounded-md text-sm font-medium dark:text-gray-300 text-gray-700 hover:dark:bg-gray-800 hover:bg-gray-100 transition-colors duration-200 flex items-center cursor-pointer"
//                                         onMouseEnter={() => item.hasDropdown && handleMenuEnter(item.name)}
//                                         onMouseLeave={() => item.hasDropdown && handleMenuLeave()}
//                                     >
//                                         <span className="mr-2 md:w-6 md:h-6 sm:w-5 sm:h-5">
//                                             {item.icon}
//                                         </span>
//                                         {item.name}
//                                         {item.hasDropdown && (
//                                             <span className="ml-1">
//                                                 {activeMenu === item.name ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
//                                             </span>
//                                         )}
//                                     </Link>

//                                     {/* Dropdown Container */}
//                                     {item.hasDropdown && (
//                                         <motion.div
//                                             initial={{ opacity: 0, y: 10 }}
//                                             animate={{
//                                                 opacity: activeMenu === item.name ? 1 : 0,
//                                                 y: activeMenu === item.name ? 0 : 10,
//                                                 visibility: activeMenu === item.name ? 'visible' : 'hidden'
//                                             }}
//                                             transition={{ duration: 0.2, ease: 'easeOut' }}
//                                             className={`absolute left-0 mt-1 ${item.name === 'Courses'
//                                                 ? 'lg:left-[-30vh] w-[700px] p-4 grid grid-cols-2 gap-2'
//                                                 : 'w-56 p-2'
//                                                 } bg-slate-50/75 dark:bg-gray-800/75 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 rounded-lg shadow-xl z-50 border border-gray-200/70 dark:border-gray-700/50`}
//                                             onMouseEnter={handleDropdownEnter}
//                                             onMouseLeave={handleDropdownLeave}
//                                         >
//                                             {/* Courses Dropdown */}
//                                             {item.name === 'Courses' && (
//                                                 <>
//                                                     {menuItems.map((course) => (
//                                                         <Link to={course.link} key={course.title}>
//                                                             <div
//                                                                 className="relative group"
//                                                                 onMouseEnter={() => course.subMenu && handleSubMenuEnter(course.title)}
//                                                                 onMouseLeave={handleSubMenuLeave}
//                                                             >
//                                                                 <div
//                                                                     className={`p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-start ${activeSubMenu === course.title ? 'bg-gray-100 dark:bg-gray-700' : ''
//                                                                         }`}
//                                                                 >
//                                                                     <span className="text-2xl mr-3 text-purple-600 dark:text-purple-400">
//                                                                         <img src={course.icon} alt='course icon' className='w-9 h-9 mt-2' />
//                                                                     </span>
//                                                                     <div className="flex-1">
//                                                                         <h3 className="font-medium dark:text-white text-gray-800">{course.title}</h3>
//                                                                         <p className="text-sm text-gray-500 dark:text-gray-400">{course.description}</p>
//                                                                     </div>
//                                                                     {course.subMenu && (
//                                                                         <FiArrowRight className="ml-2 text-gray-400 self-center" />
//                                                                     )}
//                                                                 </div>

//                                                                 {/* Sub-menu Dropdown */}
//                                                                 {course.subMenu && (
//                                                                     <motion.div
//                                                                         initial={{
//                                                                             opacity: 0, x: course.position ===
//                                                                                 'left' ? 10 : -10
//                                                                         }}
//                                                                         animate={{
//                                                                             opacity: activeSubMenu === course.title ?
//                                                                                 1 : 0,
//                                                                             x: activeSubMenu === course.title ? 0 : (course.position === 'left' ? 10 : -10),
//                                                                             visibility: activeSubMenu === course.title ? 'visible' : 'hidden'
//                                                                         }}
//                                                                         transition={{ duration: 0.2, ease: 'easeOut' }}
//                                                                         className={`absolute ${course.position === 'left' ? 'right-full mr-2' : 'left-full ml-2'
//                                                                             } top-0 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 z-50 border border-gray-200/50 dark:border-gray-700/50 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800`}
//                                                                         onMouseEnter={() => handleSubMenuEnter(course.title)}
//                                                                         onMouseLeave={handleSubMenuLeave}
//                                                                     >
//                                                                         <h4 className="font-semibold text-gray-800 dark:text-white mb-2 px-2">
//                                                                             {course.title} Courses
//                                                                         </h4>
//                                                                         <ul className="space-y-1">
//                                                                             {course.subMenu.map((subItem) => (
//                                                                                 <li key={subItem.title}>
//                                                                                     <Link
//                                                                                         to={subItem.link}
//                                                                                         className="block px-3 py-2 rounded-md text-sm dark:text-gray-300 text-gray-700 hover:dark:bg-gray-700 hover:bg-gray-100 transition-colors duration-200"
//                                                                                     >
//                                                                                         {subItem.title}
//                                                                                     </Link>
//                                                                                 </li>
//                                                                             ))}
//                                                                         </ul>
//                                                                     </motion.div>
//                                                                 )}
//                                                             </div>
//                                                         </Link>
//                                                     ))}
//                                                 </>
//                                             )}

//                                             {/* Placements Dropdown */}
//                                             {item.name === 'Placements' && (
//                                                 <ul className="space-y-1">
//                                                     {item.subMenu.map((subItem) => (
//                                                         <li key={subItem}>
//                                                             <Link to={subItem.link}
//                                                                 className="block px-3 py-2 rounded-md text-sm dark:text-gray-300 text-gray-700 hover:dark:bg-gray-700 hover:bg-gray-100 transition-colors duration-200"
//                                                             >
//                                                                 {subItem.menu}
//                                                             </Link>
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             )}
//                                         </motion.div>
//                                     )}
//                                 </div>
//                             ))}

//                             {/* Search Bar */}
//                             <div className="relative ml-4">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">                                    <FiSearch className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     type="text"
//                                     className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 dark:bg-gray-700 bg-gray-100 dark:text-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all duration-200"
//                                     placeholder="Search..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                 />
//                             </div>

//                             {/* Dark/Light Mode Toggle */}
//                             <button
//                                 onClick={toggleDarkMode}
//                                 className="ml-4 p-2 rounded-full dark:text-yellow-300 text-gray-700 hover:dark:bg-gray-800 hover:bg-gray-100 transition-colors duration-200"
//                                 aria-label="Toggle dark mode"
//                             >
//                                 <motion.div
//                                     animate={{ rotate: darkMode ? 180 : 0 }}
//                                     transition={{ duration: 0.5 }}
//                                 >
//                                     {darkMode ? <img src='/icons/sun.svg' alt='sun' className='w-7 h-7' /> : <img src='/icons/moon.svg' alt='moon' className='w-7 h-7' />}
//                                 </motion.div>
//                             </button>
//                         </nav>

//                         {/* Mobile */}
//                         <div className="md:hidden flex items-center">
//                             <button
//                                 onClick={toggleDarkMode}
//                                 className="mr-4 p-2 rounded-full dark:text-yellow-300 text-gray-700 hover:dark:bg-gray-800 hover:bg-gray-100 transition-colors"
//                                 aria-label="Toggle dark mode"
//                             >
//                                 {darkMode ? <img src='/icons/sun.svg' alt='sun' className='w-5 h-5' /> : <img src='/icons/moon.svg' alt='moon' className='w-5 h-5' />}
//                             </button>
//                             {/* mobile menu button */}
//                             <button
//                                 onClick={() => {
//                                     setIsOpen(!isOpen);
//                                     if (isOpen) {
//                                         setMobileActiveMenu(null);
//                                         setMobileActiveSubMenu(null);
//                                     }
//                                 }}
//                                 className="p-2 rounded-md dark:text-gray-300 text-gray-700 focus:outline-none transition-colors"
//                                 aria-label="Toggle menu"
//                             >
//                                 <motion.div
//                                     animate={{
//                                         rotate: isOpen ? 180 : 0,
//                                         scale: isOpen ? 1.2 : 1,
//                                     }}
//                                     transition={{
//                                         type: "spring",
//                                         stiffness: 260,
//                                         damping: 20,
//                                     }}
//                                 >
//                                     {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//                                 </motion.div>
//                             </button>

//                         </div>
//                     </div>

//                     {/* Mobile Navigation */}
//                     <MobileNavBar
//                         isOpen={isOpen}
//                         setIsOpen={setIsOpen}
//                         navItems={navItems}
//                         mobileActiveMenu={mobileActiveMenu}
//                         setMobileActiveMenu={setMobileActiveMenu}
//                         mobileActiveSubMenu={mobileActiveSubMenu}
//                         setMobileActiveSubMenu={setMobileActiveSubMenu}
//                     />
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default NavBar;


// src/components/Navbar/NavBar.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import MobileNav from './MobileNav';

const NavBar = ({ menuItems = [], placementsSubMenu = [] }) => {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Persist theme
  useEffect(() => {
    const saved = localStorage.getItem('darkMode') === 'true';
    setDarkMode(saved);
    document.documentElement.classList.toggle('dark', saved);
  }, []);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('darkMode', next);
    document.documentElement.classList.toggle('dark', next);
  };

  const navLinks = [
    { name: 'Products', path: '/products' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Resources', path: '/resources' },
    { name: 'Developers', path: '/developers' },
    { name: 'Pricing', path: '/pricing' },
  ];

  return (
    <header
      className={`
        fixed top-0 w-full z-50 transition-all duration-300
        ${scrolled ? 'backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 shadow-md' : 'bg-transparent'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {link.name}
              </Link>
            ))}

            {/* Example dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setOpenMenu('products')}
                onMouseLeave={() => setOpenMenu(null)}
                className="flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Features
                <span className="ml-1">
                  {openMenu === 'products' ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              </button>
              <AnimatePresence>
                {openMenu === 'products' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseEnter={() => setOpenMenu('products')}
                    onMouseLeave={() => setOpenMenu(null)}
                    className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700"
                  >
                    <Link
                      to="/feature-a"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Feature A
                    </Link>
                    <Link
                      to="/feature-b"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Feature B
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search…"
                className="pl-10 pr-4 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDark}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? '🌞' : '🌙'}
            </button>
            <Link
              to="/signin"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Sign In
            </Link>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <MobileNav isOpen={mobileOpen} navLinks={navLinks} />
    </header>
  );
};

export default NavBar;
