/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        // primary: "#ff8c00",
        primary: "#9c82f7",
        secondary: "#fbe6a2",
        tert: "#f3cec8",
        // secondary: "#033333",
      },
    },
  },
  plugins: [],
};
