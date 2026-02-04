<script lang="ts">
  import { run } from 'svelte/legacy';

  import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
  import * as Carousel from '$lib/components/ui/carousel/index.js';

  let api: CarouselAPI = $state();
  let current = $state(0);
  let count = $state(0);

  run(() => {
    if (api) {
      count = api.scrollSnapList().length;
      current = api.selectedScrollSnap() + 1;

      api.on('select', () => {
        current = api.selectedScrollSnap() + 1;
      });
    }
  });
</script>

<div class="my-16">
  <Carousel.Root bind:api class="mx-auto max-w-[80%] lg:max-w-full">
    <Carousel.Content>
      {#each Array(5) as i}
        <!-- eslint-disable-line @typescript-eslint/no-unused-vars -->
        <!-- eslint-disable-line @typescript-eslint/require-each-key -->
        <Carousel.Item>
          <img
            class="max-h-[30vh] w-full rounded-3xl object-cover object-center"
            src="https://picsum.photos/1920/1080"
            alt={`${i}`}
          />
        </Carousel.Item>
      {/each}
    </Carousel.Content>
    <Carousel.Previous />
    <Carousel.Next />
  </Carousel.Root>
  <div class="py-2 text-center text-sm text-muted-foreground">
    Slide {current} of {count}
  </div>
</div>
