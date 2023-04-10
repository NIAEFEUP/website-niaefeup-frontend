import Sidebar from "./Sidebar.svelte";

export default {
  title: 'Molecules/Layout/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen'
  }
};

export const MobileSidebar = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    }
  }
};
