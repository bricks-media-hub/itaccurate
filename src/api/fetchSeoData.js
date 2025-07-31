
export const fetchCourseSeoData = async (DynamicRoute) => {
    try {
        const response = await fetch("/data/seo/seo-data/course-seo.json");
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        return data.courseSeoData[DynamicRoute] || {};
    } catch (error) {
        console.error('Error fetching seo data:', error);
        return {};
    }
}