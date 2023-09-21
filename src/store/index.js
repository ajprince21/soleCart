import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slice/ProductSlice";
import { cartSlice } from "./slice/CartSlice";
import { AuthSlice } from "./slice/AuthSlice";

export const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        cart: cartSlice.reducer,
        auth: AuthSlice.reducer
    },
})