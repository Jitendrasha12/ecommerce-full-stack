/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      cursor: ['disabled'],
      // Add other variants if needed
    },
  },
  theme: {
    extend: {},
  },
  plugins: [],
}

