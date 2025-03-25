<script lang="ts">
  import type { Project } from '@/types/project';

  let screenSizeThreshold = 768; // tailwindcss sets 48rem (768px) as the minimum with for mobile devices
  let windowWidth: number;
  export let project: Project;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div
  class="flex h-44 w-4/5 flex-col justify-center bg-[#521015] md:m-10 lg:m-12
    {windowWidth < screenSizeThreshold
    ? 'odd:items-end odd:self-start odd:rounded-r-xl even:items-start even:self-end even:rounded-l-xl'
    : null}
    md:h-auto md:w-auto md:flex-none md:self-center md:bg-transparent"
>
  <div
    class="md:basis-3/10 mx-5 -mb-3 flex flex-col items-center gap-1
md:justify-between md:gap-4 md:px-0 md:py-0"
  >
    <a href="https://lipsum.com">
      <img
        class="h-20 rounded-xl shadow-lg md:h-min md:max-h-80 md:shadow-none"
        src={windowWidth < screenSizeThreshold ? project.image : project.thumbnail}
        alt="{project.title}'s thumbnail"
      />
    </a>
    <a href="https://lipsum.com">
      <p
        class="text-md md:h-32 text-center font-raleway
                  font-semibold text-gray-200 md:text-3xl md:text-white lg:text-5xl"
      >
        {project.title}
      </p>
    </a>
  </div>
</div>
