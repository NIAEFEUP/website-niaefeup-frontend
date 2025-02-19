<script>
  import ProjectTile from './_components/project-tile.svelte';

  const projects = [{ name: 'NIJobs' }, { name: 'UNI' }, { name: 'TTS' }];
</script>

<div class="flex flex-col items-center">
  <h1 class="my-10 font-source_code text-xl text-white md:my-20 md:text-3xl">
    &lt&nbsp<strong>Projetos</strong>&nbsp/&gt
  </h1>

  <div
    class="-mt-1 flex h-full w-full flex-col flex-wrap justify-evenly gap-4
                md:mt-0 md:flex-row md:items-end md:gap-x-1.5"
  >
    {#each projects as project}
      <ProjectTile name={project.name} />
    {/each}
  </div>
</div>
