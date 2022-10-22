/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
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
      },
    },
  },
  plugins: [],
};
