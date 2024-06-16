/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        philosopher: ['Philosopher', 'sans-serif']
      },
      backgroundImage: {
        hero: 'url("./src/assets/images/hero.jpg")'
      },
      colors: {
        primary: '#BD946D',
        secondary: '#2C3831'
      }
    }
  },
  plugins: []
};
