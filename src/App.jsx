import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import AboutCourse from "./pages/AboutCourse";
import { fetchNavbarData } from "./store/navbarSlice";
import { fetchCompanyRatings } from "./store/companyPartnersRatingsSlice";
import { fetchCourses } from "./store/coursesSlice";
import { fetchPlacedStudents } from "./store/placedStudentsSlice";
import { fetchCoursesData } from "./store/coursesDataSlice";
import { fetchComponentData } from "./api/fetchComponentData";
import Placements from "./pages/Placements";
import NotFoundPage from "./components/ui/NotFoundPage";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import Jobs from "./pages/Jobs";
import Career from "./pages/Career";
import TermsOfService from "./components/Terms/Terms";
import PrivacyPolicy from "./components/Terms/Privacy";
import RefundPolicy from "./components/Terms/Refund";
import ProtectedRoute from "./ProtectedRoute/SeoProtected";
import LandingPage from "./SEO/LandingPage";
import SeoLandingPage from "./pages/SeoLandingPage";
import ContactSuccessful from "./lib/ContactSuccessful";
import { fetchSeoLandingPageDetails } from "./api/fetchSeoData";

export const dynamicCourseRoutes = [
  "salesforce-training",
  "salesforce-admin",
  "salesforce-development-2",
  "salesforce-marketing-cloud",
  "salesforce-lwc-integration",
  "best-devops-training",
  "best-ai-ml-training",
  "best-aws-training",
  "best-sap-training",
  "best-data-science-training",
  "best-data-analytics-training",
  "best-machine-learning-training",
  "best-business-analytics-training",
  "share-market",
  "full-stack-developer",
  "python-full-stack",
  "java-full-stack",
  "mern-stack",
  "dotnet-full-stack",
  "tally",
  "python",
  "cybersecurity",
  "sap-mm",
  "sap-hcm",
  "sap-successfactors",
  "sap-scm",
  "sap-abap",
  "sap-fico",
  "best-sap-training",
  "sap-ariba",
  "sap-pp",
  "sap-sd",
  "sap-fiori",
  "sap-basis-training-in-nagpur",
  "sap-qm",
  "sap-wm-ewm",
  "sap-pm",
  "sap-le-sl",
  "sap-business-one",
  "sap-btp-training",
  "servicenow",
  "sap-hr",
  "da-hr",
  "ba-hr",
  "data-engineering",
  // 'sap-course-in-thane',
  // 'sap-course-in-nagpur',
  // 'sap-fico-course-in-nagpur'
];

const landingPageDetails = [
  "sap-course-in-thane",
  "sap-course-in-nagpur",
  "sap-fico-course-in-nagpur",
  "data-analytics-course-in-thane",
  "data-analytics-course-in-nagpur",
  // "ethical-hacking"
]

// Create loader-based routes
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // Map each dynamic route with its loader
      ...dynamicCourseRoutes.map((route) => ({
        path: `/${route}`,
        loader: () => fetchComponentData(route),
        element: <AboutCourse />,
      })),
      {
        path: "/placed",
        element: <Placements />,
      },
      {
        path: "/jobs-openings",
        element: <Jobs />,
      },
      {
        path: "/career",
        element: <Career />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/blog",
        element: <Blogs />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/terms",
        element: <TermsOfService />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/refund",
        element: <RefundPolicy />,
      },
      ...landingPageDetails.map((route) => ({
        path: `/${route}`,
        loader: () => fetchSeoLandingPageDetails(route),
        element: <SeoLandingPage />,
      })),
      {
        path: '/successful',
        element: <ContactSuccessful />
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
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
