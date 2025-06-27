
// import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
// import Home from './pages/Home';
// import { useDispatch } from 'react-redux';
// import { fetchNavbarData } from './store/navbarSlice';
// import { useEffect } from 'react';
// import { fetchCompanyRatings } from './store/companyPartnersRatingsSlice';
// import { fetchCourses } from './store/coursesSlice';
// import { fetchPlacedStudents } from './store/placedStudentsSlice';
// import { fetchCoursesData } from './store/coursesDataSlice';
// import Layout from './components/Layout';
// import { fetchComponentData } from './api/fetchComponentData';
// import AboutCourse from './components/CourseDetails/AboutCourse';


// export const dynamicCourseRoutes = [
//   // 'about-us',
//   // 'contact',
//   // 'career',
//   // 'blogDetails/:id',
//   // 'b',
//   'salesforce-training',
//   'salesforce-admin',
//   'salesforce-development-2',
//   'salesforce-marketing-cloud',
//   'salesforce-lwc-integration',
//   'best-devops-training',
//   'best-ai-ml-training',
//   'best-aws-training',
//   'best-sap-training',
//   'best-data-science-training',
//   'best-data-analytics-training',
//   'best-machine-learning-training',
//   'best-business-analytics-training',
//   'share-market',
//   'full-stack-developer',
//   'tally',
//   'python',
//   'cybersecurity',
//   'sap-mm',
//   'sap-hcm',
//   'sap-successfactors',
//   'sap-scm',
//   'sap-abap',
//   'sap-fico',
//   'best-sap-training',
//   'sap-ariba',
//   'sap-pp',
//   'sap-sd',
//   'sap-fiori',
//   'sap-basis-training-in-nagpur',
//   'sap-qm',
//   'sap-wm-ewm',
//   'sap-pm',
//   'sap-le-sl',
//   'sap-business-one',
//   'sap-btp-training',
//   // 'privacy',
//   // 'terms',
//   // 'refund',
//   // 'placed',
//   // 'batch',
//   // 'salaryhike',
//   // 'servicenow',
//   // 'sap-hr',
//   // 'da-hr',
//   // 'ba-hr',
//   // 'jobs-openings',
//   'data-engineering',
//   'sap-course-in-thane',
//   'sap-course-in-nagpur',
//   'sap-fico-course-in-nagpur'
// ];


// const dynamicRoutes = dynamicCourseRoutes.map(route => ({
//   path: `/${route}`,
//   loader: () => fetchComponentData(route),
//   element: <AboutCourse />,
// }));


//   const router = createBrowserRouter([
//     {
//       element: <Layout />,
//       children: [
//         {
//           path: '/',
//           element: <Home />,
//         },
//         {
//           // ...dynamicCourseRoutes.map((route) => ({
//           //   path: `${route}`,
//           //   loader: () => fetchComponentData(route),
//           //   element: <AboutCourse />,
//           // }))

//           // ...dynamicRoutes

//           path: '/best-sap-training',
//           loader: () => fetchComponentData('best-sap-training'),
//           element: <AboutCourse />
//         },
//       ]
//     }
//   ])


// function App() {
//   const dispatch = useDispatch();
//   // const location = useLocation();

//   useEffect(() => {
//     dispatch(fetchNavbarData());
//     dispatch(fetchCompanyRatings());
//     dispatch(fetchCourses());
//     dispatch(fetchPlacedStudents());
//     dispatch(fetchCoursesData());
//   }, [dispatch]);

//   return <RouterProvider router={router} />;
//   // (
//     // <Router>
//     //   <Routes>
//     //     <Route element={<Layout />}>
//     //       <Route path='/' element={<Home />} />
//     //       <Route path='/best-sap-training' loader: () => fetchComponentData(path) />
//     //     </Route>
//     //   </Routes>
//     // </Router>
       
//   // )
// }

// export default App




import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Home from './pages/Home';
import Layout from './components/Layout';
import AboutCourse from './pages/AboutCourse';
import { fetchNavbarData } from './store/navbarSlice';
import { fetchCompanyRatings } from './store/companyPartnersRatingsSlice';
import { fetchCourses } from './store/coursesSlice';
import { fetchPlacedStudents } from './store/placedStudentsSlice';
import { fetchCoursesData } from './store/coursesDataSlice';
import { fetchComponentData } from './api/fetchComponentData';
import Placements from './pages/Placements';
import NotFoundPage from './components/ui/NotFoundPage';

export const dynamicCourseRoutes = [
  // 'about-us',
  // 'contact',
  // 'career',
  // 'blogDetails/:id',
  // 'b',
  'salesforce-training',
  'salesforce-admin',
  'salesforce-development-2',
  'salesforce-marketing-cloud',
  'salesforce-lwc-integration',
  'best-devops-training',
  'best-ai-ml-training',
  'best-aws-training',
  'best-sap-training',
  'best-data-science-training',
  'best-data-analytics-training',
  'best-machine-learning-training',
  'best-business-analytics-training',
  'share-market',
  'full-stack-developer',
  'tally',
  'python',
  'cybersecurity',
  'sap-mm',
  'sap-hcm',
  'sap-successfactors',
  'sap-scm',
  'sap-abap',
  'sap-fico',
  'best-sap-training',
  'sap-ariba',
  'sap-pp',
  'sap-sd',
  'sap-fiori',
  'sap-basis-training-in-nagpur',
  'sap-qm',
  'sap-wm-ewm',
  'sap-pm',
  'sap-le-sl',
  'sap-business-one',
  'sap-btp-training',
  // 'privacy',
  // 'terms',
  // 'refund',
  // 'placed',
  // 'batch',
  // 'salaryhike',
  'servicenow',
  'sap-hr',
  'da-hr',
  'ba-hr',
  // 'jobs-openings',
  'data-engineering',
  'sap-course-in-thane',
  'sap-course-in-nagpur',
  'sap-fico-course-in-nagpur'
];

// Create loader-based routes
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      // Map each dynamic route with its loader
      ...dynamicCourseRoutes.map((route) => ({
        path: `/${route}`,
        loader: () => fetchComponentData(route),
        element: <AboutCourse />,
      })),
      {
        path: '/placed',
        element: <Placements />
      }
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);

function App() {
  const dispatch = useDispatch();

  // Fetch initial Redux data
  useEffect(() => {
    dispatch(fetchNavbarData());
    dispatch(fetchCompanyRatings());
    dispatch(fetchCourses());
    dispatch(fetchPlacedStudents());
    dispatch(fetchCoursesData());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;