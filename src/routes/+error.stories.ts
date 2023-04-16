import LayoutDecorator from "$lib/storybook-utils/LayoutDecorator.svelte";
import Error from "./+error.svelte";
import Layout from "./+layout.svelte";

export default {
  title: 'Pages/ErrorPage',
  component: Error,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [() => Layout, () => LayoutDecorator]
};

export const ErrorPage = {};
