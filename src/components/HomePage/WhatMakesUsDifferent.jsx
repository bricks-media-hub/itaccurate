import { AnimatedWhatMakesUsDifferent } from "../ui/AnimatedWhatMakesUsDifferent";

export function WhatMakesUsDifferent() {
  const testimonials = [
    {
      name: "1",
      title: "INTERVIEW GUIDANCE",
      src: "./WhatMakesDiffImg/image.webp",
    },
    {
      name: "2",
      title: "GUARANTEED CERTIFICATION",
      src: "./WhatMakesDiffImg/y.jpg",
    },
    {
      name: "3",
      title: "JOB READY",
      src: "./WhatMakesDiffImg/d.jfif",
    },
    {
      name: "4",
      title: "ONLINE+OFFLINE SESSIONS",
      src: "./WhatMakesDiffImg/N.jpg",
    },
  ];
  return <AnimatedWhatMakesUsDifferent testimonials={testimonials} />;
}
