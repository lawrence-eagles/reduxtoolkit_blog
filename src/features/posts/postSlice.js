import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const postUrl = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch(postUrl);
  if (!response.ok) throw Error("An error occoured! Unable to fetch posts.");
  const data = await response.json();
  return data;
});

export const addPost = createAsyncThunk("post/addPost", async (postBody) => {
  const response = await fetch(postUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postBody),
    // …
  });
  const data = await response.json();
  console.log("response", data);

  return data;
});

const initialState = {
  posts: [],
  status: "idle", // pending | success | failed
  error: null,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success";
        let min = 1;
        const loadedPosts = action.payload?.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          return post;
        });
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.status = "success";
        action.payload.date = new Date().toISOString();
        state.posts.push(action.payload);
      });
  },
});

export const selectPostSliceState = (state) => state.posts;

export const {} = postSlice.actions;

export default postSlice.reducer;
