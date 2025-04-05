/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#C5A572',
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
      }
    },
  },
  plugins: [],
} 