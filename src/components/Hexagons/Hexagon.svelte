<div class="w-full h-full aspect-hexagon bg-white mask-background mask-cover clip-hexagon">
  <!-- px-[6.9%] and py-[5.8%] are magic numbers that look good with the masks -->
  <div class="h-full px-[6.9%] py-[5.8%] mask-foreground mask-cover">
    <div class="h-full clip-hexagon">
      <slot />
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
    mask-image: url('/masks/hexagon/foreground.svg');
  }

  .mask-background {
    mask-image: url('/masks/hexagon/background.svg');
  }
</style>
