<div class="aspect-hexagon mask-background mask-cover clip-hexagon h-full w-full bg-white">
  <!-- px-[5.8%] and py-[6.9%] are magic numbers that look good with the masks -->
  <div class="mask-foreground mask-cover h-full px-[5.8%] py-[6.9%]">
    <div class="clip-hexagon h-full">
      <slot />
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
