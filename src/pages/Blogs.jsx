import React from 'react'
import MaintenancePage from '../lib/MaintenancePage'
import { getSeoData } from "../lib/seoUtil";
import { useLocation } from 'react-router-dom';

function Blogs() {
  const location = useLocation();
    const path = location.pathname.slice(1);
    const seo = getSeoData(path);

  return (
    <>
    
    {/* seo tags */}
    <title>{seo.metaTitle}</title>
    <meta name="description" content={seo.metaDescription} />
    <link rel="canonical" href={seo.canonicalTag} />
    {/* <meta name="keywords" content={seo.keywords || ''} /> */}
    
    {/* content page */}
    <MaintenancePage />
    </>
  )
}

export default Blogs