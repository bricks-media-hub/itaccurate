import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


export const fetchPlacedStudents = createAsyncThunk(
    "students/fetchPlacedStudents",
    async () => {
        const response = await fetch("/data/students.json");
        const data = await response.json();
        return data.students;
    }
)

const initialState = {
    placedStudents: [],
    status: "idle",
    error: null
}


const placedStudentsSlice = createSlice({
    name: "students",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchPlacedStudents.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchPlacedStudents.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.placedStudents = action.payload;
        })
        .addCase(fetchPlacedStudents.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    }
})

export default placedStudentsSlice.reducer;