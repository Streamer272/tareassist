/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      transparent: "transparent",
      background: "#35354d",
      surface: "#eeeeee",
      "surface-variant": "#d9d9d9"
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
