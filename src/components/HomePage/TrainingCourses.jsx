import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import FreeDemoForm from "../ContactUs/FreeDemoForm";
import { useSelector } from "react-redux";
import TrainingCoursesSkeleton from "../ui/SkeletonEffects/TrainingCoursesSkeleton";
import { SafeImage } from "../../lib/SafeImage";

const TrainingCourses = () => {
  const [showForm, setShowForm] = useState(false);
  const courses = useSelector((state) => state.courses.courseData);
  const loading = useSelector((state) => state.courses.status);
  const error = useSelector((state) => state.courses.error);

  if (loading === "loading") {
    return <TrainingCoursesSkeleton />;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <section
      id="training-courses"
      className="py-7 md:py-16 dark:bg-gray-900 bg-white "
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white text-gray-800">
            Our Training <span className="text-blue-600">Courses</span>
          </h2>
          <h3 className="text-xl md:text-2xl max-w-3xl mx-auto dark:text-gray-300 text-gray-600">
            Be certified by global certifications and increase your
            understanding
          </h3>
        </motion.div>

        {/* for opening modal() when clicked on */}
        {showForm && <FreeDemoForm onClose={() => setShowForm(false)} />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -5,
                rotateX: 5,
                rotateY: 5,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                },
              }}
              className="w-full max-w-sm mx-auto"
            >
            <Link to={course.link}>
              <Card className="relative bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800 hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden">
                {/* Optional gradient glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${course.color} p-0.5 rounded-xl opacity-15 pointer-events-none`}
                ></div>

                <CardHeader
                  color="blue-gray"
                  className="relative h-56 w-full p-0 m-0 bg-gray-100 dark:bg-gray-800 overflow-hidden"
                >
                  <SafeImage
                    src={course.bgImage}
                    alt={course.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </CardHeader>

                <CardBody className="bg-white dark:bg-gray-900">
                  <Typography
                    variant="h5"
                    className="mb-2 text-gray-900 dark:text-white font-semibold"
                  >
                    {course.title}
                  </Typography>
                  <Typography className="text-gray-600 dark:text-gray-300 line-clamp-2">
                    {course.description}
                  </Typography>
                </CardBody>

                <CardFooter className="pt-0 bg-white dark:bg-gray-900 flex justify-between items-end">
                  <motion.button
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex text-sm pb-3 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    onClick={() => setShowForm(true)}
                  >
                    {course.cta}
                    <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </motion.button>

                  <Link to={course.link}>
                    <motion.button
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center text-slate-100 dark:text-slate-100 font-semibold hover:text-slate-100 dark:hover:text-slate-100 transition-colors bg-blue-700 p-2 rounded-lg"
                    >
                      Know More →
                    </motion.button>
                  </Link>
                </CardFooter>
              </Card>
            </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingCourses;