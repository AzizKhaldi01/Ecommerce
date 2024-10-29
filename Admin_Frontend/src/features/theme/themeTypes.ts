// src/features/theme/themeTypes.ts

export interface ThemeState {
    isDarkMode: boolean;
    dark: string;
    light: string;
  }
  
  export type ThemeAction = 
    | { type: 'theme/toggleTheme' }
    | { type: 'theme/setTheme'; payload: 'light' | 'dark' }; // New action type for setting a specific theme
  