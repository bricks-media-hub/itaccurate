import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


export const fetchCompanyRatings = createAsyncThunk(
    "companies/fetchCompanyRatings",
    async () => {
        const response = await fetch("/data.json");
        const data = await response.json();
        return data.companyRatings;
    }
)

const initialState = {
    companyPartners: [],
    status: "idle",
    error: null
}


const companyPartnersRatingSlice = createSlice({
    name: "companies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCompanyRatings.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchCompanyRatings.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.companyPartners = action.payload;
        })
        .addCase(fetchCompanyRatings.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    }
})

export default companyPartnersRatingSlice.reducer;