/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans:   ["Inter", "sans-serif"],
        grotesk:["Space Grotesk", "sans-serif"],
      },
      colors: {
        teal: {
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
        }
      }
    },
  },
  plugins: [],
}