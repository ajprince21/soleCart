import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slice/ProductSlice";
import { cartSlice } from "./slice/CartSlice";

export const store = configureStore({
    reducer:{
        products : productSlice.reducer,
        cart:cartSlice.reducer
    },
})