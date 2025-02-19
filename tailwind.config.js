/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00577e',
          light: '#00577e',
          dark: '#00577e',
        },
        secondary: {
          DEFAULT: '#FFF',
          light: '#FFF',
          dark: '#FFF',
        },
        altenative: {
          DEFAULT: '#03783d',
          light: '#03783d',
          dark: '#03783d',
        },
      },
    },
  },
  plugins: [],
};
