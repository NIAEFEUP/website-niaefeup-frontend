import RadioButtons from './radio-buttons.svelte';

export default {
  title: 'Atoms/Forms/Radio Buttons',
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
    options: ['English', 'Spanish']
  }
};
