import React from "react";
import { SafeImage } from "../lib/SafeImage";

const SAPHighlightSection = () => {
  const highlights = [
    {
      icon: "/icons/sap.svg",
      title: "Industry-Recognized SAP Certification",
      description:
        "Get certified with globally accepted SAP credentials that boost your ERP career opportunities.",
    },
    {
      icon: "/icons/tools.svg",
      title: "Hands-On SAP Project Training",
      description:
        "Work on real-time SAP scenarios and gain practical experience with expert-led guidance.",
    },
    {
      icon: "/icons/focus.svg",
      title: "100% Placement Assistance",
      description:
        "We prepare you for top roles with mock interviews, resume support, and access to SAP recruiter network.",
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-blue-400">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="px-4 py-6 sm:px-6 sm:py-8 flex flex-col items-center text-center"
            >
              <div className="mb-5 p-1 rounded-full bg-white shadow-lg">
                <div className="bg-indigo-600 rounded-full p-4 flex items-center justify-center">
                  <SafeImage 
                    src={item.icon} 
                    alt="icon" 
                    className="h-6 w-6 sm:h-8 sm:w-8" 
                  />
                </div>
              </div>
              <div className="max-w-xs mx-auto">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-blue-100 text-sm sm:text-base">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SAPHighlightSection;