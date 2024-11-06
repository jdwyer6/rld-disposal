/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,jsx}",
    "./src/**/*.{html,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        "brand-primary": {
          veryLight: '#e3edff',
          light: '#506281',
          DEFAULT: '#313F57',
          dark: '#24324a',
        },
        "brand-secondary": {
          light: '#fff2cb',
          DEFAULT: '#F8D673',
          dark: '#fed762',
        },
        "text-primary": {
          DEFAULT: '#1a202c',
        },
      },
    },
  },
  plugins: [],
}
