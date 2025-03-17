/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'liquid-blue': '#0A85C7',
        'liquid-dark': '#111827',
        'liquid-light': '#F9FAFB',
        'liquid-navy': '#001945',
        'liquid-yellow': '#FFD454',
        'liquid-teal': '#B7E4F8',
        'liquid-cream': '#FFF2CC',
        'liquid-border': '#1E3A6E'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 