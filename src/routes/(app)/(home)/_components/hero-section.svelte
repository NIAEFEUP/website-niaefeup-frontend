<script lang="ts">
  interface Props {
    buildingSrc?: string | null;
  }

  let { buildingSrc = '/images/landing_feup_buildings_1.svg' }: Props = $props();

  const titleLetters = ['n', 'i', 'a', 'e', 'f', 'e', 'u', 'p'];
</script>

<section
  id="hero"
  class="relative flex w-full scroll-mt-20 flex-col items-center justify-start overflow-hidden pt-12 sm:pt-20 md:pt-28"
>
  <div class="z-10 flex flex-col items-center px-4 text-center">
    <h1
      class="font-raleway flex select-none items-center justify-center gap-[0.55em] text-4xl font-black text-white sm:gap-[0.75em] sm:text-6xl md:gap-[0.85em] md:text-7xl"
    >
      {#each titleLetters as letter, index (index)}
        <span>{letter}</span>
      {/each}
    </h1>

    <p
      class="font-raleway mt-6 max-w-2xl text-center text-lg font-normal leading-relaxed text-white/90 sm:text-xl md:text-2xl"
    >
      Um grupo de estudantes a desenvolver<br class="hidden sm:inline" /> para estudantes.
    </p>
  </div>

  <div
    id="hero-buildings-container"
    class="relative mt-10 flex w-full items-center justify-center sm:-mt-16 md:-mt-24"
  >
    {#if buildingSrc}
      <img
        src={buildingSrc}
        alt="FEUP Campus Outline"
        class="h-auto w-full object-contain pointer-events-none select-none"
      />
    {:else}
      <div
        class="flex min-h-45 sm:min-h-70 md:min-h-95 w-full items-center justify-center"
      ></div>
    {/if}
  </div>
</section>
