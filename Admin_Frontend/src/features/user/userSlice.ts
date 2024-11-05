// src/features/user/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  image: string;
  email: string;
  roles: string[];
}

const initialState: UserState = {
  name: "",
  image: "",
  email: "",
  roles: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.roles = action.payload.roles;
    },
    clearUser: (state) => {
      state.email = "";
      state.image = "";
      state.name = "";
      state.roles = [];
    },
  
  },
});

// Export actions for use in components
export const { setUser, clearUser } = userSlice.actions;

// Export reducer for store
export default userSlice.reducer;
