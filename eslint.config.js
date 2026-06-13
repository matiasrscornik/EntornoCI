import globals from 'globals';

export default [
  {
    ignores: ['dist', 'node_modules', 'coverage', 'cypress/screenshots', 'cypress/videos'],
  },
  {
    files: ['src/**/*.js', 'test/**/*.js', 'cypress/**/*.js', '*.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.mocha,
        ...globals.node,
        cy: 'readonly',
        Cypress: 'readonly',
      },
    },
    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'space-in-parens': ['error', 'never'],
    },
  },
];
