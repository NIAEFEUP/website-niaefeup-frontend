import Button from './Button.svelte';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    color: { control: 'text' },
    hoverColor: { control: 'text' },
    text: { control: 'text' },
    width: { control: 'text' }
  },
  parameters: {
    layout: 'centered'
  }
};

export const ErrorPageButton = {
  args: {
    color: 'primary',
    hoverColor: 'secondary',
    text: 'Button',
    width: 'medium'
  }
};
