import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItems } from "../../APIs/itemService";


const initialState = {
  posts: null,
  loading: false,
  err: null,
};


export const getPosts = createAsyncThunk(
    "items/getAllItems", // The action type
    async () => {
      const response = await getItems(); // Await the API call to fetch items
      console.log("response")
      console.log(response)
      return response; // Assuming the data is in the `data` field of the response
    }
  );

export const counterSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload; // Assign the fetched posts to the state
        state.err = null; // Clear any previous errors
      });
      
      builder.addCase(getPosts.rejected, (state) => {
        state.loading = false;
        state.err = "can't get the posts";
      });
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
