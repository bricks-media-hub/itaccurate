import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchFullCourseData } from "../../api/fetchComponentData";
import { Link } from "react-router-dom";
import { FaBriefcase, FaMoneyBillWave, FaChartLine } from "react-icons/fa";
import FreeDemoForm from "../ContactUs/FreeDemoForm";

const CourseOpportunities = ({ pageName }) => {
  const [fullCourseData, setFullCourseData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchFullCourseData(pageName);
        setFullCourseData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [pageName]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!fullCourseData) {
    return (
      <p className="text-center text-gray-600 dark:text-gray-400">
        
      </p>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Career Opportunities in{" "}
            <span className="text-blue-600 dark:text-blue-400">
              {fullCourseData.title}
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {fullCourseData.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Salaries Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
                  <FaMoneyBillWave className="text-blue-600 dark:text-blue-400 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Salary Packages in {fullCourseData.title}
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="pb-3 text-blue-600 dark:text-blue-400 font-medium">
                        Job Title
                      </th>
                      <th className="pb-3 text-blue-600 dark:text-blue-400 font-medium">
                        Salary Range
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(fullCourseData.salaries) &&
                      fullCourseData.salaries.map((salary, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <td className="py-4 text-gray-700 dark:text-gray-300">
                            {salary.role}
                          </td>
                          <td className="py-4 text-gray-700 dark:text-gray-300">
                            {salary.range}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
{ showForm && (<FreeDemoForm onClose={() => setShowForm(false)} title1={"Start Your Learning Journey"} title2={"Talk to Our Expert"}/>) }
              <div className="mt-6 flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition-all" onClick={()=> setShowForm(true)}
                >
                  Contact Us
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg shadow transition-all"
                >
                  <Link to="/placed">Check Placements</Link>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Roles Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mr-4">
                  <FaBriefcase className="text-indigo-600 dark:text-indigo-400 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Work Opportunities for {fullCourseData.title}
                </h3>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                  Current Job Roles
                </h4>
                <div className="flex flex-wrap gap-3">
                  {Array.isArray(fullCourseData.roles) &&
                    fullCourseData.roles.map((role, index) => (
                      <motion.a
                        key={index}
                        whileHover={{ y: -3 }}
                        href={role.link}
                        className="px-4 py-2 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
                      >
                        {role.title}
                      </motion.a>
                    ))}
                </div>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full mr-3">
                    <FaChartLine className="text-green-600 dark:text-green-400 text-lg" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    Emerging Job Roles
                  </h4>
                </div>
                <div className="flex flex-wrap gap-3">
                  {Array.isArray(fullCourseData.upcomingRoles) &&
                    fullCourseData.upcomingRoles.map((role, index) => (
                      <motion.a
                        key={index}
                        whileHover={{ y: -3 }}
                        href={role.link}
                        className="px-4 py-2 bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
                      >
                        {role.title}
                      </motion.a>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CourseOpportunities;