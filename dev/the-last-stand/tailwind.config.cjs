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
    extend: {
      colors: {
        'dark-blue': '#0a192f',
        'neon-turquoise': '#0abdc6',
        'neon-green': '#05c46b',
        'neon-yellow': '#ffd32a',
        'neon-pink': '#ff3f6c',
        'neon-purple': '#7f00ff',
        'neon-orange': '#ff9f1a',
        'neon-red': '#ff3838',
      },
      width: {
        '150': '150%',
        '200': '200%',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left bottom',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right bottom',
          }
        },
        'pan': {
          '0%': {'transform': 'translateX(0%)'},
          '100%': {'transform': 'translateX(-100%)'},
          
        }
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'pan' : 'pan 30s linear infinite',
      }
    },
  },
  plugins: [],
};
