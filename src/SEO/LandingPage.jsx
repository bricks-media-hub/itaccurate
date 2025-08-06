// import React, { useEffect, useState } from "react";
// import Panel1 from "./Panel1";
// import axios from "axios";
// import Panel3 from "./Panel3";
// import Panel4 from "./Panel4";
// import Panel5 from "./Panel5";
// import Panel6 from "./Panel6";
// import Panel7 from "./Panel7";
// import Panel8 from "./Panel8";
// import Panel9 from "./Panel9";
// import Panel10 from "./Panel10";
// import { useLocation } from "react-router-dom";
// import { Helmet } from "react-helmet";

// const DEFAULT_SEO = {
//   title: "ITAccurate | Course Details",
//   description: "Explore our courses with expert mentors and real projects.",
//   keywords: "ITAccurate, training, courses",
//   canonical: "https://itaccurate.com",
//   scriptContents: "",
// };

// const seoFiles = {
//   "/sap-course-in-thane": "/data/seo/sap-thane.json",
//   "/sap-course-in-nagpur": "/data/seo/sap-nagpur.json",
//   "/sap-fico-course-in-nagpur": "/data/seo/sap-fico-nagpur.json",
// };

// function LandingPage() {
//   const [content, setContent] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const location = useLocation();

//   const { title, description, keywords, canonical, scriptContents } = {
//     ...DEFAULT_SEO,
//     ...(content["seo-data"] || {}),
//   };

//   // featching data
//   useEffect(() => {
//     const fetchData = async () => {
//       const URL = seoFiles[location.pathname];
//       if (!URL) return;
//       setIsLoading(true);
//       try {
//         const response = await axios.get(URL);
//         setContent(response.data);
//         console.log("Loaded SEO scriptContents:", response.data["seo-data"]?.scriptContents);
        
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [location.pathname]);

//   return (
//     <>
//       {/* seo contents */}
// <Helmet>
//   <title>{title}</title>
//   <meta name="description" content={description} />
//   <meta name="keywords" content={keywords} />
//   <link rel="canonical" href={canonical} />
//   {scriptContents && Object.keys(scriptContents).length > 0 && (
//     <Helmet
//       script={[
//         {
//           type: "application/ld+json",
//           innerHTML: JSON.stringify(scriptContents),
//         },
//       ]}
//     />
//   )}
// </Helmet>

//       {/* actual page */}
//       <div>
//         {content?.panel1 && (
//           <Panel1
//             data={content.panel1}
//             isLoading={isLoading}
//             imageUrl={content?.panel1.imageUrl}
//           />
//         )}
//         {content?.panel2 && (
//           <Panel1
//             data={content.panel2}
//             showImage={true}
//             imageUrl={content.panel2.imageUrl}
//             showButtons={false}
//             reverseLayout={true}
//             showStats={false}
//           />
//         )}
//         {content?.panel3 && <Panel3 data={content.panel3} />}
//         {content?.panel4 && (
//           <Panel4 data={content.panel4} imageUrl={content.panel4.imageUrl} />
//         )}
//         {content?.panel5 && (
//           <Panel5 data={content.panel5} imageUrl={content.panel5.imageUrl} />
//         )}
//         {content?.panel6 && <Panel6 data={content.panel6} />}
//         {content?.panel7 && <Panel7 data={content.panel7} />}
//         {content?.panel8 && <Panel8 data={content.panel8} />}
//         {content?.panel9 && <Panel9 data={content.panel9} />}
//         {content?.panel10 && <Panel10 data={content.panel10} />}
//       </div>
//     </>
//   );
// }

// export default LandingPage;




import React, { useEffect, useState } from "react";
import Panel1 from "./Panel1";
import axios from "axios";
import Panel3 from "./Panel3";
import Panel4 from "./Panel4";
import Panel5 from "./Panel5";
import Panel6 from "./Panel6";
import Panel7 from "./Panel7";
import Panel8 from "./Panel8";
import Panel9 from "./Panel9";
import Panel10 from "./Panel10";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const DEFAULT_SEO = {
  title: "ITAccurate | Course Details",
  description: "Explore our courses with expert mentors and real projects.",
  keywords: "ITAccurate, training, courses",
  canonical: "https://itaccurate.com",
  scriptContents: "",
};

const seoFiles = {
  "/sap-course-in-thane": "/data/seo/sap-thane.json",
  "/sap-course-in-nagpur": "/data/seo/sap-nagpur.json",
  "/sap-fico-course-in-nagpur": "/data/seo/sap-fico-nagpur.json",
};

function LandingPage() {
  const [content, setContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const { title, description, keywords, canonical, scriptContents } = {
    ...DEFAULT_SEO,
    ...(content["seo-data"] || {}),
  };

  // Fetching SEO + Page data
  useEffect(() => {
    const fetchData = async () => {
      const URL = seoFiles[location.pathname];
      if (!URL) return;
      setIsLoading(true);
      try {
        const response = await axios.get(URL);
        setContent(response.data);
        console.log("Loaded SEO scriptContents:", response.data["seo-data"]?.scriptContents);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location.pathname]);

  // Debug Helmet contents after SEO loaded
  useEffect(() => {
    if (scriptContents && Object.keys(scriptContents).length > 0) {
      console.log("Helmet after SEO loaded:", Helmet.peek());
    }
  }, [scriptContents]);

  return (
    <>
      {/* SEO contents */}
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {scriptContents && Object.keys(scriptContents).length > 0 && (
        <Helmet
          script={[
            {
              type: "application/ld+json",
              innerHTML: JSON.stringify(scriptContents),
            },
          ]}
        />
      )}

      {/* Actual page */}
      <div>
        {content?.panel1 && (
          <Panel1
            data={content.panel1}
            isLoading={isLoading}
            imageUrl={content?.panel1.imageUrl}
          />
        )}
        {content?.panel2 && (
          <Panel1
            data={content.panel2}
            showImage={true}
            imageUrl={content.panel2.imageUrl}
            showButtons={false}
            reverseLayout={true}
            showStats={false}
          />
        )}
        {content?.panel3 && <Panel3 data={content.panel3} />}
        {content?.panel4 && <Panel4 data={content.panel4} imageUrl={content.panel4.imageUrl} />}
        {content?.panel5 && <Panel5 data={content.panel5} imageUrl={content.panel5.imageUrl} />}
        {content?.panel6 && <Panel6 data={content.panel6} />}
        {content?.panel7 && <Panel7 data={content.panel7} />}
        {content?.panel8 && <Panel8 data={content.panel8} />}
        {content?.panel9 && <Panel9 data={content.panel9} />}
        {content?.panel10 && <Panel10 data={content.panel10} />}
      </div>
    </>
  );
}

export default LandingPage;
