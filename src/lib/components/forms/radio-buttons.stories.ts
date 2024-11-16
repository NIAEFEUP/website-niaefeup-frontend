import RadioButtons from './radio-buttons.svelte';

export default {
  title: 'Atoms/RadioButtons',
  component: RadioButtons,
  argTypes: {
    options: { control: 'array' }
  },
  parameters: {
    layout: 'centered',
  }
};

export const Example = {
  args: {
    options: ['Hello', 'World']
  }
};
