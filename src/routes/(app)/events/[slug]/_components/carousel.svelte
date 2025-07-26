<script lang="ts">
  import * as Carousel from '$lib/components/ui/carousel/index.js';

  export let eventGallery: string[];
  export let eventTitle: string;
</script>

<div class="my-16">
  <Carousel.Root class="mx-auto max-w-[80%] lg:max-w-full">
    <Carousel.Content>
      {#if eventGallery.length === 0}
        <p class="text-center text-lg text-muted-foreground">No images available</p>
      {:else}
        {#each eventGallery as image, i (i)}
          <Carousel.Item>
            <div class="relative w-full aspect-video md:aspect-[3/1] overflow-hidden rounded-3xl">
              <img
                class="absolute inset-0 w-full object-cover object-center"
                src={image}
                alt={`${eventTitle} image ${i + 1}`}
                loading="lazy"
              />
            </div>
          </Carousel.Item>
        {/each}
      {/if}
    </Carousel.Content>
    <Carousel.Previous />
    <Carousel.Next />
  </Carousel.Root>
</div>
