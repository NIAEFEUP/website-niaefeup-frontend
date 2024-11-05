import { Layout } from 'lucide-svelte';
import Page from './+page.svelte';
import LayoutDecorator from '$lib/storybook-utils/layout-decorator.svelte';

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
