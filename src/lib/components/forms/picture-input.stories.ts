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
    text: 'Adicionar logo'
  }
};

export const SourcePicture_Input = {
  args: {
    text: 'Adicionar logo',
    source:
      'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTgX-qM3hvBIHwepZ900FVvx2QVQPlL6JDT6wrAjvREqegsokytnskVKWEyHSwCoCaPxGu7z7O9bSu97DH6_dw0xiJds0OmsSHhVk3IoGKT'
  }
};
