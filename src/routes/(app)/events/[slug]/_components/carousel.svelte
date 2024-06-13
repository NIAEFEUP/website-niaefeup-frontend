<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
  import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
  import * as Carousel from '$lib/components/ui/carousel/index.js';

  let api: CarouselAPI;
  let current = 0;
  let count = 0;

  $: if (api) {
    count = api.scrollSnapList().length;
    current = api.selectedScrollSnap() + 1;

    api.on('select', () => {
      current = api.selectedScrollSnap() + 1;
    });
  }
</script>

<div class="my-16">
  <Carousel.Root bind:api class="mx-auto max-w-[80%] lg:max-w-full">
    <Carousel.Content>
      {#each Array(5) as _, i (i)}
        <Carousel.Item>
          <img
            class="max-h-[30vh] w-full rounded-3xl object-cover object-center"
            src="https://picsum.photos/1920/1080"
            alt=""
          />
        </Carousel.Item>
      {/each}
    </Carousel.Content>
    <Carousel.Previous />
    <Carousel.Next />
  </Carousel.Root>
  <div class="text-muted-foreground py-2 text-center text-sm">
    Slide {current} of {count}
  </div>
</div>
