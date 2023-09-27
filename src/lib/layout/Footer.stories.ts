import Footer from './Footer.svelte';

export default {
  title: 'Molecules/Layout/Footer',
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
