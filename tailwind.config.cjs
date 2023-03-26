/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        dm: "DM Sans",
      },
      backgroundImage: {
        sandwich: "url('/images/sandwich.png')",
      },
      backgroundColor: {
        "bg-half": "rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
