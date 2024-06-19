/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'vollkorn': ['Vollkorn', 'serif'],
        'pt-sans': ['PT Sans', 'sans-serif'],
      },
      colors: {
        gray: {
          800: '#222022',
        },
        yellow: {
          200: '#FFEF7E',
        },
        teal: {
          200: '#B7F9E9',
        },
      },
    },
  },
  plugins: [],
};
