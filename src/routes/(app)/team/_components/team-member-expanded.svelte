<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';
  import Hexagon from '$lib/components/hexagons/hexagon.svelte';
  import type { TeamMember } from '@/types/team-member';

  type Rect = { x: number; y: number; width: number; height: number };

  interface Props {
    member: TeamMember;
    onClose: () => void;
    origin?: Rect | null;
    /** The grid item wrapper (<li>) that holds the clicked hexagon. */
    originEl?: HTMLElement | null;
  }

  let { member, onClose, origin, originEl }: Props = $props();

  // Timings (ms) - kept in one place so JS sequencing and CSS transitions stay in sync
  const FLY_MS = 600;
  const TEXT_DELAY_MS = 420; // text starts sliding out just before the hexagon lands
  const TEXT_MS = 350;
  const TEXT_OUT_MS = 250;

  type Phase = 'initial' | 'flying' | 'showing-text' | 'hiding-text' | 'returning';
  let phase = $state<Phase>('initial');
  let isClosing = false;

  // Untransformed layout slot where the hexagon ends up (FLIP "Last" measurement)
  let slotEl: HTMLDivElement | undefined = $state();
  let originTransform = $state('none');

  const hexAspect = $derived(origin && origin.height > 0 ? origin.width / origin.height : 1);

  const roleText = $derived(
    member.roles && member.roles.length > 0 ? member.roles.map((r) => r.name).join(', ') : ''
  );

  const bioText = $derived(
    member.bio && member.bio.trim().length > 0
      ? member.bio
      : 'Membro ativo da NIFEUP, empenhado em promover a inovação e o espírito académico na comunidade.'
  );

  // Transform (translate + uniform scale, transform-origin: 0 0) that places the flying
  // hexagon exactly over a given viewport rect.
  const transformFor = (rect: Rect | null): string => {
    if (!slotEl || !rect) return 'translate3d(0, 0, 0) scale(0.3)';
    const target = slotEl.getBoundingClientRect();
    if (target.width === 0) return 'none';
    const scale = rect.width / target.width;
    return `translate3d(${rect.x - target.left}px, ${rect.y - target.top}px, 0) scale(${scale})`;
  };

  // On return, re-measure the grid tile: it keeps its geometry (visibility: hidden), so
  // this stays correct even if the page scrolled or resized while the spotlight was open.
  const currentOriginRect = (): Rect | null => {
    if (originEl) {
      const r = originEl.getBoundingClientRect();
      if (r.width > 0) return { x: r.left, y: r.top, width: r.width, height: r.height };
    }
    return origin ?? null;
  };

  const setOriginVisible = (visible: boolean) => {
    if (originEl) {
      originEl.style.visibility = visible ? 'visible' : 'hidden';
      if (visible) {
        originEl.classList.add('hex-fade-in');
        setTimeout(() => originEl?.classList.remove('hex-fade-in'), 400);
      }
    }
  };

  onMount(() => {
    // Prevent background scroll while spotlight is open without layout shift
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // The slot stays empty in the grid for the whole spotlight
    setOriginVisible(false);

    // FLIP "First/Invert": place the hexagon at the origin with no transition...
    originTransform = transformFor(origin ?? null);

    // ...and only then "Play" it on a later frame (never mount at the destination).
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (!isClosing) phase = 'flying';
      });
    });

    const textTimer = setTimeout(() => {
      if (!isClosing) phase = 'showing-text';
    }, TEXT_DELAY_MS);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(textTimer);
      setOriginVisible(true);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  });

  const requestClose = () => {
    if (isClosing) return;
    isClosing = true;

    // 1. card slides back behind the hexagon
    phase = 'hiding-text';

    // 2. hexagon flies, spins and shrinks back to its slot
    setTimeout(() => {
      originTransform = transformFor(currentOriginRect());
      phase = 'returning';
    }, TEXT_OUT_MS);

    // 3. only after it has landed, restore the grid tile and unmount
    setTimeout(() => {
      setOriginVisible(true);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      onClose();
    }, TEXT_OUT_MS + FLY_MS);
  };

  const handleWindowKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      requestClose();
    }
  };

  const atOrigin = $derived(phase === 'initial' || phase === 'returning');
  const spun = $derived(phase !== 'initial' && phase !== 'returning');
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<!-- Fixed full-screen backdrop -->
<button
  type="button"
  tabindex="-1"
  aria-label="Fechar detalhes do membro"
  class="backdrop fixed inset-0 z-40 cursor-default bg-black/75 backdrop-blur-md"
  class:backdrop-hidden={atOrigin}
  onclick={requestClose}
></button>

<!-- Centered container for the duo -->
<div class="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
  <div
    class="pointer-events-auto relative flex flex-col items-center gap-8 lg:flex-row"
    role="dialog"
    aria-modal="true"
    aria-label={member.name}
    style:--fly-ms="{FLY_MS}ms"
    style:--text-ms="{TEXT_MS}ms"
    style:--text-out-ms="{TEXT_OUT_MS}ms"
  >
    <!-- 1. The Hexagon Slot (layout box; the flying hexagon animates from the grid into it) -->
    <div
      bind:this={slotEl}
      class="relative z-20 w-[220px] sm:w-[260px] lg:w-[360px]"
      style:aspect-ratio={hexAspect}
    >
      <div
        class="hex-fly absolute inset-0"
        class:no-transition={phase === 'initial'}
        style:transform={atOrigin ? originTransform : 'none'}
      >
        <div class="hex-spin h-full w-full" class:spun>
          <Hexagon orientation="horizontal">
            <div class="relative h-full w-full">
              <div
                class="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent"
              ></div>
              <img
                src={member.photo ? member.photo : '/images/default_profile_pic.png'}
                alt="Membro da NIFEUP {member.name}"
                class="z-0 h-full w-full object-cover"
              />
            </div>
          </Hexagon>
        </div>
      </div>
    </div>

    <!-- 2. The Information Card (slides out from behind the hexagon) -->
    <div
      class="text-card relative z-10 flex w-full max-w-sm flex-col rounded-3xl border border-white/10 bg-neutral-900/95 p-7 shadow-2xl backdrop-blur-xl lg:w-[440px] lg:max-w-lg lg:p-8"
      class:visible={phase === 'showing-text'}
    >
      <button
        type="button"
        class="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800/90 text-white transition-all hover:scale-110 hover:bg-neutral-700"
        onclick={requestClose}
        aria-label="Fechar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <h2 class="mb-2 pr-10 text-2xl font-bold text-white md:text-3xl">
        {member.name}
      </h2>

      {#if roleText}
        <span
          class="mb-4 inline-block w-fit rounded-full bg-[hsl(var(--accent))]/20 px-3 py-1 text-sm font-semibold text-[hsl(var(--accent))]"
        >
          {roleText}
        </span>
      {/if}

      <p class="mb-6 text-base leading-relaxed text-gray-200">
        {bioText}
      </p>

      <div class="flex items-center gap-2">
        {#if member.linkedin}
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:scale-110 hover:bg-white/20"
            aria-label="LinkedIn de {member.name}"
          >
            <Icon src={Icons.Linkedin} color="white" size="24px" />
          </a>
        {/if}
        {#if member.github}
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:scale-110 hover:bg-white/20"
            aria-label="GitHub de {member.name}"
          >
            <Icon src={Icons.Github} color="white" size="24px" />
          </a>
        {/if}
        {#if member.email}
          <a
            href="mailto:{member.email}"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:scale-110 hover:bg-white/20"
            aria-label="Email de {member.name}"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M4 4h16v16H4z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        {/if}
        {#if member.websites}
          {#each member.websites as customWebsite (customWebsite.url)}
            <a
              href={customWebsite.url}
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:scale-110 hover:bg-white/20"
              aria-label="Website de {member.name}"
            >
              {#if customWebsite.iconPath}
                <img src={customWebsite.iconPath} alt="Ícone" class="h-6 w-6 object-cover" />
              {:else}
                <Icon src={Icons.Globe} color="white" size="22px" />
              {/if}
            </a>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .backdrop {
    opacity: 1;
    transition: opacity 400ms ease-out;
  }

  .backdrop-hidden {
    opacity: 0;
  }

  /* Outer layer: translate + scale only (GPU transform, no layout work) */
  .hex-fly {
    transform-origin: 0 0;
    will-change: transform;
    transition: transform var(--fly-ms) cubic-bezier(0.16, 1, 0.3, 1);
  }

  .hex-fly.no-transition {
    transition: none;
  }

  /* Inner layer: spin around the hexagon's own center */
  .hex-spin {
    transform-origin: 50% 50%;
    transform: rotate(0deg);
    will-change: transform;
    transition: transform var(--fly-ms) cubic-bezier(0.16, 1, 0.3, 1);
  }

  .hex-spin.spun {
    transform: rotate(360deg);
  }

  .hex-fly.no-transition .hex-spin {
    transition: none;
  }

  /* Card: tucked behind the hexagon until it lands */
  .text-card {
    opacity: 0;
    transform: translate3d(-80px, 0, 0) scaleX(0.9);
    filter: blur(4px);
    pointer-events: none;
    transition:
      transform var(--text-out-ms) cubic-bezier(0.4, 0, 1, 1),
      opacity var(--text-out-ms) cubic-bezier(0.4, 0, 1, 1),
      filter var(--text-out-ms) cubic-bezier(0.4, 0, 1, 1);
  }

  .text-card.visible {
    opacity: 1;
    transform: translate3d(0, 0, 0) scaleX(1);
    filter: blur(0);
    pointer-events: auto;
    transition:
      transform var(--text-ms) cubic-bezier(0.16, 1, 0.3, 1),
      opacity var(--text-ms) cubic-bezier(0.16, 1, 0.3, 1),
      filter var(--text-ms) cubic-bezier(0.16, 1, 0.3, 1);
  }

  @media (min-width: 1024px) {
    .text-card {
      transform: translate3d(-120px, 0, 0) scaleX(0.9);
    }
    .text-card.visible {
      transform: translate3d(0, 0, 0) scaleX(1);
    }
  }

  @media (max-width: 1023px) {
    .text-card {
      transform: translate3d(0, -40px, 0) scale(0.98);
    }
    .text-card.visible {
      transform: translate3d(0, 0, 0) scale(1);
    }
  }

  :global(.hex-fade-in .hex-info) {
    animation: hex-info-fade 400ms ease-out;
  }

  @keyframes hex-info-fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hex-spin,
    .hex-spin.spun {
      transform: none;
    }
    :global(.hex-fade-in .hex-info) {
      animation: none;
    }
  }
</style>
