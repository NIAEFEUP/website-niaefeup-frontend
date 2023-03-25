<div class="clip-ring bg-white">
  <div class="clip-outer-hexagon flex items-center justify-center">
    <div class="clip-hexagon h-full w-full">
      <slot />
    </div>
  </div>
</div>

<style>
  .clip-ring,
  .clip-outer-hexagon {
    aspect-ratio: 316 / 270; /* from Figma */
    mask-size: cover;
  }

  .clip-ring {
    clip-path: polygon(0% 50%, 25% 100%, 75% 100%, 100% 50%, 75% 0%, 25% 0%);
    mask-image: url('/masks/hexagon/background.svg');
  }

  .clip-outer-hexagon {
    padding: 5.8% 6.9%; /* Magic Numbers */
    mask-image: url('/masks/hexagon/foreground.svg');
  }

  .clip-hexagon {
    clip-path: polygon(0% 50%, 25% 100%, 75% 100%, 100% 50%, 75% 0%, 25% 0%);
  }
</style>
