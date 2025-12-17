// eslint.config.mjs
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';
import sveltePlugin from 'eslint-plugin-svelte';
import prettierConfig from 'eslint-config-prettier';
import ts from 'typescript';

export default [
  js.configs.recommended,
  ...sveltePlugin.configs.recommended,
  prettierConfig,
  {
    ignores: [
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
      '**/yarn.lock',
      'src/lib/components/ui/dialog',
      'src/lib/components/ui/tabs'
    ]
  },
  {
    files: ['**/*.{js,ts,svelte}'],
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
      ecmaVersion: 'latest',
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
      import: importPlugin
    },
    rules: {
      ...typescriptEslint.configs['eslint-recommended'].rules,
      ...typescriptEslint.configs['recommended'].rules,
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
      'svelte/typescript': () => ts,
      'import/extensions': ['.js', '.ts', '.svelte', '.stories.ts'],
      'import/resolver': {
        typescript: { alwaysTryTypes: true }
      }
    }
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        svelteVersion: '5'
      }
    },
    rules: {
      'no-undef': 'off'
    }
  }
];
