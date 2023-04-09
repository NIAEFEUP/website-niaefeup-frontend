import BackgroundHexagon from "./BackgroundHexagon.svelte";

export default {
  title: 'BackgroundHexagon',
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
