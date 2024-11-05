import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    // Adjust the TextField height
    MuiTextField: {
      defaultProps: {
        margin: "dense",
      },
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            fontSize: "0.875rem",
            height: "55px",
            backgroundColor: "#F5F5F5", 
        
          },
          "& .MuiInputLabel-root": {
            fontSize: "0.875rem",
          },
        },
      },
    },
    // Adjust the Select component height
    MuiSelect: {
      defaultProps: {
        margin: "dense",
      },
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          backgroundColor: "#F5F5F5", 
          height: "55px",         // Increase height for the select field
          padding: "12px 16px",   // Increase padding for a larger dropdown area
          "& .MuiSelect-select": {
            padding: "12px 16px", // Internal padding to match the TextField height
          },
        },
      },
    },
    // Adjust the height of dropdown menu items
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          minHeight: "40px",  // Set a minimum height for each dropdown item
          padding: "10px 16px", // Adjust padding for a comfortable click area
        },
      },
    },
    // Other component adjustments if needed
    MuiButton: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          fontSize: "0.75rem",
          padding: "6px 16px",
          minWidth: 32,
        },
      },
    },
  },
});

export default theme;
