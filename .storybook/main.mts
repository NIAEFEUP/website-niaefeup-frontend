export default {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-coverage',
    '@storybook/addon-a11y',
    'storybook-addon-pseudo-states'
  ],
  framework: {
    name: '@storybook/sveltekit',
    options: {}
  },
  docs: {
    docsPage: true
  },
  staticDirs: ['../static', '../public']
};
