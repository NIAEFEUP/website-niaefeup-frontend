<script lang="ts">
  import type { PageData } from './$types';
  import type { Project } from '@/types/project';
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';

  export let data: PageData;
  export let project: Project = data.project;
</script>

{#await project then project}
  <section class="min-h-screen pt-60 font-raleway">
    <header class="flex flex-row justify-center gap-6">
      <div class="inline-block rounded-2xl bg-white/20 p-4">
        <img src={project.thumbnail} alt="{project.title}'s thumbnail" />
      </div>
      <div class="my-auto">
        <h1 class="mb-4 text-6xl font-semibold text-white">{project.title}</h1>
        <Icon src={Icons.Github} href={project.github} size="48px" />
      </div>
    </header>

    <div class="mt-28 text-center">
      <strong class="text-4xl text-white">{project.slogan}</strong>
    </div>

    <ul class="mt-24 flex justify-center gap-10">
      {#each project.links as link}
        <li>
          <a
            href={link.url}
            class="flex h-20 w-60 items-center justify-center overflow-hidden rounded-xl bg-[#872020] text-white"
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

    <div class="mt-32 flex items-center justify-center gap-4">
      <img class="w-max-xl w-1/3" src={project.image} alt="{project.title}'s image" />
      <p class="w-1/3 max-w-xl text-right text-4xl text-gray-100">
        {project.description}
      </p>
    </div>

    <div class="mt-24 flex justify-evenly">
      <div class="flex w-1/3 flex-col items-center">
        <p class="mb-6 font-source_code text-5xl font-bold text-white">&lt; Tecnologias /&gt;</p>
        <div class="mt-6 flex flex-wrap justify-center gap-8">
          {#each project.technologies as technology}
            <!-- TODO: fix this when we have the technologies entity implemented in the backend -->
            <div
              class="flex h-24 w-64 content-center items-center gap-4 rounded-full bg-[#674244]/40 px-8 py-4"
            >
              <img
                src="https://picsum.photos/id/239/200/200"
                alt="Logótipo da tecnologia {technology}"
                class="max-h-20"
              />
              <p class="text-xl text-white">{technology}</p>
            </div>
          {/each}
        </div>
      </div>
      <div class="flex w-1/3 flex-col items-center">
        <p class="mb-6 font-source_code text-5xl font-bold text-white">&lt; Público Alvo /&gt;</p>
        <div class="flex justify-center gap-8">
          <p class="text-center text-3xl font-semibold text-white">
            {project.targetAudience}
          </p>
        </div>
      </div>
    </div>
  </section>
{/await}
