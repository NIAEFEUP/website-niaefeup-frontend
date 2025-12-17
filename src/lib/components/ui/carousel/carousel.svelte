<script lang="ts">
  import { run, createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  /* eslint-disable-next-line import/no-duplicates */
  import { writable } from 'svelte/store';
  /* eslint-disable-next-line import/no-duplicates */
  import { onDestroy } from 'svelte';
  import type { CarouselAPI, CarouselProps } from './context.js';
  import { setEmblaContext } from './context.js';
  import { cn } from '$lib/utils.js';

  type $$Props = CarouselProps;

  interface Props {
    opts?: any;
    plugins?: NonNullable<$$Props['plugins']>;
    api?: $$Props['api'];
    orientation?: NonNullable<$$Props['orientation']>;
    class?: $$Props['class'];
    children?: import('svelte').Snippet;
    [key: string]: any;
  }

  let {
    opts = {},
    plugins = [],
    api = $bindable(undefined),
    orientation = 'horizontal',
    class: className = undefined,
    children,
    ...rest
  }: Props = $props();

  const apiStore = writable<CarouselAPI | undefined>(undefined);
  const orientationStore = writable(orientation);
  const canScrollPrev = writable(false);
  const canScrollNext = writable(false);
  const optionsStore = writable(opts);
  const pluginStore = writable(plugins);
  const scrollSnapsStore = writable<number[]>([]);
  const selectedIndexStore = writable(0);

  run(() => {
    orientationStore.set(orientation);
  });
  run(() => {
    pluginStore.set(plugins);
  });
  run(() => {
    optionsStore.set(opts);
  });

  function scrollPrev() {
    api?.scrollPrev();
  }
  function scrollNext() {
    api?.scrollNext();
  }
  function scrollTo(index: number, jump?: boolean) {
    api?.scrollTo(index, jump);
  }

  function onSelect(api: CarouselAPI) {
    if (!api) return;
    canScrollPrev.set(api.canScrollPrev());
    canScrollNext.set(api.canScrollNext());
    selectedIndexStore.set(api.selectedScrollSnap());
  }

  run(() => {
    if (api) {
      onSelect(api);
      api.on('select', onSelect);
      api.on('reInit', onSelect);
    }
  });

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollNext();
    }
  }

  setEmblaContext({
    api: apiStore,
    scrollPrev,
    scrollNext,
    orientation: orientationStore,
    canScrollNext,
    canScrollPrev,
    handleKeyDown,
    options: optionsStore,
    plugins: pluginStore,
    onInit,
    scrollSnaps: scrollSnapsStore,
    selectedIndex: selectedIndexStore,
    scrollTo
  });

  function onInit(event: CustomEvent<CarouselAPI>) {
    api = event.detail;
    apiStore.set(api);
    scrollSnapsStore.set(api.scrollSnapList());
  }

  onDestroy(() => {
    api?.off('select', onSelect);
  });
</script>

<div
  class={cn('relative', className)}
  onmouseenter={bubble('mouseenter')}
  onmouseleave={bubble('mouseleave')}
  role="region"
  aria-roledescription="carousel"
  {...rest}
>
  {@render children?.()}
</div>
