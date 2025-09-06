<script lang="ts">
  import { createBubbler, handlers } from 'svelte/legacy';

  const bubble = createBubbler();
  interface Props {
    type?: 'button' | 'submit' | 'reset';
    color: keyof typeof colorList;
    hoverColor: keyof typeof colorList;
    width: keyof typeof widthList;
    text: string;
    onClick: (() => void) | undefined;
  }

  let { type = 'button', color, hoverColor, width, text, onClick = () => null, }: Props = $props();
  const colorList = {
    primary: { main: 'bg-muted-red-700', hover: 'hover:bg-muted-red-500' },
    secondary: { main: 'bg-muted-red-500', hover: 'hover:bg-muted-red-500' },
    red: { main: 'bg-red-500', hover: 'hover:bg-red-500' },
    green: { main: 'bg-green-500', hover: 'hover:bg-green-500' },
    blue: { main: 'bg-blue-500', hover: 'hover:bg-blue-500' }
  };
  const widthList = {
    small: 'w-20',
    medium: 'w-32',
    large: 'w-52'
  };
</script>

<button
  {type}
  class="flex {colorList[color]['main']} {colorList[hoverColor][
    'hover'
  ]} items-center justify-center font-raleway font-bold text-white {widthList[
    width
  ]} min-w-0 rounded-lg px-4 py-2"
  onclick={handlers(onClick, bubble('click'))}
>
  <p class="px-5">{text}</p>
</button>
