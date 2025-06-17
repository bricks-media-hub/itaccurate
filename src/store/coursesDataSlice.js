import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


export const fetchCoursesData = createAsyncThunk(
    "coursesName/fetchCoursesData",
    async () => {
        const response = await fetch("/data.json");
        const data = await response.json();
        return data.coursesData;
    }
)

const initialState = {
    courseBankData: [],
    status: "idle",
    error: null
}


const coursesDataSlice = createSlice({
    name: "coursesName",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCoursesData.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchCoursesData.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.courseBankData = action.payload;
        })
        .addCase(fetchCoursesData.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    }
})

export default coursesDataSlice.reducer;