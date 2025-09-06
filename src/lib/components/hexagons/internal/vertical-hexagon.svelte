<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="aspect-hexagon mask-background clip-hexagon h-full w-full bg-white mask-cover">
  <!-- px-[5.8%] and py-[6.9%] are magic numbers that look good with the masks -->
  <div class="mask-foreground h-full mask-cover px-[5.8%] py-[6.9%]">
    <div class="clip-hexagon h-full">
      {@render children?.()}
    </div>
  </div>
</div>

<style>
  .clip-hexagon {
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }

  .aspect-hexagon {
    aspect-ratio: 270 / 316; /* from Figma */
  }

  .mask-cover {
    mask-size: cover;
  }

  .mask-foreground {
    mask-image: url('/masks/hexagon/vertical/foreground.svg');
  }

  .mask-background {
    mask-image: url('/masks/hexagon/vertical/background.svg');
  }
</style>
