module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier', // Disables ESLint rules that might conflict with Prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier
  ],
  rules: {
    // Custom rules can be added here
  },
};
