import seoData from "../data/seo-data/course-seo.json";

export const getSeoData = (slug) => {
  return seoData[slug] || {};
};
