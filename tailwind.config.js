/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // This enables class-based dark mode
  theme: {
    extend: {
      screens: {
        'xs': '360px',      // Small phones
        'sm': '640px',      // Mobile (default Tailwind)
        'md': '768px',      // Tablet (default)
        'lg': '1024px',     // Small laptop (default)
        'xl': '1280px',     // Laptop (default)
        '2xl': '1536px',    // Desktop monitor (default)
        '3xl': '1920px',    // Full HD display
        '4xl': '2560px',    // 2K display / ultra-wide monitors
        '5xl': '3200px',    // Super ultra-wide / ultra HD
        '6xl': '3840px',    // 4K UHD
        '7xl': '5120px',    // 5K resolution
        '8xl': '7680px',    // 8K resolution (extreme cases)
      },
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

