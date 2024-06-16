/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        philosopher: ['Philosopher', 'sans-serif']
      },
      colors: {
        primary: '#BD946D',
        secondary: '#2C3831'
      }
    }
  },
  plugins: []
};
