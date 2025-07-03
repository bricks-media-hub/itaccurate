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
import AboutUs from './pages/AboutUs';

export const dynamicCourseRoutes = [
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
  'servicenow',
  'sap-hr',
  'da-hr',
  'ba-hr',
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
      },
      {
        path: '/about-us',
        element: <AboutUs />
      },
            {
        path: '/blog',
        element: <AboutUs />
      },
            {
        path: '/contact',
        element: <AboutUs />
      },
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