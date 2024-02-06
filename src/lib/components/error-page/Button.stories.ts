import Button from './Button.svelte';

const colorList = ['primary', 'secondary', 'red', 'green', 'blue'];

export default {
  title: 'Atoms/Buttons/Regular Button',
  component: Button,
  argTypes: {
    color: { control: 'inline-radio', options: colorList },
    hoverColor: { control: 'inline-radio', options: colorList },
    text: { control: 'text' },
    width: { control: 'inline-radio', options: ['small', 'medium', 'large'] }
  },
  parameters: {
    layout: 'centered',
    controls: { exclude: ['type'] }
  }
};

export const PrimaryButton = {
  args: {
    color: 'primary',
    hoverColor: 'secondary',
    text: 'Button',
    width: 'medium'
  }
};
