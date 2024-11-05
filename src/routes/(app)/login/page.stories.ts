import Layout from '../+layout.svelte';
import Page from './+page.svelte';
import LayoutDecorator from '@/lib/storybook-utils/layout-decorator.svelte';

export default {
  title: 'Pages/Login',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'clear' }
  },
  decorators: [() => Layout, () => LayoutDecorator]
};

export const Login = {};
