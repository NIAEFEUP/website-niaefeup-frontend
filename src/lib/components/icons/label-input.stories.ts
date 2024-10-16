import LabelInput from './label-input.svelte';

export default {
  title: 'Atoms/LabelInput',
  component: LabelInput,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    isTextArea: { control: 'boolean' }
  },
  parameters: {
    layout: 'centered',
    controls: {
      exclude: ['id', 'type']
    }
  }
};

export const NonTextAreaInput = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    type: 'text'
  }
};

export const TextAreaInput = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    type: 'text',
    isTextArea: true
  }
};
