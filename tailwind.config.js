/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        primary: "#16ABF8",
        background: "#E5E5E5",
        inactive: "#888888",
        danger: "#ED4C5C",
        light: "#F4F4F4",
        "very-high": "#ED4C5C",
        high: "#F8A541",
        medium: "#00A790",
        low: "#428BC1",
        "very-low": "#8942C1",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
