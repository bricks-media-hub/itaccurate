import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { SafeImage } from "../../lib/SafeImage";

const companyData = [
  {
    name: "Google",
    lightLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    darkLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Facebook",
    lightLogo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    darkLogo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  },
  {
    name: "Amazon",
    lightLogo: "./AlumniLogos/amaazon.png",
    darkLogo: "./AlumniLogos/amazon.svg",
  },
  {
    name: "Apple",
    lightLogo: "./AlumniLogos/Apple_logo_white.png",
    darkLogo: "./AlumniLogos/Apple_logo_black.svg",
  },
  {
    name: "LinkedIn",
    lightLogo: "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg",
    darkLogo: "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg",
  },
  {
    name: "Microsoft",
    lightLogo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    darkLogo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    name: "Netflix",
    lightLogo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    darkLogo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    name: "PayPal",
    lightLogo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    darkLogo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
  },
  {
    name: "IBM",
    lightLogo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    darkLogo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  },
  {
    name: "Salesforce",
    lightLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
    darkLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
  },
  {
    name: "Uber",
    lightLogo: "./AlumniLogos/uber_logo_white.svg",
    darkLogo: "./AlumniLogos/uber_logo_black.svg",
  },
  {
    name: "Zoom",
    lightLogo: "./AlumniLogos/zoom.png",
    darkLogo: "./AlumniLogos/zoom.png",
  },
  {
    name: "Adobe",
    lightLogo: "./AlumniLogos/Adobe-Logo-2023.png",
    darkLogo: "./AlumniLogos/Adobe-Logo-2023.png",
  },
  {
    name: "Flipkart",
    lightLogo: "./AlumniLogos/226594.webp",
    darkLogo: "./AlumniLogos/226594.webp",
  },
];

const AlumniMarquee = ({ title }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    // Initial check
    setIsDark(document.documentElement.classList.contains("dark"));

    // Observe changes to <html> class list
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full py-12 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-950 dark:to-gray-800">
<h2
  className={`text-3xl md:text-4xl font-bold text-center mb-6 ${
    title ? 'text-4xl md:text-5xl font-bold mb-4 text-blue-800 dark:text-blue-300' : 'text-gray-800 dark:text-white'
  }`}
>
  {title ? (
    title
  ) : (
    <>
      Our Alumni{' '}
      <span className="text-blue-600 dark:text-blue-400">Working Here</span>
    </>
  )}
</h2>



      <Marquee gradient={false} speed={60} gradientWidth={60}>
        {companyData.map((company, index) => (
          <div
            key={index}
            className="flex items-center justify-center mx-4 transition-transform duration-300 hover:scale-105"
          >
            <div className="p-3 rounded-lg">
              <SafeImage
                src={isDark ? company.lightLogo : company.darkLogo}
                alt={company.name}
                className="w-28 md:w-32 h-auto object-contain"
              />
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default AlumniMarquee;
