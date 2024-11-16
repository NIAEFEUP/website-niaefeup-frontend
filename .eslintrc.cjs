/** @type { import("eslint").Linter.Config } */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'import/export': 'error',
    'import/no-empty-named-blocks': 'error',
    'import/no-absolute-path': 'error',
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/order': 'error'
  },

  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte']
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      },
      rules: {
        'no-undef': 'off'
      }
    }
  ],
  settings: {
    'svelte/typescript': () => require('typescript'),
    'import/extensions': ['.js', '.ts', '.svelte', '.stories.ts'],
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    }
  }
};
