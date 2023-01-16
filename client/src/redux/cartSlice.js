import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        setCart: (state, actions) => { state.cart = actions.payload }
    }
})

export const { setCart } = cartSlice.actions

export const cartSliceReducer = cartSlice.reducer