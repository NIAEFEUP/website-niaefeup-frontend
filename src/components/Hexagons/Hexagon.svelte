<script lang="ts">
  export let className: string = "";
</script>

<div class="clip-background bg-white {className}">
  <div class="clip-foreground flex items-center justify-center">
    <slot />
  </div>
</div>

<style>
  .clip-background, .clip-foreground {
    aspect-ratio: 316 / 270; /* from Figma */
    mask-size: cover;
  }

  .clip-background {
    mask-image: url("/masks/hexagon/background.svg");
  }

  .clip-foreground {
    mask-image: url("/masks/hexagon/foreground.svg");
  }
</style>
