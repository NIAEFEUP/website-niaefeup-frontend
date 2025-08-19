import BackgroundHexagon from './background-hexagon.svelte';

export default {
  title: 'Molecules/Layout/Background Hexagon',
  component: BackgroundHexagon,
  argTypes: {
    position: { control: 'inline-radio', options: ['left', 'right'] }
  }
};

export const LeftBackgroundHexagon = {
  args: {
    position: 'left'
  }
};

export const RightBackgroundHexagon = {
  args: {
    position: 'right'
  }
};
