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

  $: galleryPhotos = photos.length > 0 ? photos : MOCK_PHOTOS;

  let current = 0;
  let scrollContainer: HTMLElement;
  let cancelPhysics: () => void = () => {};
  let isLightboxOpen = false;
  let lightboxIndex = 0;

  function to(index: number) {
    if (!scrollContainer) return;

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

  function openLightbox(index: number) {
    lightboxIndex = index;
    isLightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    isLightboxOpen = false;
    document.body.style.overflow = '';
  }

  function nextLightbox() {
    lightboxIndex = (lightboxIndex + 1) % galleryPhotos.length;
  }

  function prevLightbox() {
    lightboxIndex = (lightboxIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!isLightboxOpen) return;

    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        prevLightbox();
        break;
      case 'ArrowRight':
        nextLightbox();
        break;
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if galleryPhotos.length === 0}
  <div class="aspect-[21/9] w-full rounded-3xl bg-gray-200"></div>
{:else if galleryPhotos.length === 1}
  <div class="flex w-full justify-center">
    <img
      src={galleryPhotos[0]}
      alt="Gallery 1"
      class="aspect-[21/9] w-full rounded-3xl object-cover shadow"
      loading="lazy"
    />
  </div>
{:else}
  <div class="group flex w-full flex-col items-center">
    <div class="relative w-full">
      <div
        bind:this={scrollContainer}
        use:mousePan={{ onCancel: (fn) => (cancelPhysics = fn) }}
        on:scroll={onScroll}
        class="scrollbar-hide relative flex w-full cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden scroll-smooth active:cursor-grabbing"
        style="scrollbar-width: none; -ms-overflow-style: none;"
      >
        {#each galleryPhotos as photo, i}
          <div class="relative aspect-[21/9] min-w-full snap-center">
            <button
              on:click={() => openLightbox(i)}
              class="h-full w-full cursor-pointer"
              aria-label={`View photo ${i + 1} in full screen`}
            >
              <img
                src={photo}
                alt={`Gallery photo ${i + 1}`}
                class="pointer-events-none h-full w-full select-none rounded-3xl object-cover shadow"
                loading="lazy"
                draggable="false"
              />
            </button>
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

{#if isLightboxOpen}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
    on:click={closeLightbox}
    on:keydown={(e) => e.key === 'Enter' && closeLightbox()}
    role="dialog"
    aria-modal="true"
    aria-label="Photo lightbox"
    tabindex="-1"
  >
    <button
      class="absolute right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-black/40"
      on:click={closeLightbox}
      aria-label="Close lightbox"
    >
      <Icon src={Icons.Close} size="24" />
    </button>

    <div
      class="absolute left-1/2 top-6 z-20 -translate-x-1/2 rounded-full bg-black/20 px-4 py-2 text-sm text-white backdrop-blur-sm"
    >
      {lightboxIndex + 1} / {galleryPhotos.length}
    </div>

    <div
      class="relative flex h-full w-full items-center justify-center py-4"
      on:click|stopPropagation
      on:keydown={(e) => e.key === 'Enter' && e.stopPropagation()}
      role="presentation"
    >
      <img
        src={galleryPhotos[lightboxIndex]}
        alt={`Gallery photo ${lightboxIndex + 1}`}
        class="max-h-full max-w-full select-none object-contain"
        draggable="false"
      />

      {#if galleryPhotos.length > 1}
        <button
          class="absolute left-4 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-black/40"
          on:click|stopPropagation={prevLightbox}
          aria-label="Previous photo"
        >
          <Icon src={Icons.ChevronLeft} size="32" />
        </button>

        <button
          class="absolute right-4 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-black/40"
          on:click|stopPropagation={nextLightbox}
          aria-label="Next photo"
        >
          <Icon src={Icons.ChevronRight} size="32" />
        </button>
      {/if}
    </div>
  </div>
{/if}
