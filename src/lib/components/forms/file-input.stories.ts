import FileInput from './file-input.svelte';

export default {
  title: 'Atoms/Forms/File Input',
  component: FileInput,
  argTypes: {
    name: { control: 'text' },
    value: { control: 'object' }
  },
  parameters: {
    layout: 'centered'
  }
};

export const WithoutFiles = {
  args: {
    name: 'file-upload',
    value: []
  }
};

export const WithFiles = {
  args: {
    name: 'file-upload-filled',
    value: [
      'https://niaefeup.pt/assets/documento-exemplo.pdf',
      'imagem-de-teste.png',
      'outro-arquivo.zip'
    ]
  }
};