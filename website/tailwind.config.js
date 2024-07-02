/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        text: '#06020b',
        background: '#f5f0fc',
        primary: '#7331d6',
        secondary: '#e789e7',
        accent: '#df61c5',
      },
    },
  },
  plugins: [],
};
