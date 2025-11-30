<script lang="ts">
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';

  export let photos: string[] = [];
  let current = 0;

  function prev() {
    current = (current - 1 + photos.length) % photos.length;
  }
  function next() {
    current = (current + 1) % photos.length;
  }
  function goTo(idx: number) {
    current = idx;
  }
</script>

{#if photos.length === 1}
  <div class="flex justify-center">
    <img
      src={photos[0]}
      alt="Gallery 1"
      class="h-64 w-full max-w-xl rounded-lg object-cover shadow"
      loading="lazy"
    />
  </div>
{:else}
  <div class="group relative flex flex-col items-center">
    <div class="relative flex h-64 w-full max-w-xl items-center justify-center">
      <button
        class="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-muted-red-700/70 text-[#d9d9d9]/70 opacity-0 shadow transition-all duration-300 hover:scale-105 hover:bg-muted-red-700/90 hover:text-[#d9d9d9]/90 disabled:opacity-50 group-hover:opacity-100"
        on:click={prev}
        aria-label="Previous photo"
      >
        <Icon src={Icons.ChevronLeft} size={14} />
      </button>

      <img
        src={photos[current]}
        alt={`Gallery photo ${current + 1}`}
        class="h-64 w-full rounded-3xl object-cover shadow"
        loading="lazy"
      />

      <button
        class="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-muted-red-700/70 text-[#d9d9d9]/70 opacity-0 shadow transition-all duration-300 hover:scale-105 hover:bg-muted-red-700/90 hover:text-[#d9d9d9]/90 disabled:opacity-50 group-hover:opacity-100"
        on:click={next}
        aria-label="Next photo"
      >
        <Icon src={Icons.ChevronRight} size={14} />
      </button>
    </div>

    <div class="mt-3 flex gap-2">
      {#each photos as _, i}
        <button
          class="h-3 w-3 rounded-full transition-colors focus:outline-none {current === i
            ? 'bg-muted-red-700'
            : 'bg-[#d9d9d9]/50 hover:bg-[#d9d9d9] '}"
          aria-label={`Go to photo ${i + 1}`}
          aria-current={current === i ? 'true' : undefined}
          on:click={() => goTo(i)}
        ></button>
      {/each}
    </div>
  </div>
{/if}
