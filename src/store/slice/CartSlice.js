import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    totalProduct:0,
    products:[]
}



export const cartSlice= createSlice({
    name:'cart',
    initialState,
    reducers:{

    }
})

export const {} = cartSlice.actions
export default cartSlice.reducer