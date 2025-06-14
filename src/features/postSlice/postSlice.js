import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    status: "idle" // pending | success | error
}

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {}
})




export const {} = postSlice.actions;

export default postSlice.reducer;