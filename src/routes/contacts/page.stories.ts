import Page from './+page.svelte';
import Layout from '@/routes/+layout.svelte';
import LayoutDecorator from '$lib/storybook-utils/LayoutDecorator.svelte';

export default {
  title: 'Pages/Contacts',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'clear' }
  },
  decorators: [() => Layout, () => LayoutDecorator]
};

export const Contacts = {};
