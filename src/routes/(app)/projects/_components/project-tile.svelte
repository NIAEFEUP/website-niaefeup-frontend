<script lang="ts">
  import type { Project } from '@/types/project';
  import { resolve } from '$app/paths';

  let screenSizeThreshold = 768; // tailwindcss sets 48rem (768px) as the minimum with for mobile devices
  let windowWidth: number = $state(0);
  interface Props {
    project: Project;
    isOdd: boolean;
  }

  let { project, isOdd }: Props = $props();

  const projectUrl = resolve(`/projects/${project.slug}`);
</script>

<svelte:window bind:innerWidth={windowWidth} />

<svelte:element
  this={windowWidth < screenSizeThreshold ? 'a' : 'div'}
  href={windowWidth < screenSizeThreshold ? projectUrl : undefined}
  class="flex h-44 w-4/5 flex-row justify-center bg-[#521015]
    {windowWidth < screenSizeThreshold
    ? 'odd:self-start odd:rounded-r-xl even:self-end even:rounded-l-xl'
    : null}
    md:m-10 md:h-auto md:w-auto md:flex-none md:flex-col md:self-center md:bg-transparent lg:m-12"
>
  <div
    class="mx-5 mb-3 flex w-full flex-row items-center justify-around gap-2 md:basis-3/10 md:flex-col
md:justify-between md:gap-4 md:px-0 md:py-0 {isOdd ? 'flex-row' : 'flex-row-reverse'}"
  >
    <a href={projectUrl}>
      <img
        class="h-20 rounded-xl shadow-lg md:h-min md:max-h-80 md:shadow-none"
        src={windowWidth < screenSizeThreshold ? project.image : project.thumbnail}
        alt="{project.title}'s thumbnail"
      />
    </a>
    <a href={projectUrl}>
      <p
        class="text-md font-raleway text-center font-semibold
                  text-gray-200 md:h-32 md:text-3xl md:text-white lg:text-5xl"
      >
        {project.title}
      </p>
    </a>
  </div>
</svelte:element>
