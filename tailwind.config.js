/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'nori-green': '#3b8a3b',
          'nori-light': '#a8e0a8',
          'nori-dark': '#1f4f1f',
          'nori-accent': '#f9a826',
        },
        fontFamily: {
          'sans': ['Inter', 'sans-serif'],
        },
        animation: {
          'float': 'float 3s ease-in-out infinite',
          'grow': 'grow 2s ease-in-out infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          grow: {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' },
          },
        },
      },
    },
    plugins: [],
  }