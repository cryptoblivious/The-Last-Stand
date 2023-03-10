module.exports = {
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  parser: '@typescript-eslint/parser',
  plugins: ['prettier'],
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  rules: {
    // Errors
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
    ],
    'no-underscore-dangle': 'error',
    'no-console': 'off',
    'prettier/prettier': 'error',

    // Warnings
    '@typescript-eslint/no-unused-vars': 'warn',

    // Offs
  },
};
