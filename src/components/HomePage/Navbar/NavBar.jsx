import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FiSun,
    FiMoon,
    FiMenu,
    FiX,
    FiSearch,
    FiBookOpen,
    FiUser,
    FiFileText,
    FiBriefcase,
    FiAward,
    FiUsers,
    FiMail,
    FiChevronDown,
    FiChevronUp,
    FiArrowRight
} from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { HeaderSkeleton } from '../../ui/SkeletonEffects/HeaderSkeleton';
import { Link } from 'react-router-dom';
import MobileNavBar from './MobileNavBar';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [mobileActiveMenu, setMobileActiveMenu] = useState(null);
    const [mobileActiveSubMenu, setMobileActiveSubMenu] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [hoverTimeout, setHoverTimeout] = useState(null);

    // Check for saved theme preference
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedMode);
        document.documentElement.classList.toggle('dark', savedMode);
    }, []);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', newMode);
        document.documentElement.classList.toggle('dark', newMode);
    };

    const handleMenuEnter = (menuName) => {
        clearTimeout(hoverTimeout);
        setActiveMenu(menuName);
    };

    const handleMenuLeave = () => {
        // Only close if not hovering over submenu
        const timeout = setTimeout(() => {
            if (activeSubMenu === null) {
                setActiveMenu(null);
            }
        }, 150);
        setHoverTimeout(timeout);
    };

    const handleSubMenuEnter = (subMenuName) => {
        clearTimeout(hoverTimeout);
        setActiveSubMenu(subMenuName);
    };

    const handleSubMenuLeave = () => {
        const timeout = setTimeout(() => {
            setActiveSubMenu(null);
            // Close parent menu if not hovering over it
            if (activeMenu === null) {
                setActiveSubMenu(null);
            }
        }, 150);
        setHoverTimeout(timeout);
    };

    const handleDropdownEnter = () => {
        clearTimeout(hoverTimeout);
    };

    const handleDropdownLeave = () => {
        const timeout = setTimeout(() => {
            setActiveMenu(null);
            setActiveSubMenu(null);
        }, 150);
        setHoverTimeout(timeout);
    };

    const placementsSubMenu = [
        {
            menu: "Placements",
            link: "/placed"
        },
        {
            menu: "Jobs",
            link: "/jobs-openings"
        },
        {
            menu: "Career",
            link: "/career"
        }
    ];

    const navItems = [
        { name: 'Courses', icon: <img src='/icons/book.svg' alt='book' />, path: '#courses', hasDropdown: true },
        { name: 'About', icon: <img src='/icons/user.svg' alt='user' />, path: '/about-us' },
        { name: 'Blog', icon: <img src='/icons/blog.svg' alt='blog' />, path: '/blog' },
        {
            name: 'Placements',
            icon: <img src='/icons/badge.svg' alt='badge' />,
            path: '#placements',
            hasDropdown: true,
            subMenu: placementsSubMenu
        },
        { name: 'Contact', icon: <img src='/icons/mail.svg' alt='mail' />, path: '/contact' },
    ];

    const menuItems = useSelector((state) => state.navbar.menuItems);
    const loading = useSelector((state) => state.navbar.status);
    const error = useSelector((state) => state.navbar.error);

    if (loading === 'loading') {
        return <HeaderSkeleton />;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    return (
        <header
            className={`fixed top-0 z-50 w-full px-2 md:px-0 transition-all duration-300 ${scrolled
                    ? 'dark:bg-gray-900 bg-white md:w-[96%] md:ml-7 md:mt-3 md:rounded-xl shadow-lg border dark:border-0'
                    : 'dark:bg-gray-900 bg-white shadow-md'
                }`}
        >
            <div className={`transition-all duration-300 ${scrolled ? 'max-w-screen-xl mx-auto md:px-10' : 'w-full md:px-4'}`}>
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center md:-ml-14">
                        <img src="./logo.svg" alt="IT Accurate Logo" className="h-10 w-auto md:hidden" />
                        <img src="./logo.svg" alt="IT Accurate Logo" className="h-16 w-auto hidden md:block" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-2 relative z-50">
                        {navItems.map((item) => (
                            <div key={item.name} className="relative group">
                                <Link
                                    to={item.path}
                                    className="px-3 py-2 rounded-md text-lg font-medium dark:text-gray-300 text-gray-700 hover:dark:bg-gray-800 hover:bg-gray-100 transition-colors duration-200 flex items-center"
                                    onMouseEnter={() => item.hasDropdown && handleMenuEnter(item.name)}
                                    onMouseLeave={() => item.hasDropdown && handleMenuLeave()}
                                >
                                    <span className="mr-2 w-6 h-6">{item.icon}</span>
                                    {item.name}
                                    {item.hasDropdown && (
                                        <span className="ml-1">
                                            {activeMenu === item.name ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                                        </span>
                                    )}
                                </Link>

                                {/* Dropdown */}
                                {item.hasDropdown && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{
                                            opacity: activeMenu === item.name ? 1 : 0,
                                            y: activeMenu === item.name ? 0 : 10,
                                            visibility: activeMenu === item.name ? 'visible' : 'hidden',
                                        }}
                                        transition={{ duration: 0.2, ease: 'easeOut' }}
                                        className={`absolute left-0 mt-1 ${item.name === 'Courses' ? 'w-[700px] grid grid-cols-2 gap-2 p-4'
                                                : 'w-56 p-2'} bg-slate-50/75 dark:bg-gray-800/75 backdrop-blur-sm rounded-lg shadow-xl z-50 border border-gray-200/70 dark:border-gray-700/50`}
                                        onMouseEnter={handleDropdownEnter}
                                        onMouseLeave={handleDropdownLeave}
                                    >
                                        {item.name === 'Courses'
                                            ? menuItems.map((course) => (
                                                <Link to={course.link} key={course.title}>
                                                    <div
                                                        className="relative group"
                                                        onMouseEnter={() => course.subMenu && handleSubMenuEnter(course.title)}
                                                        onMouseLeave={handleSubMenuLeave}
                                                    >
                                                        <div
                                                            className={`p-3 rounded-lg flex items-start hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${activeSubMenu === course.title ? 'bg-gray-100 dark:bg-gray-700' : ''
                                                                }`}
                                                        >
                                                            <img src={course.icon} alt="icon" className="w-9 h-9 mt-2 mr-3" />
                                                            <div className="flex-1">
                                                                <h3 className="font-medium dark:text-white text-gray-800">{course.title}</h3>
                                                                <p className="text-sm text-gray-500 dark:text-gray-400">{course.description}</p>
                                                            </div>
                                                            {course.subMenu && <FiArrowRight className="ml-2 text-gray-400 self-center" />}
                                                        </div>

                                                        {course.subMenu && (
                                                            <motion.div
                                                                initial={{ opacity: 0, x: course.position === 'left' ? 10 : -10 }}
                                                                animate={{
                                                                    opacity: activeSubMenu === course.title ? 1 : 0,
                                                                    x: activeSubMenu === course.title ? 0 : course.position === 'left' ? 10 : -10,
                                                                    visibility: activeSubMenu === course.title ? 'visible' : 'hidden',
                                                                }}
                                                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                                                className={`absolute ${course.position === 'left' ? 'right-full mr-2' : 'left-full ml-2'
                                                                    } top-0 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 z-50 border max-h-96 overflow-y-auto`}
                                                                onMouseEnter={() => handleSubMenuEnter(course.title)}
                                                                onMouseLeave={handleSubMenuLeave}
                                                            >
                                                                <h4 className="font-semibold text-gray-800 dark:text-white mb-2 px-2">
                                                                    {course.title} Courses
                                                                </h4>
                                                                <ul className="space-y-1">
                                                                    {course.subMenu.map((subItem) => (
                                                                        <li key={subItem.title}>
                                                                            <Link
                                                                                to={subItem.link}
                                                                                className="block px-3 py-2 rounded-md text-sm dark:text-gray-300 text-gray-700 hover:dark:bg-gray-700 hover:bg-gray-100"
                                                                            >
                                                                                {subItem.title}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                </Link>
                                            ))
                                            : item.name === 'Placements' && (
                                                <ul className="space-y-1">
                                                    {item.subMenu.map((subItem) => (
                                                        <li key={subItem.menu}>
                                                            <Link
                                                                to={subItem.link}
                                                                className="block px-3 py-2 rounded-md text-sm dark:text-gray-300 text-gray-700 hover:dark:bg-gray-700 hover:bg-gray-100"
                                                            >
                                                                {subItem.menu}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center space-x-2 md:-mr-14">
                        <div className="relative hidden md:block">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>

                        {/* Dark/Light Mode */}
                        <button
                            onClick={toggleDarkMode}
                            className="ml-2 p-2 rounded-full dark:text-yellow-300 text-gray-700 hover:dark:bg-gray-800 hover:bg-gray-100"
                            aria-label="Toggle dark mode"
                        >
                            <motion.div animate={{ rotate: darkMode ? 180 : 0 }} transition={{ duration: 0.5 }}>
                                <img
                                    src={darkMode ? '/icons/sun.svg' : '/icons/moon.svg'}
                                    alt="mode toggle"
                                    className="w-7 h-7"
                                />
                            </motion.div>
                        </button>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => {
                                    setIsOpen(!isOpen);
                                    if (isOpen) {
                                        setMobileActiveMenu(null);
                                        setMobileActiveSubMenu(null);
                                    }
                                }}
                                className="ml-2 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <MobileNavBar
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    navItems={navItems}
                    mobileActiveMenu={mobileActiveMenu}
                    setMobileActiveMenu={setMobileActiveMenu}
                    mobileActiveSubMenu={mobileActiveSubMenu}
                    setMobileActiveSubMenu={setMobileActiveSubMenu}
                />
            </div>
        </header>
    );
};

export default NavBar;