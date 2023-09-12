import { createSlice } from '@reduxjs/toolkit'
import products from '../../global/data'

const initialState = {
    products: products,
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getProducts: (state) => {
            return state.products;
        }
    }
})


export const { getProducts } = productSlice.actions
export default productSlice.reducer