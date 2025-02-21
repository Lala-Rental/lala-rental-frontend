/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e1f28',
          light: '#1e1f28',
          dark: '#1e1f28',
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
