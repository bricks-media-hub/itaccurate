/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // This enables class-based dark mode
  theme: {
    extend: {
      colors: {
        // Add custom colors if needed
        primary: {
          DEFAULT: "#2563eb", // blue-600
          dark: "#1d4ed8", // blue-700
        },
        dark: {
          bg: "#111827", // gray-900
          text: "#f3f4f6", // gray-100
          card: "#1f2937", // gray-800
        },
      },
      // perspective: {
      //   '1000': '1000px',
      // },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [
      require('tailwind-scrollbar-hide'),
  ],
};

