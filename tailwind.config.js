/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontSize: {
      large: "5.052rem",
      button: "0.875rem",
      medium: "2.00rem",
      h2: "3.80rem",
      small: "0.987rem",
    },

    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
      gorilla: ["GORILLA", "cursive"],
    },
    extend: {},
  },
};
