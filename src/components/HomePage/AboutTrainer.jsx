import React from "react";

const TrainerDetails = () => {
  const trainerPoints = [
    {
      id: 1,
      text: (
        <>
          <strong className="text-gray-900 dark:text-white">Our training programs</strong> are delivered by certified IT ACCURATE trainers with over 7 years of expertise in their respective domains. They are currently working with top MNCs, ensuring real-world insights.
        </>
      ),
    },
    {
      id: 2,
      text: `Our trainers actively work on live projects and incorporate these into training sessions, making the learning experience practical and industry-relevant.`,
    },
    {
      id: 3,
      text: `They bring their expertise from leading companies like Cognizant, Dell, Infosys, IBM, L&T InfoTech, TCS, and HCL Technologies.`,
    },
    {
      id: 4,
      text: `Beyond training, our trainers help candidates secure placements through employee referrals and internal hiring opportunities at their organizations.`,
    },
    {
      id: 5,
      text: (
        <>
          Passionate about education, our trainers are industry experts dedicated to providing{" "}
          <strong className="text-gray-900 dark:text-white">exceptional training</strong> tailored to each student’s career growth.
        </>
      ),
    },
    {
      id: 6,
      text: `IT ACCURATE is honored to have received multiple awards for training excellence from esteemed IT organizations, reflecting our commitment to quality education.`,
    },
  ];

  return (
    <section className="px-4 py-16 bg-slate-50 dark:bg-gray-900">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">
        About <span className="text-blue-600 dark:text-blue-400">Our Trainer</span>
      </h2>
      <div className="max-w-5xl mx-auto grid gap-6">
        {trainerPoints.map((point) => (
          <div
            key={point.id}
            className="bg-gradient-to-r from-blue-100 to-indigo-200 dark:from-gray-700 dark:to-gray-800 border-l-4 border-blue-400 dark:border-emerald-400 rounded-xl p-6 hover:shadow-md transition duration-300 ease-in-out hover:border-blue-600 dark:hover:border-emerald-300"
          >
            <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed">
              {point.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrainerDetails;
