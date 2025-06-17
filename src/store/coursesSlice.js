import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


export const fetchCourses = createAsyncThunk(
    "courses/fetchCourses",
    async () => {
        const response = await fetch("/data.json");
        const data = await response.json();
        return data.courses;
    }
)

const initialState = {
    courseData: [],
    status: "idle",
    error: null
}

 
const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCourses.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchCourses.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.courseData = action.payload;
        })
        .addCase(fetchCourses.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    }
})

export default coursesSlice.reducer;