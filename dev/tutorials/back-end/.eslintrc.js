module.exports = {
  parserOptions: {
    project: './tsconfig.json',
    // ecmaVersion: 6,
    sourceType: 'module',
    //ecmaFeatures: { jsx: true,},
  },
  parser: '@typescript-eslint/parser',
  plugins: ['prettier'],
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  rules: {
    '@typescript-eslint/interface-name-prefix': [
      'error',
      { prefixWithI: 'always' },
    ],
    'no-underscore-dangle': 'error',
    'no-unused-vars': 'error',
  },
};
