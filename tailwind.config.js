/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#31326F',
        'custom-blue-hover': '#3A3B7C',
        'custom-blue-active': '#28295E',
      },
    },
  },
  plugins: [],
}
