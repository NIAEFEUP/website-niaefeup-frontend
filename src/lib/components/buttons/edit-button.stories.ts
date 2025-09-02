import EditButton from './edit-button.svelte';

export default {
  title: 'Atoms/Buttons/Edit Button',
  component: EditButton,
  parameters: {
    layout: 'centered',
    controls: { exclude: ['type'] }
  }
};

export const SmallEditButton = {
  args: {
    size: 'small',
    link: 'https://lipsum.org'
  }
};

export const MediumEditButton = {
  args: {
    size: 'medium',
    link: 'https://lipsum.org'
  }
};

export const LargeEditButton = {
  args: {
    size: 'large',
    link: 'https://lipsum.org'
  }
};
