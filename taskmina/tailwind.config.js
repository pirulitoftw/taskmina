/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable dark mode based on class
  theme: {
    extend: {
      colors: {
        turquoise: '#40e0d0',
        gold: '#ffd700',
        teal: '#008080',
        'antiflash-white': '#f0f0f0',
        jet: '#333333',
        'footer-light': '#333333', // Changed to jet color for light mode
        'footer-dark': '#1f2937', 
        'header-light': 'rgb(0 128 128 / var(--tw-bg-opacity))', // Teal for light mode
        'page-light': 'rgb(240 240 240 / var(--tw-bg-opacity))',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-delay': 'float 3s ease-in-out 1s infinite',
        'float-slow': 'float 4s ease-in-out infinite',
        'float-delay-slow': 'float 4s ease-in-out 2s infinite',
        'fadeIn': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};