import PictureInput from './picture-input.svelte';

export default {
  title: 'Atoms/Forms',
  component: PictureInput,
  argTypes: {
    text: { control: 'text' }
  },
  parameters: {
    layout: 'centered'
  }
};

export const Picture_Input = {
  args: {
    text: 'Adicionar logo'
  }
};
