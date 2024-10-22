// src/features/posts/postsSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItems } from "../../APIs/itemService";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

// Async thunk for fetching posts
export const fetchPosts = createAsyncThunk(
  "items/getAllItems", // The action type
  async () => {
    const response = await getItems(); // Await the API call to fetch items
    console.log("response");
    console.log(response);
    return response; // Assuming the data is in the `data` field of the response
  }
);


const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postsSlice.reducer;
