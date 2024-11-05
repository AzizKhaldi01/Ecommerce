import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  isDarkMode: boolean;
  dark: string;
  light: string;
}

const initialState: ThemeState = {
  isDarkMode: false,
  dark: "bg-black text-white",
  light: "bg-[#E4E4E4]  ",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
