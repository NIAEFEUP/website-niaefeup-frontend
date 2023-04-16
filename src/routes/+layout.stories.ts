import Layout from "./+layout.svelte";
import LayoutDecorator from "$lib/storybook-utils/LayoutDecorator.svelte";

export default {
  title: 'Organisms/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [() => LayoutDecorator]
};

export const Default = {};
