/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customDark: '#090c10',
        customInputBg: '#2f3a51',
        customInputBorder: '#415071',
      },
    },
  },
  plugins: [],
}

