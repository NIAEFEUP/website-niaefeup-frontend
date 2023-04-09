import Footer from "./Footer.svelte";

export default {
  title: 'Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen'
  }
};

export const DesktopFooter = {};

export const MobileFooter = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
