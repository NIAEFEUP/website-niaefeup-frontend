<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="aspect-hexagon mask-background clip-hexagon h-full w-full bg-white mask-cover">
  <!-- px-[6.9%] and py-[5.8%] are magic numbers that look good with the masks -->
  <div class="mask-foreground h-full mask-cover px-[6.9%] py-[5.8%]">
    <div class="clip-hexagon h-full">
      {@render children?.()}
    </div>
  </div>
</div>

<style>
  .clip-hexagon {
    clip-path: polygon(0% 50%, 25% 100%, 75% 100%, 100% 50%, 75% 0%, 25% 0%);
  }

  .aspect-hexagon {
    aspect-ratio: 316 / 270; /* from Figma */
  }

  .mask-cover {
    mask-size: cover;
  }

  .mask-foreground {
    mask-image: url('/masks/hexagon/horizontal/foreground.svg');
  }

  .mask-background {
    mask-image: url('/masks/hexagon/horizontal/background.svg');
  }
</style>
