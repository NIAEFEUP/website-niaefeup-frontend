import { within, userEvent } from '@storybook/testing-library';

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

export const DesktopNavbar = {};

export const Default = () => ({
  Component: Navbar,
});

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const mockGoto = jest.fn();
  jest.mock('$app/navigation', () => ({
    goto: mockGoto,
  }));


  const contactsButton = await canvas.findByTestId("Contactos");
  await userEvent.click(contactsButton);
  expect(mockGoto).toHaveBeenCalledWith('/contacts');
  await expect(contactsButton).toHaveClass("bg-muted-red-400");

};