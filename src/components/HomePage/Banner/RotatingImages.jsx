import React from 'react'
import { motion } from 'framer-motion';

function RotatingImages() {

    const images = [
        {
            src: "./Banner/pic1.png",
            alt: "Character 1",
            size: "w-[14vh] sm:w-32 md:w-36 lg:w-40 h-[25vh] sm:h-[35vh] md:h-[50vh]",
            orbitRadius: "6rem",
            orbitRadiusSm: "9rem",
            orbitRadiusMd: "12rem",
            color: "from-blue-400 to-blue-500",
            orbitRadiusLg: "15rem",
            initialAngle: 0
        },
        {
            src: "./Banner/pic2.png",
            alt: "Character 2",
            size: "w-[14vh] sm:w-32 md:w-36 lg:w-40 h-[25vh] sm:h-[35vh] md:h-[50vh]",
            orbitRadius: "6rem",
            orbitRadiusSm: "9rem",
            orbitRadiusMd: "12rem",
            color: "from-violet-400 to-violet-500",
            orbitRadiusLg: "15rem",
            initialAngle: 60
        },
        {
            src: "./Banner/pic3.png",
            alt: "Character 3",
            size: "w-[14vh] sm:w-32 md:w-36 lg:w-40 h-[25vh] sm:h-[35vh] md:h-[50vh]",
            orbitRadius: "6rem",
            orbitRadiusSm: "9rem",
            orbitRadiusMd: "12rem",
            color: "from-teal-400 to-teal-500",
            orbitRadiusLg: "15rem",
            initialAngle: 120
        },
        {
            src: "./Banner/pic4.png",
            alt: "Character 4",
            size: "w-[14vh] sm:w-32 md:w-36 lg:w-40 h-[25vh] sm:h-[35vh] md:h-[50vh]",
            orbitRadius: "6rem",
            orbitRadiusSm: "9rem",
            orbitRadiusMd: "12rem",
            color: "from-indigo-400 to-indigo-500",
            orbitRadiusLg: "15rem",
            initialAngle: 180
        },
        {
            src: "./Banner/pic5.png",
            alt: "Character 5",
            size: "w-[14vh] sm:w-32 md:w-36 lg:w-40 h-[25vh] sm:h-[35vh] md:h-[50vh]",
            orbitRadius: "6rem",
            orbitRadiusSm: "9rem",
            orbitRadiusMd: "12rem",
            color: "from-purple-400 to-purple-500",
            orbitRadiusLg: "15rem",
            initialAngle: 240
        },
        {
            src: "./Banner/pic6.png",
            alt: "Character 6",
            size: "w-[14vh] sm:w-32 md:w-36 lg:w-40 h-[25vh] sm:h-[35vh] md:h-[50vh]",
            orbitRadius: "6rem",
            orbitRadiusSm: "9rem",
            orbitRadiusMd: "12rem",
            color: "from-green-400 to-green-500",
            orbitRadiusLg: "15rem",
            initialAngle: 300
        }
    ];

    return (
        <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 z-10 mb-2 sm:mb-0 relative">
            <div className="relative w-[16rem] h-[16rem] sm:w-[20rem] sm:h-[20rem] md:w-[24rem] md:h-[24rem] perspective-[800px] sm:perspective-[1000px]">
                <motion.div
                    className="absolute inset-0 mt-[-20vh] md:mt-[-35vh] lg:mt-[-51vh]"
                    animate={{ rotateY: 360 }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center center",
                    }}
                >
                    {images.map((image, index) => {
                        const angle = image.initialAngle;
                        const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 768;
                        const radius = screenWidth < 640 ? 120 : screenWidth < 768 ? 150 : 200;

                        return (
                            <div
                                key={index}
                                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${image.size}`}
                                style={{
                                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                                    transformStyle: "preserve-3d",
                                    transformOrigin: "center center",
                                }}
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className={`w-full h-full object-cover rounded-xl shadow-lg border bg-gradient-to-r ${image.color}`}
                                // className="w-full h-full object-cover rounded-xl"
                                />
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    )
}

export default RotatingImages