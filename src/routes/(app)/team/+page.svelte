<script lang="ts">
  import type { PageData } from './$types';
  import TeamSectionGrid from './_components/team-section-grid.svelte';
  import type { TeamMember } from '@/types/team-member';

  let { data }: { data: PageData } = $props();

  const ROLE_DISPLAY_NAMES: Record<string, string> = {
    Member: 'Membros',
    Recruit: 'Recrutas'
  };

  const DIRECTION_ROLES = ['President', 'Board'] as const;
  const EXCLUDED_ROLES = ['Alumni'] as const;

  // Carousel constants
  const CAROUSEL_CENTER_INDEX = 2; // [Next, Prev, Curr, Next, Prev]
  const TRANSITION_DURATION_MS = 300; // animation duration
  const MASK_OFFSET_PX = 8; // additional offset for gradient mask calculations
  const MASK_THRESHOLD_PX = 50; // min measured distance before using fallback mask size
  const MASK_FALLBACK_PX = 130; // fallback mask size
  const SWIPE_SNAP_THRESHOLD_PX = 60; // min swipe distance to trigger section change
  const LAYOUT_RECENTER_DELAY_MS = 50; // delay before recentering after layout changes

  let buttonRefs: (HTMLButtonElement | undefined)[] = $state([]);
  let containerRef: HTMLDivElement | undefined = $state();
  let slidePosition = $state(0);
  let transitionDuration = $state(0);

  let orderedSections: { id: string; name: string; accounts: TeamMember[] }[] = $state([]);
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
    const result: Array<{ id: string; name: string; accounts: TeamMember[] }> = [];

    const directionAccounts: TeamMember[] = [];
    for (const role of DIRECTION_ROLES) {
      const section = data.sections.find((s) => s.section === role);
      if (section) {
        directionAccounts.push(...section.accounts);
      }
    }

    if (directionAccounts.length > 0) {
      result.push({
        id: 'direction',
        name: 'Direção',
        accounts: directionAccounts
      });
    }

    // other sections (excluding direction roles and excluded roles)
    const otherSections = data.sections.filter(
      (s) =>
        !DIRECTION_ROLES.includes(s.section as any) && !EXCLUDED_ROLES.includes(s.section as any)
    );

    for (const section of otherSections) {
      const displayName = ROLE_DISPLAY_NAMES[section.section] || section.section;
      result.push({
        id: section.section.toLowerCase(),
        name: displayName,
        accounts: section.accounts
      });
    }

    return result;
  });

  const hasTeamMembers = $derived(groupedSections.some((section) => section.accounts.length > 0));

  let openSection = $state<string | null>(null);

  // initialize openSection once groupedSections is available
  $effect(() => {
    if (openSection === null && groupedSections.length > 0) {
      const direction = groupedSections.find((s) => s.id === 'direction' && s.accounts.length > 0);
      if (direction) {
        openSection = direction.name;
      } else {
        const firstNonEmpty = groupedSections.find((s) => s.accounts.length > 0);
        openSection = firstNonEmpty?.name ?? null;
      }
    }
  });

  $effect(() => {
    if (orderedSections.length === 0 && groupedSections.length > 0 && openSection !== null) {
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

    const centerBtn = buttonRefs[CAROUSEL_CENTER_INDEX];
    const prevBtn = buttonRefs[1];
    const nextBtn = buttonRefs[3];

    if (centerBtn) {
      const buttonCenter = centerBtn.offsetLeft + centerBtn.offsetWidth / 2;
      slidePosition = -buttonCenter;
      transitionDuration = animate ? TRANSITION_DURATION_MS : 0;

      if (prevBtn && nextBtn) {
        let measuredLeft = buttonCenter - prevBtn.offsetLeft + MASK_OFFSET_PX;
        let measuredRight =
          nextBtn.offsetLeft + nextBtn.offsetWidth - buttonCenter + MASK_OFFSET_PX;
        maskLeftPx = measuredLeft > MASK_THRESHOLD_PX ? measuredLeft : MASK_FALLBACK_PX;
        maskRightPx = measuredRight > MASK_THRESHOLD_PX ? measuredRight : MASK_FALLBACK_PX;

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
        { ...next, isDuplicate: true, carouselId: 'buf-left' }, // 0: Next (Buffer Left)
        { ...prev, isDuplicate: false, carouselId: 'prev' }, // 1: Prev
        { ...curr, isDuplicate: false, carouselId: 'curr' }, // 2: Current (Center)
        { ...next, isDuplicate: false, carouselId: 'next' }, // 3: Next
        { ...prev, isDuplicate: true, carouselId: 'buf-right' } // 4: Prev (Buffer Right)
      ] as Array<{
        id: string;
        name: string;
        accounts: TeamMember[];
        isDuplicate?: boolean;
        carouselId?: string;
      }>;
    }
    return base as Array<{
      id: string;
      name: string;
      accounts: TeamMember[];
      isDuplicate?: boolean;
      carouselId?: string;
    }>;
  });

  let recenterTimeout: ReturnType<typeof setTimeout> | null = null;
  $effect(() => {
    if (transitionDuration === 0 && buttonRefs[CAROUSEL_CENTER_INDEX] && !isDragging) {
      if (recenterTimeout !== null) {
        clearTimeout(recenterTimeout);
      }
      recenterTimeout = setTimeout(() => centerActiveSection(false), LAYOUT_RECENTER_DELAY_MS);
    }
    return () => {
      if (recenterTimeout !== null) {
        clearTimeout(recenterTimeout);
        recenterTimeout = null;
      }
    };
  });

  const handleSectionClick = (
    clickedSection: { id: string; name: string; accounts: TeamMember[] },
    index: number
  ) => {
    if (clickedSection.name === openSection) return;
    if (index === CAROUSEL_CENTER_INDEX) return; // Center
    if (slidingNext || slidingPrev) return;

    if (index === 3) {
      // Next
      const nextButton = buttonRefs[3];
      if (nextButton) {
        slidingNext = true;
        const dist = nextButton.offsetLeft + nextButton.offsetWidth / 2;
        slidePosition = -dist;
        transitionDuration = TRANSITION_DURATION_MS;
        openSection = clickedSection.name;

        setTimeout(() => {
          slidingNext = false;
          const first = orderedSections.shift();
          if (first) orderedSections.push(first);
          orderedSections = [...orderedSections];

          requestAnimationFrame(() => centerActiveSection(false));
        }, TRANSITION_DURATION_MS);
      }
    } else if (index === 1) {
      // Prev
      const prevButton = buttonRefs[1];
      if (prevButton) {
        slidingPrev = true;
        const dist = prevButton.offsetLeft + prevButton.offsetWidth / 2;
        slidePosition = -dist;
        transitionDuration = TRANSITION_DURATION_MS;
        openSection = clickedSection.name;

        setTimeout(() => {
          slidingPrev = false;
          const last = orderedSections.pop();
          if (last) orderedSections.unshift(last);
          orderedSections = [...orderedSections];

          requestAnimationFrame(() => centerActiveSection(false));
        }, TRANSITION_DURATION_MS);
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

    transitionDuration = TRANSITION_DURATION_MS;

    if (swipeDistance < -SWIPE_SNAP_THRESHOLD_PX) {
      // swiped left -> snap to next
      if (visibleSections[3]) handleSectionClick(visibleSections[3], 3);
    } else if (swipeDistance > SWIPE_SNAP_THRESHOLD_PX) {
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
    &lt;&nbsp;<strong>Equipa</strong>&nbsp;/&gt;
  </h1>

  {#if !hasTeamMembers}
    <div class="my-12 text-center text-gray-400">
      <p class="text-lg">Nenhum membro da equipa encontrado.</p>
    </div>
  {:else}
    <div class="w-full md:hidden">
      <div
        class="relative mb-6 mt-2 h-12 w-full touch-pan-y overflow-hidden"
        ontouchstart={handleTouchStart}
        ontouchmove={handleTouchMove}
        ontouchend={handleTouchEnd}
        style={maskLeftPx > MASK_THRESHOLD_PX
          ? `-webkit-mask-image: linear-gradient(to right, transparent 0%, transparent calc(50% - ${maskLeftPx}px), black calc(50% - ${maskLeftPx}px), black calc(50% + ${maskRightPx}px), transparent calc(50% + ${maskRightPx}px), transparent 100%); mask-image: linear-gradient(to right, transparent 0%, transparent calc(50% - ${maskLeftPx}px), black calc(50% - ${maskLeftPx}px), black calc(50% + ${maskRightPx}px), transparent calc(50% + ${maskRightPx}px), transparent 100%);`
          : `-webkit-mask-image: linear-gradient(to right, transparent 0%, transparent 15%, black 15%, black 85%, transparent 85%, transparent 100%); mask-image: linear-gradient(to right, transparent 0%, transparent 15%, black 15%, black 85%, transparent 85%, transparent 100%);`}
      >
        <div
          bind:this={containerRef}
          class="absolute left-1/2 flex h-full items-center transition-transform ease-in-out"
          style="transform: translateX({slidePosition}px); transition-duration: {transitionDuration}ms"
        >
          {#each visibleSections as section, i (section.isDuplicate ? section.id + '_dup_' + i : section.id)}
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

      {#each groupedSections as section (section.id)}
        {#if openSection === section.name}
          <div class="flex justify-center px-4 pb-8">
            <TeamSectionGrid {section} cols={2} gap="small" />
          </div>
        {/if}
      {/each}
    </div>

    {#each groupedSections as section (section.id)}
      <div class="hidden w-full md:block">
        <TeamSectionGrid {section} cols={4} showTitle />
      </div>
    {/each}
  {/if}
</div>
