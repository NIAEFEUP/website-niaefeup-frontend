<script lang="ts">
  export let className: string = "";

  let isHexagonBeingHovered = false;
</script>

<div class="clip-background bg-white {className}" on:pointerenter={() => {
  isHexagonBeingHovered = true
  }} on:pointerleave={() => {
  isHexagonBeingHovered = false
  }}>
  <div class="clip-foreground flex items-center justify-center">
    <slot {isHexagonBeingHovered} />
  </div>
</div>

<style>
  .clip-background, .clip-foreground {
    aspect-ratio: 316 / 270; /* from Figma */
    mask-size: cover;
  }
  
  .clip-background {
    mask-image: url("/masks/hexagon/background.svg");
    clip-path: polygon(0% 50%, 25% 100%, 75% 100%, 100% 50%, 75% 0%, 25% 0%);
  }
  
  .clip-foreground {
    mask-image: url("/masks/hexagon/foreground.svg");
  }
</style>
