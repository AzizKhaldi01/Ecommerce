import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import themeReducer from "../features/theme/themeSlice"
export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    // Add other slices here as needed
  },
});

// Type definitions for the store and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;