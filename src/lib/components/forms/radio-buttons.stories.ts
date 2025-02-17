import RadioButtons from './radio-buttons.svelte';

export default {
  title: 'Atoms/Forms',
  component: RadioButtons,
  argTypes: {
    options: { control: 'array' }
  },
  parameters: {
    layout: 'centered'
  }
};

export const Radio_Button = {
  args: {
    label: 'Language',
    options: ['English', 'Spanish']
  }
};
