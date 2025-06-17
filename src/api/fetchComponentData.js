// For Fetching Course data
export const fetchComponentData = async (DynamicRoute) => {
    const response  = await fetch("/data.json");
    const data = await response.json();
    return data.courseDetails[DynamicRoute];
}

//for fetching placed student data
export const fetchPlacedStudentData = async () => {
    const response = await fetch("/data.json");
    const data = await response.json();
    return data.placedStudentsData;
}

//fetching full course data
export const fetchFullCourseData = async (CourseName) => {
    const response = await fetch("/data.json");
    const data = await response.json();
    return data.fullCourseData[CourseName];
}