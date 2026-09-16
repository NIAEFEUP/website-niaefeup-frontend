<script lang="ts">
  import type { PageData } from './$types';
  import ProjectTile from './_components/project-tile.svelte';
  import Button from '@/lib/components/buttons/button.svelte';
  import type { Project } from '@/types/project';

  let { data }: { data: PageData } = $props();

  let projects: Project[] = $derived(data.projects);
  let hasPerms: boolean = $derived(data.hasPerms);
</script>

<section>
  <div class="flex w-full flex-col items-center">
    <h1 class="my-2 text-center font-source-code text-xl text-white md:my-4 md:text-3xl">
      &lt&nbsp<strong>Projetos</strong>&nbsp/&gt
    </h1>
    {#if hasPerms}
      <div class="my-8 flex w-5/6 justify-end sm:my-6 md:my-6 lg:mb-12 xl:mb-12 2xl:mb-12">
        <a href="/projects/create">
          <Button color="secondary" hoverColor="red" width="medium" text="Novo Projeto"></Button>
        </a>
      </div>
    {/if}

    <div
      class="mt-4 flex w-full flex-col gap-5 md:mt-8 md:grid md:grid-cols-3 md:gap-8 lg:gap-10 max-w-6xl sm:px-6"
    >
      {#each projects as project, index (project.id ?? project.slug ?? index)}
        <ProjectTile {project} isOdd={index % 2 === 1} />
      {/each}
    </div>
  </div>
</section>
