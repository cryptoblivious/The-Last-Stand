module.exports = {
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  rules: {
    '@typescipt-eslint/interface-name-prefix': ['always'],
    'no-underscore-dangle': 'error',
    'no-unused-vars': 'error',
  },
};
