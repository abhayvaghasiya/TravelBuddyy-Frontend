/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4DA8DA',
          DEFAULT: '#007BFF',
          dark: '#0056b3',
        },
        secondary: {
          light: '#F8F9FA',
          DEFAULT: '#6C757D',
          dark: '#343A40',
        },
      },
    },
  },
  plugins: [],
}

