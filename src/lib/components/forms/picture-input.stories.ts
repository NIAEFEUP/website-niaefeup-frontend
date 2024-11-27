import PictureInput from './picture-input.svelte';

export default {
  title: 'Atoms/Forms/Picture Input',
  component: PictureInput,
  argTypes: {
    text: { control: 'text' }
  },
  parameters: {
    layout: 'centered',
  }
};

export const Example = {
  args: {
    text: 'Adicionar logo'
  }
};
