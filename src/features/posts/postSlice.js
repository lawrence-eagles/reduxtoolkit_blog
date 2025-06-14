import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const postUrl = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
   const response = await fetch(postUrl);
   const data = await response.json();
   console.log("data", data);
   return data;
})



const initialState = {
    posts: [],
    status: "idle", // pending | success | failed
    error: null
}

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.status = "loading"
        }).addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = "success";
            state.posts = state.posts.concat(action.payload);
        }).addCase(fetchPosts.rejected, (state, action) => {
            state.status = "failed";
        })
    }
})


export const selectPostSliceState = (state) => state.posts;

export const {} = postSlice.actions;

export default postSlice.reducer;