/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#b794f6',
          600: '#a855f7',
          700: '#9333ea',
          800: '#7e22ce',
          900: '#6b21a8',
        },
        dark: {
          bg: '#0a0a0a',
          card: '#18181b',
          border: '#27272a',
          text: '#fafafa',
          'text-secondary': '#a1a1aa',
        },
        light: {
          bg: '#fafafa',
          card: '#ffffff',
          border: '#e4e4e7',
          text: '#18181b',
          'text-secondary': '#71717a',
        },
      },
    },
  },
  plugins: [],
};