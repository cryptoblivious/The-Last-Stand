/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './index.html'],
  theme: {
    fontFamily: {
      sans: ['Electrolize', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      serif: ['Georgia', 'Cambria'],
      mono: ['SFMono-Regular', 'Menlo'],
      orbitron: ['Orbitron', 'sans-serif'],
      'tilt-neon': ['Tilt Neon', 'cursive'],
      audiowide: ['Audiowide', 'cursive'],
      macondo: ['Macondo', 'cursive'],
    },
    extend: {},
  },
  plugins: [],
};
