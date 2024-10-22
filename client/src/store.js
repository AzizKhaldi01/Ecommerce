import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/CounterSlice";
import postsReducer from "./features/posts/postsSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
  },
});
