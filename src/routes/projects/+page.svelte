<script>
    import ProjectTile from "./ProjectTile.svelte";

    const projects = [
        { name: 'NIJobs'},
        { name: 'UNI'},
        { name: 'TTS'}
    ];
</script>

<div class='flex flex-col items-center'>
    <h1 class='font-source_code text-white text-xl my-10 md:text-3xl md:my-20'>&lt&nbsp<strong>Projetos</strong>&nbsp/&gt</h1>

    <div class="w-full h-full flex flex-col flex-wrap justify-evenly gap-4 md:flex-row md:items-end md:gap-x-1.5">
        {#each projects as project}
            <ProjectTile name={project.name} />
        {/each}
    </div>
</div>