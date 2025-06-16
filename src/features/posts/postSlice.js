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

  return data;
});

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (postBody) => {
    const { id } = postBody;
    const response = await fetch(`${postUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
      // …
    });
    const data = await response.json();
    return data;
  }
);

export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
  const response = await fetch(`${postUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(postBody),
    // …
  });
  const data = await response.json();
  console.log("data", data);
  return id;
});

// export const fetchPostById = createAsyncThunk(
//   "post/fetchPostById",
//   async (postID) => {
//     const response = await fetch(`${postUrl}/${postID}`);
//     if (!response.ok) throw Error("An error occoured! Unable to fetch posts.");
//     const data = await response.json();
//     return data;
//   }
// );

const initialState = {
  posts: [],
  status: "idle", // pending | success | failed
  editPostStatus: "idle", // pending | success | failed
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
      })
      .addCase(updatePost.pending, (state, action) => {
        state.editPostStatus = "loading";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
        state.editPostStatus = "success";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const id = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = posts;
      });
  },
});

export const selectPostSliceState = (state) => state.posts;

export const selectPostById = (state, postid) =>
  state.posts?.posts.find((post) => post.id === postid);

export const {} = postSlice.actions;

export default postSlice.reducer;
