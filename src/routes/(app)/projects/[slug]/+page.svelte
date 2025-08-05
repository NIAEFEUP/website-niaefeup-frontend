<script lang="ts">
  import type { PageData } from './$types';
  import type { Project } from '@/types/project';
  import EditButton from '$lib/components/buttons/edit-button.svelte';
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';

  export let data: PageData;
  export const project: Project = data.project;
  export const hasPerms: boolean = data.hasPerms;

  let screenSizeThreshold = 768;
  let windowWidth: number;
</script>

<svelte:window bind:innerWidth={windowWidth} />

{#await project then project}
  <section class="mx-5 min-h-screen pt-12 md:pt-32">
    {#if hasPerms}
      <div class="my-4 flex justify-end md:my-8 md:w-5/6">
        <EditButton size="small" link="/projects/{project.slug}/edit" />
      </div>
    {/if}
    <header class="flex flex-row justify-center gap-6">
      <img
        src={project.image}
        alt="{project.title}'s image"
        class="h-full w-full rounded-2xl border-[3vw] border-solid border-white/20 md:w-1/5 md:max-w-md md:border-[2vw]"
      />
      <div class="my-auto flex flex-col items-center md:items-start">
        <h1 class="mb-4 text-3xl font-semibold text-white md:text-6xl">{project.title}</h1>
        <div class="flex w-full justify-start">
          <Icon
            src={Icons.Github}
            href={project.github}
            size={windowWidth < screenSizeThreshold ? '38px' : '64px'}
          />
        </div>
      </div>
    </header>

    <div class="mt-14 text-center md:mt-28">
      <strong class="text-4xl text-white">{project.slogan}</strong>
    </div>

    {#if project.links && project.links.length > 0}
      <ul class="mt-16 flex flex-wrap justify-center gap-10">
        {#each project.links as link}
          <li>
            <a
              href={link.url}
              class="flex h-20 w-60 items-center justify-center overflow-hidden rounded-xl text-white md:h-28 md:w-56"
            >
              <img
                src={link.iconPath}
                alt="{project.title}'s custom website"
                class="object-cover md:h-28 md:w-56"
              />
            </a>
          </li>
        {/each}
      </ul>
    {/if}

    <div class="mt-20 flex flex-col items-center justify-center gap-4 md:flex-row">
      <img class="w-max-xl w-1/3" src={project.thumbnail} alt="{project.title}'s thumbnail" />
      {#if windowWidth < screenSizeThreshold}
        <p class="mt-4 w-5/6 text-left text-3xl font-bold">tem por objetivo...</p>
      {/if}
      <p class="w-5/6 max-w-xl text-right text-2xl text-gray-100 md:w-1/3 md:text-4xl">
        {project.description}
      </p>
    </div>

    <div class="mt-24 flex flex-col justify-evenly md:flex-row">
      {#if project.technologies && project.technologies.length > 0}
        <div class="flex flex-col items-center md:w-1/3">
          <p
            class="mb-6 font-source_code text-3xl font-bold text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
          >
            &lt; Tecnologias /&gt;
          </p>
          <div class="mb-12 mt-6 flex flex-wrap justify-center gap-4 md:gap-8">
            {#each project.technologies as technology}
              <a
                href={technology.url}
                target="_blank"
                class="flex h-20 w-20 content-center items-center gap-4 rounded-full bg-white/20 px-4 py-4 md:w-64 md:px-8"
              >
                <img
                  src={technology.image}
                  alt="Technology {technology.name}'s logo"
                  class="max-h-12"
                />
                {#if windowWidth > screenSizeThreshold}
                  <p class="text-xl text-white">{technology.name}</p>
                {/if}
              </a>
            {/each}
          </div>
        </div>
      {/if}
      <div
        class="flex flex-col items-center {project.technologies && project.technologies.length > 0
          ? 'md:w-1/3'
          : 'md:w-full md:justify-center'}"
      >
        <p
          class="mb-6 font-source_code font-bold text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
        >
          &lt; Público Alvo /&gt;
        </p>
        <div class="flex justify-center gap-8">
          <p class="text-center text-xl font-semibold text-white md:text-3xl">
            {project.targetAudience}
          </p>
        </div>
      </div>
    </div>
  </section>
{/await}
