// For Fetching Course data
export const fetchComponentData = async (DynamicRoute) => {
  try {
    const response = await fetch("/data/courses-details.json");
    if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();
    return data.courseDetails[DynamicRoute] || {};
  } catch (error) {
    console.error('Error fetching component data:', error);
    return {};
  }
}

//for fetching placed student data
export const fetchPlacedStudentData = async () => {
    const response = await fetch("/data/students.json");
    const data = await response.json();
    return data.placedStudentsData;
}

//fetching full course data
export const fetchFullCourseData = async (CourseName) => {
    const response = await fetch("/data/full-courses-data.json");
    const data = await response.json();
    return data.fullCourseData[CourseName];
}