/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e6f4e7",
          100: "#cde9d0",
          200: "#9bd3a0",
          300: "#69be71",
          400: "#37a841",
          500: "#059212",
          600: "#058310",
          700: "#04750e",
          800: "#04660d",
          900: "#03580b",
          950: "#034909",
          960: "#023a07",
          970: "#011d04",
        },
        secondary: {
          50: "#e6fae6",
          100: "#cdf6cc",
          200: "#9bec99",
          300: "#6ae367",
          400: "#38d934",
          500: "#06d001",
          600: "#05a601",
          700: "#047d01",
          800: "#025300",
          900: "#012a00",
        },
      },
      fontFamily: {
        roboto: ['"Roboto"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
