import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/postSlice/postSlice";

export const store = configureStore({
    reducer: {
        posts: postReducer,
    }
})