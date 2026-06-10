import Button from './button.svelte';

const colorList = ['primary', 'secondary', 'red', 'green', 'blue'];

export default {
  title: 'Atoms/Buttons/Regular Button',
  component: Button,
  argTypes: {
    color: { control: 'inline-radio', options: colorList },
    hoverColor: { control: 'inline-radio', options: colorList },
    text: { control: 'text' },
    width: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    onClick: { action: 'clicked' }
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

export const PrimaryButtonWithAFuction = {
  args: {
    color: 'primary',
    hoverColor: 'secondary',
    text: 'Click me!',
    width: 'medium',
    onClick: () => alert('Button clicked!')
  }
};

export const ButtonWithoutFunction = {
  args: {
    color: 'blue',
    hoverColor: 'blue',
    text: 'No function',
    width: 'medium'
    //No onClick prop. should still be clickable but do nothing
  }
};

export const ButtonWithEventForwarding = {
  args: {
    color: 'green',
    hoverColor: 'green',
    text: 'Event forwarding',
    width: 'medium'
  },
  render: (args) => ({
    Component: Button,
    props: args,
    on: {
      click: () => console.log('Event forwarded click!')
    }
  })
};
