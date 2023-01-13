<script lang="ts">
  export let src: string;
  export let alt: string;
  export let bg: string;
</script>

<div class="isolate relative">
    <!-- <div class="clip-hexagon outline-hexagon absolute inset-0">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="w-full aspect-[316/270] h-auto">
            <polygon points="25,0 75,0 100,50 75,100 25,100 0,50" fill="black" stroke="black" stroke-width="2" />
        </svg>
    </div> -->
    <div class="clip-hexagon absolute inset-0 bg-white">
        <div class="clip-hexagon absolute inset-0.5 {bg}">
            <div class="clip-hexagon absolute inset-4 bg-white">
                <div class="clip-hexagon absolute inset-2">
                    <img {src} {alt} class="object-cover w-full" loading="lazy" />
                </div>
            </div>
        </div>
    </div>
</div>

<style>
  .clip-hexagon {
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    aspect-ratio: 316 / 270; /* Out of Figma */
  }
</style>
