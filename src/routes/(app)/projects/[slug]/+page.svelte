<script lang="ts">
  import type { PageData } from './$types';
  import type { Project } from '@/types/project';
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';

  export let data: PageData;
  export let project: Project = data.project;
  let screenSizeThreshold = 768;
  let windowWidth: number;
</script>

<svelte:window bind:innerWidth={windowWidth} />

{#await project then project}
  <section class="min-h-screen pt-24 font-raleway md:pt-60">
    <header class="flex flex-row justify-center gap-6">
      <div class="inline-block rounded-2xl bg-white/20 p-4">
        <img src={project.thumbnail} alt="{project.title}'s thumbnail" />
      </div>
      <div class="my-auto flex flex-col items-center md:items-start">
        <h1 class="mb-4 text-3xl font-semibold text-white md:text-6xl">{project.title}</h1>
        <div class="flex w-full justify-center md:justify-start">
          <Icon
            src={Icons.Github}
            href={project.github}
            size={windowWidth < screenSizeThreshold ? '38px' : '64px'}
          />
        </div>
      </div>
    </header>

    <div class="mt-28 text-center">
      <strong class="text-4xl text-white">{project.slogan}</strong>
    </div>

    <ul class="mt-24 flex flex-wrap justify-center gap-10">
      {#each project.links as link}
        <li>
          <a
            href={link.url}
            class="flex h-20 w-60 items-center justify-center overflow-hidden rounded-xl text-white md:h-20"
          >
            <img
              src={link.iconPath}
              alt="{project.title}'s custom website"
              class="max-h-60 object-contain"
            />
          </a>
        </li>
      {/each}
    </ul>

    <div class="mt-32 flex flex-col items-center justify-center gap-4 md:flex-row">
      <img class="w-max-xl w-1/3" src={project.image} alt="{project.title}'s image" />
      <p class="w-5/6 max-w-xl text-right text-2xl text-gray-100 md:w-1/3 md:text-4xl">
        {project.description}
      </p>
    </div>

    <div class="mt-24 flex flex-col justify-evenly md:flex-row">
      <div class="flex flex-col items-center md:w-1/3">
        <p class="mb-6 font-source_code text-3xl font-bold text-white md:text-5xl">
          &lt; Tecnologias /&gt;
        </p>
        <div class="mb-12 mt-6 flex flex-wrap justify-center gap-8">
          {#each project.technologies as technology}
            <!-- TODO: fix this when we have the technologies entity implemented in the backend -->
            <div
              class="flex h-24 w-24 content-center items-center gap-4 rounded-full bg-[#674244]/40 px-4 py-4 md:w-64 md:px-8"
            >
              <img
                src="https://picsum.photos/id/239/200/200"
                alt="Logótipo da tecnologia {technology}"
                class="max-h-20"
              />
              {#if windowWidth > screenSizeThreshold}
                <p class="text-xl text-white">{technology}</p>
              {/if}
            </div>
          {/each}
        </div>
      </div>
      <div class="flex flex-col items-center md:w-1/3">
        <p class="mb-6 font-source_code text-3xl font-bold text-white md:text-5xl">
          &lt; Público Alvo /&gt;
        </p>
        <div class="flex justify-center gap-8">
          <p class="text-center text-3xl font-semibold text-white">
            {project.targetAudience}
          </p>
        </div>
      </div>
    </div>
  </section>
{/await}
