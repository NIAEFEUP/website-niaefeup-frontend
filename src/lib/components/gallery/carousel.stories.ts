import Gallery from './Carousel.svelte';

export default {
  title: 'Organisms/Gallery',
  component: Gallery,
  argTypes: {
    photos: { control: 'array' }
  }
};

const samplePhotos = [
  'https://picsum.photos/seed/1/400/300',
  'https://picsum.photos/seed/2/400/300',
  'https://picsum.photos/seed/3/400/300',
  'https://picsum.photos/seed/4/400/300',
  'https://picsum.photos/seed/5/400/300'
];

const Template = (args) => ({
  Component: Gallery,
  props: args
});

export const SinglePhoto = Template.bind({});
SinglePhoto.args = {
  photos: [samplePhotos[0]]
};

export const MultiplePhotos = Template.bind({});
MultiplePhotos.args = {
  photos: samplePhotos
};

export const ManyPhotos = Template.bind({});
ManyPhotos.args = {
  photos: Array.from({ length: 12 }, (_, i) => `https://picsum.photos/seed/${i + 10}/400/300`)
};
