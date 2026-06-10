<script lang="ts">
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import { getEmblaContext } from './context.js';
  import { cn } from '$lib/utils.js';

  interface Props {
    class?: string | undefined | null;
    children?: import('svelte').Snippet;
    [key: string]: any;
  }

  let { class: className = undefined, children, ...rest }: Props = $props();

  const { orientation, options, plugins, onInit } = getEmblaContext('<Carousel.Content/>');
</script>

<div
  class="overflow-hidden"
  use:emblaCarouselSvelte={{
    options: {
      container: '[data-embla-container]',
      slides: '[data-embla-slide]',
      ...$options,
      axis: $orientation === 'horizontal' ? 'x' : 'y'
    },
    plugins: $plugins
  }}
  onemblaInit={onInit}
>
  <div
    class={cn('flex', $orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', className)}
    data-embla-container=""
    {...rest}
  >
    {@render children?.()}
  </div>
</div>
