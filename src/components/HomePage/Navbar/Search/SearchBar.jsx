// import React, { useState, useRef, useEffect } from 'react';
// import { FiSearch, FiX, FiChevronRight } from 'react-icons/fi';
// import useSearchLogic from './useSearchLogic';
// import { ToastContainer } from 'react-toastify';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// const SearchBar = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);
//   const searchRef = useRef(null);
//   const { handleSearch, getSuggestions } = useSearchLogic();

//   const suggestions = getSuggestions(searchTerm);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowSuggestions(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleSuggestionClick = (route) => {
//     // handleSearch(route);
//     navigate(route)
//     setSearchTerm('');
//     setShowSuggestions(false);
//   };

//   const clearSearch = () => {
//     setSearchTerm('');
//     setShowSuggestions(false);
//   };

//   return (
//     <div className="relative ml-4 hidden md:block" ref={searchRef}>
//       <ToastContainer position="top-center" autoClose={3000} />
//       <div className="relative">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <FiSearch className="h-5 w-5 text-gray-400 dark:text-gray-400" />
//         </div>
//         <input
//           type="text"
//           className={`block w-full pl-10 pr-8 py-2.5 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 border ${
//             isFocused
//               ? 'border-blue-500 dark:border-blue-400 shadow-outline-blue'
//               : 'border-gray-300 dark:border-gray-600'
//           } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm transition-all duration-200`}
//           placeholder="Search courses, topics..."
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setShowSuggestions(true);
//           }}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter' && searchTerm.trim()) {
//               handleSearch(searchTerm);
//               setShowSuggestions(false);
//             }
//           }}
//           onFocus={() => {
//             setIsFocused(true);
//             if (searchTerm) setShowSuggestions(true);
//           }}
//           onBlur={() => setIsFocused(false)}
//         />
//         {searchTerm && (
//           <button
//             onClick={clearSearch}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
//           >
//             <FiX className="h-4 w-4" />
//           </button>
//         )}
//       </div>

//       {/* Suggestion list section */}
//       <AnimatePresence>
//         {showSuggestions && suggestions.length > 0 && (
//           <motion.ul
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 10 }}
//             transition={{ type: 'spring', damping: 20, stiffness: 300 }}
//             className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden max-h-80 overflow-y-auto text-sm"
//           >
//             {suggestions.map((item, idx) => (
//               <motion.li
//                 key={idx}
//                 whileHover={{ scale: 1.01 }}
//                 className="border-b border-gray-100 dark:border-gray-700 last:border-b-0"
//               >
//                 <button
//                   className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center"
//                   onClick={() => handleSuggestionClick(item.route)}
//                 >
//                   <div className="flex-shrink-0 mr-3 text-blue-500 dark:text-blue-400">
//                     <FiSearch className="h-4 w-4" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-gray-800 dark:text-gray-100 font-medium truncate capitalize">
//                       {item.keywords[0]}
//                     </p>
//                     <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
//                       {item.description || `Go to ${item.route}`}
//                     </p>
//                   </div>
//                   <FiChevronRight className="ml-2 text-gray-400 dark:text-gray-500 h-4 w-4" />
//                 </button>
//               </motion.li>
//             ))}
//           </motion.ul>
//         )}
//       </AnimatePresence>

//       {/* Empty state */}
//       {showSuggestions && searchTerm && suggestions.length === 0 && (
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: 10 }}
//           className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 text-center"
//         >
//           <p className="text-gray-500 dark:text-gray-400">
//             No results found for "{searchTerm}"
//           </p>
//           <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
//             Try different keywords
//           </p>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;



// SearchBar.jsx
// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FiSearch, FiX, FiChevronRight } from 'react-icons/fi';
// import { motion, AnimatePresence } from 'framer-motion';
// import useSearchLogic from './useSearchLogic';

// const SearchBar = ({ varient }) => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);
//   const searchRef = useRef(null);

//   const { handleSearch, getSuggestions } = useSearchLogic();
//   const suggestions = getSuggestions(searchTerm);

//   useEffect(() => {
//     const clickOutside = (e) => {
//       if (searchRef.current && !searchRef.current.contains(e.target)) {
//         setShowSuggestions(false);
//       }
//     };
//     document.addEventListener('mousedown', clickOutside);
//     return () => document.removeEventListener('mousedown', clickOutside);
//   }, []);

//   const onSuggestionClick = (route) => {
//     navigate(route);
//     setSearchTerm('');
//     setShowSuggestions(false);
//   };

//   return (
//     <div
//       className={`ml-4 ${varient} md:block`}
//       ref={searchRef}
//     >
//       <div className="relative">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <FiSearch className="h-5 w-5 text-gray-400 dark:text-gray-500" />
//         </div>
//         <input
//           type="text"
//           className={`block w-full pl-10 pr-8 py-2.5 rounded-lg bg-white dark:bg-gray-800 border-2 ${isFocused
//             ? 'border-blue-500 dark:border-blue-400 shadow-md dark:shadow-lg shadow-blue-100 dark:shadow-blue-900/50'
//             : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
//             } focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/50 text-base sm:text-sm transition-all duration-200`}
//           placeholder="Search courses, topics..."
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setShowSuggestions(true);
//           }}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter' && searchTerm.trim()) {
//               handleSearch(searchTerm);
//               setShowSuggestions(false);
//             }
//           }}
//           onFocus={() => {
//             setIsFocused(true);
//             if (searchTerm) setShowSuggestions(true);
//           }}
//           onBlur={() => {
//             setTimeout(() => setIsFocused(false), 200);
//           }}
//         />
//         {searchTerm && (
//           <button
//             onClick={() => {
//               setSearchTerm('');
//               setShowSuggestions(false);
//             }}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-150"
//             aria-label="Clear search"
//           >
//             <FiX className="h-4 w-4" />
//           </button>
//         )}
//       </div>

//       <AnimatePresence>
//         {showSuggestions && suggestions.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 10 }}
//             transition={{ type: 'spring', damping: 20, stiffness: 300 }}
//             className="absolute z-50 mt-2 w-full"
//           >
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden max-h-96 overflow-y-auto custom-scrollbar">
//               <ul className="divide-y divide-gray-100 dark:divide-gray-700">
//                 {suggestions.map((item, idx) => (
//                   <motion.li
//                     key={idx}
//                     initial={{ opacity: 0, y: 5 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: idx * 0.02 }}
//                     whileHover={{ scale: 1.005 }}
//                     className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-colors duration-150"
//                   >
//                     <button
//                       onClick={() => onSuggestionClick(item.route)}
//                       className="w-full text-left px-4 py-3 flex items-center space-x-3"
//                     >
//                       <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400">
//                         <FiSearch className="h-4 w-4" />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-gray-800 dark:text-gray-100 font-medium truncate">
//                           {item.title}
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
//                           {item.description || `Go to ${item.route}`}
//                         </p>
//                       </div>
//                       <FiChevronRight className="ml-2 text-gray-400 dark:text-gray-500 h-4 w-4 flex-shrink-0" />
//                     </button>
//                   </motion.li>
//                 ))}
//               </ul>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default SearchBar;

import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiX, FiChevronRight } from 'react-icons/fi';
import { ToastContainer } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useSearchLogic from './useSearchLogic';

const SearchBar = ({ variant = 'desktop', className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { handleSearch, getSuggestions } = useSearchLogic();
  const suggestions = getSuggestions(searchTerm);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (route) => {
    navigate(route);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      handleSearch(searchTerm);
      setShowSuggestions(false);
    }
  };

  const variants = {
    desktop: {
      container: 'relative hidden md:block ml-4',
      input: `pl-10 pr-8 py-2.5 rounded-lg border ${
        isFocused
          ? 'border-blue-500 dark:border-blue-400'
          : 'border-gray-300 dark:border-gray-600'
      }`,
      suggestions: 'mt-1 w-full',
    },
    mobile: {
      container: 'px-3 pt-2 relative',
      input:
        'pl-10 pr-3 py-2 border border-transparent rounded-md bg-gray-100 dark:bg-gray-700',
      suggestions: 'fixed inset-x-3 top-[120px] max-h-[60vh] overflow-y-auto',
    },
  };

  return (
    <div
      className={`${variants[variant].container} ${className}`}
      ref={searchRef}
    >
      {variant === 'desktop' && (
        <ToastContainer position="top-center" autoClose={3000} />
      )}

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400 dark:text-gray-400" />
        </div>
        <input
          type="text"
          className={`block w-full ${variants[variant].input} bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm transition-all duration-200`}
          placeholder={
            variant === 'mobile'
              ? 'Search...'
              : 'Search courses, topics...'
          }
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsFocused(true);
            if (searchTerm) setShowSuggestions(true);
          }}
          onBlur={() => {
            // small delay so onClick registers
            setTimeout(() => setIsFocused(false), 200);
          }}
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <FiX className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Suggestion list */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          variant === 'desktop' ? (
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className={`
                absolute z-50 ${variants.desktop.suggestions}
                bg-white dark:bg-gray-800 rounded-lg shadow-xl
                border border-gray-200 dark:border-gray-700
                overflow-hidden overflow-y-auto text-sm
              `}
            >
              {suggestions.map((item, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ scale: 1.01 }}
                  className="border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                  <button
                    onClick={() => handleSuggestionClick(item.route)}
                    onMouseDown={(e) => e.preventDefault()}
                    className="w-full text-left px-4 py-3 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                  >
                    <FiSearch className="flex-shrink-0 mr-3 text-blue-500 dark:text-blue-400 h-4 w-4" />
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 dark:text-gray-100 font-medium truncate capitalize">
                        {item.title}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
                        Go to {item.route}
                      </p>
                    </div>
                    <FiChevronRight className="ml-2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <ul
              className={`
                ${variants.mobile.suggestions}
                bg-white dark:bg-gray-800
                rounded-md
                text-sm
              `}
            >
              {suggestions.map((item, idx) => (
                <li
                  key={idx}
                  className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                >
                  <button
                    onClick={() => handleSuggestionClick(item.route)}
                    onMouseDown={(e) => e.preventDefault()}
                    className="w-full text-left px-4 py-3 flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <FiSearch className="text-blue-500 dark:text-blue-400 h-4 w-4" />
                    <span className="truncate text-gray-800 dark:text-gray-100">
                      {item.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )
        )}
      </AnimatePresence>

      {/* No-results (desktop only) */}
      {variant === 'desktop' &&
        showSuggestions &&
        searchTerm &&
        suggestions.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 text-center"
          >
            <p className="text-gray-500 dark:text-gray-400">
              No results found for "{searchTerm}"
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Try different keywords
            </p>
          </motion.div>
        )}
    </div>
  );
};

export default SearchBar;

