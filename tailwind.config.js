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
        indigo: {
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
        }
      }
    },
  },
  plugins: [],
}