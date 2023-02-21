@REM Put this file in your root directory before running it
@REM npm install --global yarn
yarn create vite nom_application --template react-ts
@REM Usually script doesn't run past this, so you have to manually cd into the directory
cd nom_application
yarn
yarn add react-router-dom tailwindcss postcss autoprefixer localforage match-sorter sort-by eslint
yarn add --dev @types/react-router-dom @types/localforage @types/match-sorter @types/sort-by @types/tailwindcss @types/react @types/postcss @types/autoprefixer @types/eslint
touch .eslint.js
@REM Put suggested stuff in .eslint.js
yarn dev