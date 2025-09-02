<script lang="ts">
  import type { PageData } from './$types';
  import ProjectTile from './_components/project-tile.svelte';
  import TextButton from '@/lib/components/buttons/text-button.svelte';
  import type { Project } from '@/types/project';

  let { data }: { data: PageData } = $props();

  const projects: Project[] = data.projects;
  const hasPerms: boolean = data.hasPerms;
</script>

<section>
  <div class="flex w-full flex-col items-center">
    <h1 class="my-2 text-center font-source_code text-xl text-white md:my-4 md:text-3xl">
      &lt&nbsp<strong>Projetos</strong>&nbsp/&gt
    </h1>
    {#if hasPerms}
      <div class="my-8 flex w-5/6 justify-end sm:my-6 md:my-6 lg:mb-12 xl:mb-12 2xl:mb-12">
        <a href="/projects/create">
          <TextButton color="secondary" hoverColor="red" width="12" text="Novo Projeto"
          ></TextButton>
        </a>
      </div>
    {/if}

    <div
      class="mt-4 flex h-full w-full flex-col justify-evenly gap-4
                md:mt-6 md:grid md:grid-cols-3 md:gap-x-1.5"
    >
      {#each projects as project, index (index)}
        <ProjectTile {project} isOdd={index % 2 === 1} />
      {/each}
    </div>
  </div>
</section>
