<script lang="ts">
  import type { Project } from '@/types/project';
  import Icon from '@/lib/components/icons/icon.svelte';
  import Icons from '@/lib/components/icons/icons';

  interface Props {
    project: Project;
    isOdd: boolean;
  }

  let { project, isOdd }: Props = $props();
</script>

<a
  href="/projects/{project.slug}"
  class="group relative flex transition-all duration-300
    /* Mobile: alternating ribbon */
    w-[88%] sm:w-[84%] h-24 sm:h-28 bg-[#521015] shadow-lg
    border-y border-white/10 active:scale-[0.98] hover:bg-[#62141a]
    {isOdd
    ? 'self-start rounded-r-2xl border-r border-white/10 pl-4 pr-4'
    : 'self-end rounded-l-2xl border-l border-white/10 pr-4 pl-4'}
    /* Desktop: card with generous padding & hover safe area */
    md:w-full md:h-auto md:self-auto md:flex-col md:p-4 lg:p-5
    md:rounded-2xl md:border md:border-transparent
    md:bg-transparent md:hover:bg-[#521015] md:hover:border-white/15
    md:hover:shadow-[0_16px_32px_rgba(0,0,0,0.4)] md:hover:-translate-y-1.5"
>
  <!-- Mobile layout (< md) -->
  <div
    class="flex h-full w-full items-center gap-3.5 md:hidden {isOdd
      ? 'flex-row text-left'
      : 'flex-row-reverse text-right'}"
  >
    <div
      class="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-black/25 p-2 shadow-inner"
    >
      <img
        src={project.image}
        alt="Logótipo de {project.title}"
        class="h-full w-full object-contain"
        loading="lazy"
      />
    </div>

    <div class="flex min-w-0 flex-1 flex-col justify-center">
      <h2 class="font-raleway text-lg font-bold leading-snug text-white truncate sm:text-xl">
        {project.title}
      </h2>
      {#if project.slogan}
        <p class="font-source-code mt-0.5 line-clamp-1 text-xs font-medium text-rose-300">
          {project.slogan}
        </p>
      {/if}
    </div>

    <div class="shrink-0 text-white/40 transition-colors group-hover:text-white">
      <Icon src={isOdd ? Icons.ChevronRight : Icons.ChevronLeft} size="16px" />
    </div>
  </div>

  <!-- Desktop layout (>= md) -->
  <div class="hidden w-full md:flex md:flex-col md:items-center">
    <div
      class="relative aspect-16/10 w-full overflow-hidden rounded-xl border border-white/10 bg-[#250d0f] shadow-md"
    >
      <img
        src={project.thumbnail}
        alt="Thumbnail de {project.title}"
        class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>

    <div class="mt-4 flex flex-col items-center text-center">
      <h2
        class="font-raleway text-xl font-bold text-white transition-colors duration-200 group-hover:text-taupe-100 lg:text-2xl"
      >
        {project.title}
      </h2>
      {#if project.slogan}
        <p class="font-source-code mt-1 text-xs font-medium text-rose-300/90 lg:text-sm">
          {project.slogan}
        </p>
      {/if}
    </div>
  </div>
</a>
