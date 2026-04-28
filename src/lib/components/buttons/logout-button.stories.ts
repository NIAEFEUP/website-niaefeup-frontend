import LogoutButton from './logout-button.svelte';

export default {
  title: 'Atoms/Buttons/Logout Button',
  component: LogoutButton,
  parameters: {
    layout: 'centered',
    controls: { exclude: ['type'] }
  }
};

export const Default = {
  args: {
    type: 'button',
    ariaLabel: 'Logout'
  }
};