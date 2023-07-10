module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:storybook/recommended'
  ],
  plugins: ['svelte3', '@typescript-eslint', 'import'],
  ignorePatterns: ['*.cjs'],
  rules: {
    'import/no-relative-parent-imports': 'error',
    'import/export': 'error',
    'import/no-empty-named-blocks': 'error',
    'import/named': 'error',
    'import/no-absolute-path': 'error',
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/order': 'error'
  },
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'no-undef': 'off'
      }
    }
  ],
  settings: {
    'svelte3/typescript': () => require('typescript'),
    'import/extensions': ['.js', '.ts', '.svelte', '.stories.ts'],
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  }
};
