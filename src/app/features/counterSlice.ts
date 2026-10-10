import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    value: 0
};


const counter = createSlice({
    name: "counter",
    initialState: initialState,
    reducers:{
        increment: (state) => {
            state.value = state.value + 1;
        },
        decrement: (state) => {
            state.value = state.value - 1;
        },
        incrementByNumber: (state, action) => {
            state.value = state.value + action.payload;
        },
        counterReset: (state) => {
            state.value = 0;
        }
    }
    
});
export const {increment, decrement, incrementByNumber, counterReset} = counter.actions;
export default counter.reducer;