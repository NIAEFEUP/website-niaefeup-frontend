import PictureInput from './picture-input.svelte';

export default {
  title: 'Atoms/Forms/Picture Input',
  component: PictureInput,
  argTypes: {
    text: { control: 'text' }
  },
  parameters: {
    layout: 'centered',
    controls: { exclude: ['name'] }
  }
};

export const Picture_Input = {
  args: {
    text: 'Adicionar logo',
    source: ''
  }
};

export const SourcePicture_Input = {
  args: {
    text: 'Adicionar logo',
    source:
      'https://media.istockphoto.com/id/1316134499/pt/foto/a-concept-image-of-a-magnifying-glass-on-blue-background-with-a-word-example-zoom-inside-the.jpg?s=612x612&w=0&k=20&c=raTXPP4qnJy_svR1J6dOYeoonbJOWeezfvGd9mAE5vo='
  }
};
