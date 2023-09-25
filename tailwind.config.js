/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}","./public/**/*.{js,jsx,ts,tsx,html}"
  ],
  theme: {
    extend: {
      screens: {
        'xmd': '860px',
        'lg': '1100px'
        // => @media (min-width: 640px) { ... }
      }
    },
  },
  plugins: [],
}

