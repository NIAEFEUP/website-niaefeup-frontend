import LayoutDecorator from '$lib/storybook-utils/LayoutDecorator.svelte';
import Layout from './+layout.svelte';
import Page from './+page.svelte';

export default {
  title: 'Pages/HomePage',
  component: Page,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [() => Layout, () => LayoutDecorator]
};

export const HomePage = {};
