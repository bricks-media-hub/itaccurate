import React from "react";
import Marquee from "react-fast-marquee";

const logos = [
  [
    "https://static.vecteezy.com/system/resources/thumbnails/019/766/240/small_2x/amazon-logo-amazon-icon-transparent-free-png.png",
    "https://s32519.pcdn.co/es/wp-content/uploads/sites/3/2020/08/accenture-logo-672x284px.png",
    "https://logos-world.net/wp-content/uploads/2020/05/Facebook-Logo-2019.png",
    "https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404_1280.png",
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fin.pinterest.com%2Fpin%2Flic-logo-png--611293349451988809%2F&psig=AOvVaw0BKOyJos3rBPnOptc3BEU2&ust=1752739830887000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDC__32wI4DFQAAAAAdAAAAABAE",
    "https://www.datocms-assets.com/2885/1683590388-hcl-logo-1976.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlYoQIGth_i5grToK6gKwKaP8t46LBkmRRiA&s",
    "https://upload.wikimedia.org/wikipedia/en/thumb/3/39/Kotak_Mahindra_Group_logo.svg/1200px-Kotak_Mahindra_Group_logo.svg.png",
    "https://zerocreativity0.wordpress.com/wp-content/uploads/2017/01/himalaya-logo.jpg",
    "https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/JSW_Group_logo.svg/1200px-JSW_Group_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/en/d/d5/Parle_Products_logo.svg",
    "https://1000logos.net/wp-content/uploads/2021/06/HDFC-Bank-logo.jpg"
  ],
  [
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    "https://logos-world.net/wp-content/uploads/2021/03/Zoom-Logo-2014.png",
    "https://getvectorlogo.com/wp-content/uploads/2018/12/asian-paints-vector-logo.png",
    "https://logovector.net/wp-content/uploads/2014/02/samsung-logo-preview.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_5jHYBO2FGEvTYFvAvKyyiT2oIffSo_yu7g&s",
    "https://download.logo.wine/logo/Hexaware_Technologies/Hexaware_Technologies-Logo.wine.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVHawLgNbZMT_U6NZaLSceyssYtsHEfucJDg&s",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Persistent_Systems_Logo.svg/2560px-Persistent_Systems_Logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/1280px-Coca-Cola_logo.svg.png",
    "https://logos-world.net/wp-content/uploads/2023/03/Reliance-Industries-Ltd.-Logo.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxQ4crgfsf8bfVYfOknLKBJenshAIkDHHllg&s",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Godrej_Logo.svg/1200px-Godrej_Logo.svg.png"
  ],
  [
    "https://cdn.iconscout.com/icon/free/png-256/free-flipkart-logo-icon-download-in-svg-png-gif-file-formats--online-shopping-brand-logos-pack-icons-226594.png?f=webp",
    "https://commercialvehicle.in/wp-content/uploads/2020/05/Uber_logo_2018.png",
    "https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen.jpg",
    "https://1000logos.net/wp-content/uploads/2021/05/Wipro-logo.png",
    "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202106/tcs_logo_1200_020621101143.jpg?size=1200:675",
    "https://www.drupal.org/files/Capgemini_Logo_2COL_RGB.png",
    "https://upload.wikimedia.org/wikipedia/commons/7/75/Baidyanath_logo.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVzzP0BJ_eaaAdtucIqNveIsqgTEWvE-JMPg&s",
    "https://1000logos.net/wp-content/uploads/2020/08/Infosys-Logo.png",
    "https://www.infocepts.ai/wp-content/uploads/2023/01/Infocepts-Data-AI-logo.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5woo_4eAvmn17M46XMWACq7yvdqJFm6Xlmg&s",
    "https://1000logos.net/wp-content/uploads/2019/08/Deloitte-Logo.jpg"

  ],
  [
    "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/1280px-Salesforce.com_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    "https://logos-world.net/wp-content/uploads/2020/08/Adobe-Logo-2023.png",
    "https://media.licdn.com/dms/image/v2/D4E0BAQGGGiJTjHmTOg/company-logo_200_200/company-logo_200_200/0/1709182815586/rm_consulting_services_india_logo?e=2147483647&v=beta&t=1DqrAVLmNdqhRnsMBTDU8nXxOt6OYYnoNXh6ScCS5PA",
    "https://media.licdn.com/dms/image/v2/C4E0BAQEp8OLegHdg1A/company-logo_200_200/company-logo_200_200/0/1639563362647/click2cloud_inc__logo?e=2147483647&v=beta&t=UDa8vpPL_UQy8oXm6qhQR_HWgt3e-e41G83naR5Ekvg",
    "https://media.licdn.com/dms/image/v2/D4D16AQGZJDpqOXvoKQ/profile-displaybackgroundimage-shrink_200_800/profile-displaybackgroundimage-shrink_200_800/0/1714654088934?e=2147483647&v=beta&t=aynuwG2OOwsLpXWXus4SUGtvpWWFUo49W8SIeydHef8",
    "https://logos-world.net/wp-content/uploads/2020/06/Sony-Logo.jpg",
    "https://www.financialexpress.com/wp-content/uploads/2023/07/ICICI-Securities.jpg",
    "https://banner2.cleanpng.com/20180202/tlw/av2kg177k.webp",
    "https://logos-world.net/wp-content/uploads/2020/08/Bosch-Logo-2018-present.jpg",
    "https://logos-world.net/wp-content/uploads/2022/12/Bajaj-Auto-Logo.png"
  ],
];

const CompanyMarquee = ({ title }) => {
  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-6 ${title ? 'text-4xl md:text-5xl font-bold mb-4 text-blue-800 dark:text-blue-300' : 'text-gray-800 dark:text-white'
            }`}
        >
          {title ? (
            title
          ) : (
            <>
              Achieve Your Career Goals Like Our{' '}
              <span className="text-blue-600 dark:text-blue-400">Successfull Alumni</span>
            </>
          )}
        </h2>

        {/* Marquee Rows */}
        <div className="flex flex-col gap-6">
          {logos.map((row, index) => (
            <Marquee key={index} speed={40} gradient={false} pauseOnHover={true}>
              {row.map((logo, i) => (
                <div
                  key={i}
                  className="mx-6 flex items-center justify-center hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={logo}
                    alt={`Logo ${i + 1}`}
                    className="w-28 h-28 sm:w-32 sm:h-32 object-contain dark:brightness-90"
                  />
                </div>
              ))}
            </Marquee>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyMarquee;
