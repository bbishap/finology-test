/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // adjust according to your project structure
  ],
  theme: {
    extend: {
      screens: {
        '2xs': '320px', // custom breakpoint for 320px
      },
    },
  },
  plugins: [],
};