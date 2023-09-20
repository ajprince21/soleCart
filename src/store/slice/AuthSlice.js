import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData:null
}

export const AuthSlice = createSlice({
    name:'Auth',
    initialState,
    reducers:{

    }
})


export const {} = AuthSlice.actions;
export default AuthSlice.reducer;