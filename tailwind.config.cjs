/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
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
