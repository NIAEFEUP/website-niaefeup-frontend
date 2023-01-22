import Button from '$lib/common/Button.svelte';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    color: { control: 'text' },
    hover: { control: 'text' },
    href: { control: 'text' },
    text: { control: 'text' },
    width: { control: 'text' }
  },
  parameters: {
    layout: 'centered'
  }
};

export const ErrorPageButton = {
  args: {
    color: 'bg-primary',
    hover: 'hover:bg-secondary',
    href: '/',
    text: 'Button',
    width: 'w-32'
  }
};
