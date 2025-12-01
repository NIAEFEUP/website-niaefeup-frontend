<script lang="ts">
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';
  import { mousePan } from '$lib/actions/mouse-pan';

  export let photos: string[] = [];

  // --- MOCK DATA START (REMOVE WHEN BACKEND IS READY) ---
  const MOCK_PHOTOS = [
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=960&auto=format&fit=crop', // Ocean
    'https://images.unsplash.com/photo-1595514807053-2c594370091a?q=80&w=960&auto=format&fit=crop', // Forest
    'https://images.unsplash.com/photo-1498144668414-48bf526766cf?q=80&w=960&auto=format&fit=crop', // Desert
    'https://images.unsplash.com/photo-1736525155507-2326a56f0606?q=80&w=960&auto=format&fit=crop' // Mountain
  ];
  // --- MOCK DATA END ---

  // This variable decides: if real photos exist, use them. If not, use mock.
  $: galleryPhotos = photos.length > 0 ? photos : MOCK_PHOTOS;

  let current = 0;
  let scrollContainer: HTMLElement;
  let cancelPhysics: () => void = () => {};

  function to(index: number) {
    if (!scrollContainer) return;

    // Updated to use galleryPhotos.length
    const targetIndex = Math.max(0, Math.min(index, galleryPhotos.length - 1));
    const child = scrollContainer.children[targetIndex] as HTMLElement;

    if (!child) return;

    cancelPhysics();

    scrollContainer.scrollTo({
      left: child.offsetLeft - scrollContainer.offsetLeft,
      behavior: 'smooth'
    });
  }

  function prev() {
    to(current - 1);
  }

  function next() {
    to(current + 1);
  }

  function onScroll() {
    if (!scrollContainer) return;
    const containerLeft = scrollContainer.scrollLeft;
    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(scrollContainer.children).forEach((child, index) => {
      const htmlChild = child as HTMLElement;
      const distance = Math.abs(htmlChild.offsetLeft - scrollContainer.offsetLeft - containerLeft);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== current) {
      current = closestIndex;
    }
  }
</script>

{#if galleryPhotos.length === 0}
  <div class="h-64 w-full max-w-xl rounded-3xl bg-gray-200"></div>
{:else if galleryPhotos.length === 1}
  <div class="flex justify-center">
    <img
      src={galleryPhotos[0]}
      alt="Gallery 1"
      class="h-64 w-full max-w-xl rounded-3xl object-cover shadow"
      loading="lazy"
    />
  </div>
{:else}
  <div class="group flex w-full max-w-xl flex-col items-center">
    <div class="relative w-full">
      <div
        bind:this={scrollContainer}
        use:mousePan={{ onCancel: (fn) => (cancelPhysics = fn) }}
        on:scroll={onScroll}
        class="scrollbar-hide relative flex w-full cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden scroll-smooth active:cursor-grabbing"
        style="scrollbar-width: none; -ms-overflow-style: none;"
      >
        {#each galleryPhotos as photo, i}
          <div class="relative h-64 min-w-full snap-center">
            <img
              src={photo}
              alt={`Gallery photo ${i + 1}`}
              class="pointer-events-none h-full w-full select-none rounded-3xl object-cover shadow"
              loading="lazy"
              draggable="false"
            />
          </div>
        {/each}
      </div>

      <button
        class="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-muted-red-700/70 text-[#d9d9d9]/70 opacity-0 shadow transition-all duration-300 hover:scale-105 hover:bg-muted-red-700/90 hover:text-[#d9d9d9]/90 disabled:opacity-0 group-hover:opacity-100"
        on:click={prev}
        disabled={current === 0}
        aria-label="Previous photo"
      >
        <Icon src={Icons.ChevronLeft} size="14" />
      </button>

      <button
        class="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-muted-red-700/70 text-[#d9d9d9]/70 opacity-0 shadow transition-all duration-300 hover:scale-105 hover:bg-muted-red-700/90 hover:text-[#d9d9d9]/90 disabled:opacity-0 group-hover:opacity-100"
        on:click={next}
        disabled={current === galleryPhotos.length - 1}
        aria-label="Next photo"
      >
        <Icon src={Icons.ChevronRight} size="14" />
      </button>
    </div>

    <div class="mt-3 flex gap-2">
      {#each galleryPhotos as _, i}
        <button
          class="h-3 w-3 rounded-full transition-colors focus:outline-none {current === i
            ? 'bg-muted-red-700'
            : 'bg-[#d9d9d9]/50 hover:bg-[#d9d9d9] '}"
          aria-label={`Go to photo ${i + 1}`}
          aria-current={current === i ? 'true' : undefined}
          on:click={() => to(i)}
        ></button>
      {/each}
    </div>
  </div>
{/if}
