const { defineConfig, globalIgnores } = require('eslint/config');

const tsParser = require('@typescript-eslint/parser');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const _import = require('eslint-plugin-import');

const { fixupPluginRules } = require('@eslint/compat');

const globals = require('globals');
const parser = require('svelte-eslint-parser');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

module.exports = defineConfig([
  {
    extends: compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:svelte/recommended',
      'prettier'
    ),

    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
      ecmaVersion: 2020,

      parserOptions: {
        extraFileExtensions: ['.svelte']
      },

      globals: {
        ...globals.browser,
        ...globals.node
      }
    },

    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: fixupPluginRules(_import)
    },

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

    settings: {
      'svelte/typescript': () => require('typescript'),
      'import/extensions': ['.js', '.ts', '.svelte', '.stories.ts'],

      'import/resolver': {
        typescript: {
          alwaysTryTypes: true
        }
      }
    }
  },
  {
    files: ['**/*.svelte'],

    languageOptions: {
      parser: parser,

      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    },

    rules: {
      'no-undef': 'off'
    }
  },
  globalIgnores([
    '**/.DS_Store',
    '**/node_modules',
    'build',
    '.svelte-kit',
    'package',
    '**/.env',
    '**/.env.*',
    '!**/.env.example',
    '**/storybook-static',
    '**/pnpm-lock.yaml',
    '**/package-lock.json',
    '**/yarn.lock'
  ])
]);
