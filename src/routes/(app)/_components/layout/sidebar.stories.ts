import { userEvent, within, expect } from 'storybook/test';
import Sidebar from './sidebar.svelte';
import SidebarItems from './sidebar-items';

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
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open sidebar', async () => {
      await userEvent.click(await canvas.findByRole('button'));
      const menuOption = canvas.queryByText(SidebarItems[0].label);
      await expect(menuOption).toBeTruthy();
    });

    await step('Close sidebar', async () => {
      await userEvent.click(await canvas.findByRole('button'));
      const menuOption = canvas.queryByText(SidebarItems[0].label);
      await expect(menuOption).toBeNull();
    });
  }
};
