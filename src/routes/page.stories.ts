import Layout from './+layout.svelte';
import Page from './+page.svelte';
import LayoutDecorator from '$lib/storybook-utils/LayoutDecorator.svelte';

export default {
  title: 'Pages/HomePage',
  component: Page,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [() => Layout, () => LayoutDecorator]
};

export const HomePage = {};
