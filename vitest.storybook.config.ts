import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    storybookTest({
      configDir: path.join(dirname, '.storybook'),
      storybookScript: 'npm run storybook -- --ci'
    })
  ],
  test: {
    name: 'storybook',
    include: ['src/**/*.stories.ts'],
    browser: {
      enabled: true,
      provider: playwright({}),
      instances: [
        {
          browser: 'chromium',
          headless: true
        }
      ]
    },
    setupFiles: ['./.storybook/vitest.setup.ts']
  }
});
