import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig, mergeConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

import viteConfig from './vite.config.ts';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      projects: [
        {
          extends: true,
          test: {
            name: 'storybook',
            include: ['src/**/*.stories.ts'],
            browser: {
              enabled: true,
              provider: playwright({}),
              headless: true
            },
            setupFiles: ['./.storybook/vitest.setup.ts']
          },
          plugins: [
            storybookTest({
              configDir: path.join(dirname, '.storybook'),
              storybookScript: 'npm run storybook -- --ci'
            })
          ]
        }
      ]
    }
  })
);
