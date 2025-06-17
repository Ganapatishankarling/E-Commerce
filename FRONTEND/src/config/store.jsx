import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../slice/userSlice.jsx"
import categoryReducer from "../slice/CategorySlice.jsx"
import productReducer from "../slice/ProductSlice.jsx"
import accountReducer from "../slice/AccountSlice.jsx"
const store = configureStore({
    reducer:{
        users:userReducer,
        categories:categoryReducer,
        products:productReducer,
        account:accountReducer
    }
})
export default store