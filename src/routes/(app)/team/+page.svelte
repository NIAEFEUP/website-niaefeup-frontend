<script lang="ts">
  import TeamMemberHexagon from './_components/team-member-hexagon.svelte';
  import HexagonGrid from '$lib/components/hexagons/hexagon-grid.svelte';

  // Define interfaces for your data structure
  interface Account {
    // Add specific fields if you know them (e.g., id: string; name: string; image: string;)
    [key: string]: unknown;
  }

  interface Section {
    section: string;
    accounts: Account[];
  }

  interface PageData {
    sections: Section[];
  }

  // Type the incoming props
  let { data }: { data: PageData } = $props();

  let openSection = $state<string | null>('Direção');
  let buttonRefs: (HTMLButtonElement | undefined)[] = $state([]);
  let containerRef: HTMLDivElement | undefined = $state();
  let slidePosition = $state(0);
  let transitionDuration = $state(0);

  // Use the defined types for orderedSections
  let orderedSections: { name: string; accounts: Account[] }[] = $state([]);
  let slidingNext = $state(false);
  let slidingPrev = $state(false);

  let maskLeftPx = $state(0);
  let maskRightPx = $state(0);

  let touchStartX = 0;
  let dragBasePosition = 0;
  let isDragging = $state(false);

  let maxDragLeft = $state(100);
  let maxDragRight = $state(100);

  const groupedSections = $derived.by(() => {
    const result: Array<{ name: string; accounts: Account[] }> = [];

    const president = data.sections.find((s: Section) => s.section === 'President');
    const board = data.sections.find((s: Section) => s.section === 'Board');

    if (president || board) {
      result.push({
        name: 'Direção',
        accounts: [...(president?.accounts || []), ...(board?.accounts || [])]
      });
    }

    const otherSections = data.sections.filter(
      (s: Section) => s.section !== 'President' && s.section !== 'Board' && s.section !== 'Alumni'
    );

    for (const section of otherSections) {
      const displayName =
        section.section === 'Member'
          ? 'Membros'
          : section.section === 'Recruit'
            ? 'Recrutas'
            : section.section;
      result.push({
        name: displayName,
        accounts: section.accounts
      });
    }

    return result;
  });

  $effect(() => {
    if (orderedSections.length === 0 && groupedSections.length > 0) {
      const initialIndex = groupedSections.findIndex((s) => s.name === openSection);
      if (initialIndex !== -1) {
        const count = groupedSections.length;
        const shift = (initialIndex - 1 + count) % count;
        orderedSections = [...groupedSections.slice(shift), ...groupedSections.slice(0, shift)];
      } else {
        orderedSections = [...groupedSections];
      }
    }
  });

  const centerActiveSection = (animate: boolean = false) => {
    if (!containerRef || orderedSections.length === 0) return;

    const activeIndex = 2; // center is index 2 ([Next, Prev, Curr, Next, Prev])
    const centerBtn = buttonRefs[activeIndex];
    const prevBtn = buttonRefs[1];
    const nextBtn = buttonRefs[3];

    if (centerBtn) {
      const buttonCenter = centerBtn.offsetLeft + centerBtn.offsetWidth / 2;
      slidePosition = -buttonCenter;
      transitionDuration = animate ? 300 : 0;

      if (prevBtn && nextBtn) {
        let measuredLeft = buttonCenter - prevBtn.offsetLeft + 8;
        let measuredRight = nextBtn.offsetLeft + nextBtn.offsetWidth - buttonCenter + 8;
        maskLeftPx = measuredLeft > 50 ? measuredLeft : 130;
        maskRightPx = measuredRight > 50 ? measuredRight : 130;

        maxDragRight = buttonCenter - (prevBtn.offsetLeft + prevBtn.offsetWidth / 2);
        maxDragLeft = nextBtn.offsetLeft + nextBtn.offsetWidth / 2 - buttonCenter;
      }
    }
  };

  const visibleSections = $derived.by(() => {
    if (orderedSections.length === 0) return [];

    const base = orderedSections.slice(0, 3);

    if (base.length > 0) {
      const prev = base[0];
      const curr = base[1];
      const next = base[2];

      return [
        { ...next, isDuplicate: true, id: 'buf-left' }, // 0: Next (Buffer Left)
        { ...prev, isDuplicate: false, id: 'prev' }, // 1: Prev
        { ...curr, isDuplicate: false, id: 'curr' }, // 2: Current (Center)
        { ...next, isDuplicate: false, id: 'next' }, // 3: Next
        { ...prev, isDuplicate: true, id: 'buf-right' } // 4: Prev (Buffer Right)
      ] as Array<{ name: string; accounts: Account[]; isDuplicate?: boolean; id?: string }>;
    }
    return base as Array<{ name: string; accounts: Account[]; isDuplicate?: boolean; id?: string }>;
  });

  $effect(() => {
    if (transitionDuration === 0 && buttonRefs[2] && !isDragging) {
      setTimeout(() => centerActiveSection(false), 50);
    }
  });

  const handleSectionClick = (
    clickedSection: { name: string; accounts: Account[] },
    index: number
  ) => {
    if (clickedSection.name === openSection) return;
    if (index === 2) return; // Center
    if (slidingNext || slidingPrev) return;

    if (index === 3) {
      // Next
      const nextButton = buttonRefs[3];
      if (nextButton) {
        slidingNext = true;
        const dist = nextButton.offsetLeft + nextButton.offsetWidth / 2;
        slidePosition = -dist;
        transitionDuration = 300;
        openSection = clickedSection.name;

        setTimeout(() => {
          slidingNext = false;
          const first = orderedSections.shift();
          if (first) orderedSections.push(first);
          orderedSections = [...orderedSections];

          requestAnimationFrame(() => centerActiveSection(false));
        }, 300);
      }
    } else if (index === 1) {
      // Prev
      const prevButton = buttonRefs[1];
      if (prevButton) {
        slidingPrev = true;
        const dist = prevButton.offsetLeft + prevButton.offsetWidth / 2;
        slidePosition = -dist;
        transitionDuration = 300;
        openSection = clickedSection.name;

        setTimeout(() => {
          slidingPrev = false;
          const last = orderedSections.pop();
          if (last) orderedSections.unshift(last);
          orderedSections = [...orderedSections];

          requestAnimationFrame(() => centerActiveSection(false));
        }, 300);
      }
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (slidingNext || slidingPrev) return;

    isDragging = true;
    transitionDuration = 0;
    touchStartX = e.touches[0].clientX;
    dragBasePosition = slidePosition;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    let deltaX = currentX - touchStartX;

    if (deltaX > maxDragRight) deltaX = maxDragRight;
    if (deltaX < -maxDragLeft) deltaX = -maxDragLeft;

    slidePosition = dragBasePosition + deltaX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!isDragging) return;
    isDragging = false;

    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX;
    const snapThreshold = 60;

    transitionDuration = 300;

    if (swipeDistance < -snapThreshold) {
      // swiped left -> snap to next
      if (visibleSections[3]) handleSectionClick(visibleSections[3], 3);
    } else if (swipeDistance > snapThreshold) {
      // swiped right -> snap to prev
      if (visibleSections[1]) handleSectionClick(visibleSections[1], 1);
    } else {
      // didn't swipe far enough -> snap back to center
      centerActiveSection(true);
    }
  };
</script>

<div class="flex w-full flex-col items-center">
  <h1 class="my-2 text-center font-source_code text-2xl text-white md:my-4 md:text-3xl">
    &lt&nbsp<strong>Equipa</strong>&nbsp/&gt
  </h1>

  <div class="w-full md:hidden">
    <div
      class="relative mb-6 mt-2 h-12 w-full touch-pan-y overflow-hidden"
      ontouchstart={handleTouchStart}
      ontouchmove={handleTouchMove}
      ontouchend={handleTouchEnd}
      style={maskLeftPx > 50
        ? `-webkit-mask-image: linear-gradient(to right, transparent 0%, transparent calc(50% - ${maskLeftPx}px), black calc(50% - ${maskLeftPx}px), black calc(50% + ${maskRightPx}px), transparent calc(50% + ${maskRightPx}px), transparent 100%); mask-image: linear-gradient(to right, transparent 0%, transparent calc(50% - ${maskLeftPx}px), black calc(50% - ${maskLeftPx}px), black calc(50% + ${maskRightPx}px), transparent calc(50% + ${maskRightPx}px), transparent 100%);`
        : `-webkit-mask-image: linear-gradient(to right, transparent 0%, transparent 15%, black 15%, black 85%, transparent 85%, transparent 100%); mask-image: linear-gradient(to right, transparent 0%, transparent 15%, black 15%, black 85%, transparent 85%, transparent 100%);`}
    >
      <div
        bind:this={containerRef}
        class="absolute left-1/2 flex h-full items-center transition-transform ease-in-out"
        style="transform: translateX({slidePosition}px); transition-duration: {transitionDuration}ms"
      >
        {#each visibleSections as section, i (section.isDuplicate ? section.name + '_dup_' + i : section.name)}
          {#if section.accounts.length > 0}
            <button
              bind:this={buttonRefs[i]}
              onclick={() => handleSectionClick(section, i)}
              class="mx-4 whitespace-nowrap text-lg font-bold transition-opacity duration-300 min-[400px]:text-xl sm:text-2xl
              {openSection === section.name ? 'opacity-100' : 'opacity-20'} 
              {i === 0 || i === 4 ? 'pointer-events-none' : ''}"
            >
              {section.name}
            </button>
          {/if}
        {/each}
      </div>
    </div>

    {#each groupedSections as section}
      {#if section.accounts.length > 0 && openSection === section.name}
        <div class="flex justify-center px-4 pb-8">
          <div class="w-fit max-w-md">
            <HexagonGrid
              items={section.accounts}
              cols={2}
              orientation="horizontal"
              component={TeamMemberHexagon}
              gap="small"
            />
          </div>
        </div>
      {/if}
    {/each}
  </div>

  {#each groupedSections as section}
    {#if section.accounts.length > 0}
      <div class="hidden w-full md:block">
        <h2 class="mb-10 mt-12 text-center text-lg font-bold md:text-2xl">
          {section.name}
        </h2>
        <div class="mx-auto w-full max-w-5xl">
          <HexagonGrid
            items={section.accounts}
            cols={4}
            orientation="horizontal"
            component={TeamMemberHexagon}
          />
        </div>
      </div>
    {/if}
  {/each}
</div>
