/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bcx-bg': '#0D1B2A',
        'bcx-surface': '#1B263B',
        'bcx-primary': '#4FC3F7',
        'bcx-secondary': '#16A34A',
        'bcx-text': '#D1D5DB',
        'bcx-text-strong': '#FFFFFF',
        'bcx-link': '#60A5FA',
        'bcx-error': '#EF4444',
      },
    },
  },
  plugins: [],
}
