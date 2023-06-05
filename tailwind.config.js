/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      extend: {
        fontFamily: {
          'Anton': ['Anton', 'sans-serif',],
        },
        colors: {
          golden: '#ddb46a'
        },
      },
    },
  },
  darkMode: ['class', '[data-mode="dark"]'],
  plugins: [],
}
