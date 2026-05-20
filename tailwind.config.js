/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // تأكد إن السطر ده مكتوب صح
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a',
        secondary: '#0f172a',
      },
    },
  },
  plugins: [],
}