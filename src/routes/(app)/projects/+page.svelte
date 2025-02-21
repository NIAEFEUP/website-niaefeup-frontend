<script>
  import ProjectTile from './_components/project-tile.svelte';
  import Button from '@/lib/components/buttons/button.svelte';

  const projects = [{ name: 'NIJobs' }, { name: 'UNI' }, { name: 'TTS' }];
</script>

<section>
  <div class="flex w-full flex-col items-center">
    <h1 class="my-2 text-center font-source_code text-xl text-white md:my-4 md:text-3xl">
      &lt&nbsp<strong>Projetos</strong>&nbsp/&gt
    </h1>
    <!-- TODO: only show this if the user is authenticated and has the given rights -->
    <div class="flex w-5/6 justify-end sm:my-6 md:my-6 lg:mb-12 xl:mb-12 2xl:mb-12">
      <!-- TODO: link the new project page -->
      <a href="https://lipsum.com">
        <Button color="secondary" hoverColor="red" width="12" text="Novo Projeto"></Button>
      </a>
    </div>

    <div
      class="mt-4 flex h-full w-full flex-col flex-wrap justify-evenly gap-4
                md:mt-6 md:flex-row md:items-end md:gap-x-1.5"
    >
      {#each projects as project}
        <ProjectTile name={project.name} />
      {/each}
    </div>
  </div>
</section>
