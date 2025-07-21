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

function LandingPage() {
  const [content, setContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // featching data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/data/seo/sap-thane.json");
        setContent(response.data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {content?.panel1 && (
        <Panel1 data={content.panel1} isLoading={isLoading} />
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
      {content?.panel4 && (
        <Panel4 data={content.panel4} imageUrl={content.panel4.imageUrl} />
      )}
      {content?.panel5 && (
        <Panel5 data={content.panel5} imageUrl={content.panel5.imageUrl} />
      )}
      {content?.panel6 && <Panel6 data={content.panel6} />}
      {content?.panel7 && <Panel7 data={content.panel7} />}
      {content?.panel8 && <Panel8 data={content.panel8} />}
      {content?.panel9 && <Panel9 data={content.panel9} />}
      {content?.panel10 && <Panel10 data={content.panel10} />}
    </div>
  );
}

export default LandingPage;
