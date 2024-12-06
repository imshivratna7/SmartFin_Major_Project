/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        limeGreen: '#C5ADC5',
        pinkCoral: '#B2B5E0',
      },
    },
  },
  plugins: [],
};

