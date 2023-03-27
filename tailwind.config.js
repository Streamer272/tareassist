/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.vue", "./layouts/**/*.vue", "./components/**/*.vue"],
  theme: {
    colors: {
      "on-background": "#e0e0e0",
      background: "#35354d",
      surface: "#eeeeee",
      "surface-variant": "#d9d9d9",
      transparent: "transparent",
    },
    extend: {
      fontFamily: {
        poppins: "Poppins",
      },
      backgroundImage: {
        sandwich: "url('/images/sandwich.png')",
      },
    },
  },
  plugins: [],
};
