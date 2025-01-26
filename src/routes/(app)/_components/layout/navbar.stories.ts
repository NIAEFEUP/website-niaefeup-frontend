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
