import navbarReducer from "../store/navbarSlice"
import companyPartnersRatingsReducer from "../store/companyPartnersRatingsSlice"
import coursesReducer from "../store/coursesSlice"
import placedStudentsReducer from "../store/placedStudentsSlice"
import coursesDataReducer from "../store/coursesDataSlice"
import { configureStore } from "@reduxjs/toolkit"


const store = configureStore({
    reducer:{
        navbar: navbarReducer,
        companies: companyPartnersRatingsReducer,
        courses: coursesReducer,
        students: placedStudentsReducer,
        courseBankLogoData: coursesDataReducer,
    }
})

export default store;
