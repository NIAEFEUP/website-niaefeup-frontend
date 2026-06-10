import RadioButtons from './radio-buttons.svelte';

export default {
  title: 'Atoms/Forms/Radio Buttons',
  component: RadioButtons,
  argTypes: {
    options: { control: 'array' },
    selected: { control: 'text' }
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

export const Selected_Radio_Button = {
  args: {
    label: 'Language',
    options: ['English', 'Spanish'],
    selected: 'English'
  }
};
