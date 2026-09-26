/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        meringo: {
          50: '#f2f8f5',
          100: '#e1efe8',
          200: '#c3ded1',
          300: '#9ac4b4',
          400: '#6ea493',
          500: '#528877',
          600: '#3f6d5f',
          700: '#34574d',
          800: '#2c473f',
          900: '#273c36',
          950: '#13221e',
        },
        coastal: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          500: '#0ea5e9',
          700: '#0369a1',
          800: '#075985',
        }
      }
    },
  },
  plugins: [],
}
