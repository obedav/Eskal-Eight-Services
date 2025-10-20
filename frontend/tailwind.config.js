/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B1F3F',
          light: '#112B4A',
        },
        secondary: {
          DEFAULT: '#1E90FF',
          dark: '#0077CC',
        },
      },
    },
  },
  plugins: [],
}
