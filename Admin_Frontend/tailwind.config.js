/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#2684FF",     // Example primary color (blue); replace with your desired main color
        sec: "#FBBF24",      // Example secondary color (yellow); replace with your desired secondary color
      },
    },
  },
  plugins: [],
};
