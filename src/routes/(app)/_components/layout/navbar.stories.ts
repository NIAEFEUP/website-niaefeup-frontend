import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import Navbar from './navbar.svelte';

export default {
  title: 'Molecules/Layout/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    sveltekit_experimental: {
      stores: {
        page: {
          url: {
            pathname: '/contacts'
          }
        }
      }
    }
  }
};

export const DesktopNavbar = () => ({
  Component: Navbar
});

DesktopNavbar.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const contactsButton = await canvas.findByTestId('contactos');
  expect(contactsButton).toHaveClass('bg-muted-red-400');
};
