<script lang="ts">
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
      alt="Gallery photo 1"
      class="h-64 w-full max-w-xl rounded-lg object-cover shadow"
      loading="lazy"
    />
  </div>
{:else}
  <div class="relative flex flex-col items-center">
    <div class="relative flex h-64 w-full max-w-xl items-center justify-center">
      <button
        class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 shadow transition hover:bg-white disabled:opacity-50"
        on:click={prev}
        aria-label="Previous photo">&larr;</button
      >
      <img
        src={photos[current]}
        alt={`Gallery photo ${current + 1}`}
        class="h-64 w-full rounded-lg object-cover shadow"
        loading="lazy"
      />
      <button
        class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 shadow transition hover:bg-white disabled:opacity-50"
        on:click={next}
        aria-label="Next photo">&rarr;</button
      >
    </div>
    <div class="mt-3 flex gap-2">
      {#each photos as _, i}
        <button
          class="h-3 w-3 rounded-full focus:outline-none {current === i
            ? 'bg-muted-red-700'
            : 'bg-[#d9d9d9]/50'}"
          aria-label={`Go to photo ${i + 1}`}
          aria-current={current === i ? 'true' : undefined}
          on:click={() => goTo(i)}
        ></button>
      {/each}
    </div>
  </div>
{/if}
