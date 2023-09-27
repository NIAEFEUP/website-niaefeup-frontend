import 'tailwindcss/tailwind.css';
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
