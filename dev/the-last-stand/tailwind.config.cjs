// Nom du fichier : tailwind.config.cjs
// Contexte : Un fichier de type cjs qui permet de configurer tailwind
// Nom des auteurs : Jonathan Robinson et Andrzej Wisniowski
// Références : https://chat.openai.com/

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
        150: '150%',
        200: '200%',
      },
      backgroundImage: (theme) => ({
        panning: "url('./public/assets/wallpapers/pixel_city_lights_off.jpg'), url('./public/assets/wallpapers/pixel_city_lights_off.jpg')",
      }),
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left bottom',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right bottom',
          },
        },
        panning: {
          '0%': { backgroundPosition: '0% 0%', backgroundSize: '125% 100%' },
          '50%': { backgroundPosition: '-100% 0%', backgroundSize: '125% 100%' },
          '100%': { backgroundPosition: '-200% 0%', backgroundSize: '125% 100%' },
        },
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        panning: 'panning 40s linear infinite',
      },
    },
  },
  plugins: [],
};
