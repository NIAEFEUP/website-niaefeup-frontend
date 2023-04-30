import { userEvent, within } from '@storybook/testing-library';
import Sidebar from './Sidebar.svelte';
import { expect } from '@storybook/jest';

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
      const menuOption = canvas.queryByText('Início');
      await expect(menuOption).toBeTruthy();
    });

    await step('Close sidebar', async () => {
      await userEvent.click(await canvas.findByRole('button'));
      const menuOption = canvas.queryByText('Início');
      await expect(menuOption).toBeNull();
    });
  }
};
