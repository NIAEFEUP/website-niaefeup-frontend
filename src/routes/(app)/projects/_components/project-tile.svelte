<script lang="ts">
  import type { Project } from '@/types/project';

  let windowWidth: number;
  export let project: Project;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div
  class="flex h-44 w-4/5 flex-col justify-center rounded-xl bg-[#521015]
    {windowWidth < 768 ? 'odd:items-end odd:self-start even:items-start even:self-end' : null}
    md:h-auto md:w-auto md:flex-none md:self-center md:bg-transparent"
>
  <div
    class="md:basis-3/10 mx-5 -mb-3 flex flex-col items-center gap-1 px-4
                py-3 md:justify-between md:gap-4 md:px-0 md:py-0"
  >
    <img
      class="h-20 rounded-xl shadow-lg md:h-72 md:shadow-none"
      src={project.thumbnail}
      alt="nijobs logo"
    />
    <p
      class="'text-gray-200'} font-raleway text-2xl font-semibold
                  md:text-5xl md:text-white"
    >
      {project.title}
    </p>
  </div>
</div>
