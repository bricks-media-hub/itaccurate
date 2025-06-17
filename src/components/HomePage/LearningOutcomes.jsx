import { CardBody, CardContainer, CardItem } from "../ui/3dCard";

export function LearningOutcomes() {
    const LearningOutcomesData = [
        {
            title: "Industry Curriculum",
            description:
                "Unlock your potential with our industry-standard curriculum and expert trainers. Gain the skills and knowledge you need to excel in your field.",
            image: "./LearningOutcomes/H1.webp",
        },
        {
            title: "Global Certification Guidance",
            description:
                "Achieve global certification with confidence & ease. Our guidance program ensures you have skills to pass your exam.",
            image: "./LearningOutcomes/H2.webp",
        },
        {
            title: "Projects",
            description:
                "Experience real-world projects and gain practical skills with our comprehensive training programs. Our hands-on approach ensures that you’ll be ready to tackle any challenge in your field.",
            image: "./LearningOutcomes/H3.webp",
        },
    ];

    return (
        <section className="px-4 py-16 mt-2 bg-slate-100 dark:bg-gray-900">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white md:mb-16 mb-14">
                Learning <span className="text-blue-600 dark:text-blue-400">Outcomes</span>
            </h2>
            <div className="flex flex-col md:flex-row flex-wrap justify-center gap-y-4 md:gap-8">
                {LearningOutcomesData.map((item, index) => (
                    <CardContainer key={index} className="">
                        <CardBody 
                            className="py-0 bg-gradient-to-r from-blue-100 to-indigo-200 backdrop-blur-2xl z-0 
             dark:bg-gradient-to-tr dark:from-gray-600 dark:to-gray-800 
             dark:border-white/[0.2] border border-black/[0.1] 
             relative group/card hover:shadow-lg dark:hover:shadow-emerald-500/[0.1] 
             w-full md:w-[22rem] h-full min-h-[28rem] flex flex-col justify-between 
             rounded-xl p-6 transition-all duration-300"
                        >
                            <CardItem
                                translateZ="50"
                                className="text-xl text-center font-semibold text-neutral-800 dark:text-white"
                            >
                                {item.title}
                            </CardItem>
                            <CardItem translateZ="100" className="w-full mt-4">
                                <img
                                    src={item.image}
                                    height="1000"
                                    width="1000"
                                    className="h-52 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                    alt={item.title}
                                />
                            </CardItem>
                            <div className="flex justify-center items-center mt-4">
                                <CardItem
                                    as="p"
                                    translateZ="60"
                                    className="text-neutral-600 dark:text-neutral-300 text-center text-md"
                                >
                                    {item.description}
                                </CardItem>
                            </div>
                        </CardBody>
                    </CardContainer>
                ))}
            </div>
        </section>
    );
}
