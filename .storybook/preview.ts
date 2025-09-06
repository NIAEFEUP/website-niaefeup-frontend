import '../src/app.css';

import { initialize, mswLoader } from 'msw-storybook-addon';

/*
 * Initializes MSW
 * See https://github.com/mswjs/msw-storybook-addon#configuring-msw
 * to learn how to customize it
 */
initialize();

const preview = {
  loaders: [mswLoader] // Add the MSW loader to all stories
};

export default preview;

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  backgrounds: {
    default: 'dark'
  },
  options: {
    storySort: {
      order: ['Atoms', 'Molecules', 'Organisms', 'Pages']
    }
  },
  a11y: {
    element: '#storybook-root',
    config: {
      rules: [{ id: 'color-contrast', reviewOnFail: true }]
    }
  }
};
