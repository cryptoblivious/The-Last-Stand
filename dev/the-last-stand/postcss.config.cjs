// Nom du fichier : postcss.config.cjs
// Contexte : Un fichier de type cjs qui permet de configurer le postcss
// Nom de l'auteur : Andrzej Wisniowski
// Autres étudiants : Jonathan Robinson
// Références : https://chat.openai.com/

module.exports = {
  plugins: [require('tailwindcss'), require('autoprefixer')],
};
