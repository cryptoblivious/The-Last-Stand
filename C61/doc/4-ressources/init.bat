@REM Put this file in your root directory before running it
@REM npm install --global yarn
yarn create vite nom_application --template react-ts
@REM Usually script doesn't run past this, so you have to manually cd into the directory
cd nom_application
yarn
yarn add react-router-dom tailwindcss postcss autoprefixer eslint passport passport-google-oauth20
yarn add --dev @types/react-router-dom @types/react @types/postcss @types/autoprefixer @types/eslint @types/passport-google-oauth20
touch .eslintrc.js
@REM Put suggested stuff in .eslint.js
touch tailwind.config.cjs
@REM Put suggested stuff in tailwind.config.cjs
touch postcss.config.cjs
@REM Put suggested stuff in postcss.config.cjs
yarn dev