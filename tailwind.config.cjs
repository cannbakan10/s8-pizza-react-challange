/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: "#FAF7F2",
        redpizza: "#CE2829",
        yellowpizza: "#FDC913",
        gray: { 500: "#5F5F5F", 900: "#292929" },
      },
      fontFamily: {
        barlow: ['"Barlow"', "system-ui", "ui-sans-serif", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
