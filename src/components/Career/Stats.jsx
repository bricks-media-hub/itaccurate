import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import React, { useEffect } from "react";
import { SafeImage } from "../../lib/SafeImage";

function Stats() {
  const AnimatedCounter = ({ from = 0, to = 100 }) => {
    const count = useMotionValue(from);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
      const animation = animate(count, to, { duration: 2 });

      return animation.stop;
    }, [count, to]);

    return <motion.span>{rounded}</motion.span>;
  };
  const stats = [
    { value: 95, label: "Employee Satisfaction", icon: "/icons/satisfy.svg" },
    { value: 100, label: "Projects Completed", icon: "/icons/project.svg" },
    { value: 50, label: "Team Members", icon: "/icons/users.svg" },
    { value: 4.9, label: "Average Rating", icon: "/icons/star.svg" },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-blue-600 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 text-center bg-white/10 backdrop-blur-md rounded-xl shadow-md 
                 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon inside glowing bubble */}
              <div
                className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full 
                      bg-white/20 ring-2 ring-white/30 dark:ring-blue-400/30 
                      shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              >
                <SafeImage src={stat.icon} alt="icon" className="w-8 h-8" />
              </div>

              {/* Animated number */}
              <div className="text-white text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">
                <AnimatedCounter from={0} to={stat.value} />
                {typeof stat.value === "number" && !Number.isInteger(stat.value)
                  ? ""
                  : "+"}
              </div>

              {/* Label */}
              <div className="text-white/80 text-lg md:text-xl font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Stats;
