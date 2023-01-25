<script lang="ts">
    import NavItem from "$lib/navbar/NavItem.svelte";

    let selectedIndex: number | null = null;

    const items = [
        "Início",
        "Eventos",
        "Projetos",
        "Equipa",
        "Contactos",
    ];
</script>

<nav class="bg-ni-sidebar grid grid-cols-4 grid-rows-6 justify-items-center sm:invisible py-4 absolute w-screen h-screen">
    <div class="col-start-4 flex items-start justify-end">
        <button class="text-white text-4xl">X</button>
    </div>
    <ul class="row-start-2 col-start-1 col-span-3 pl-4 text-white text-4xl font-source-code flex flex-col gap-12">
        {#each items as item, i}
            <NavItem selected={selectedIndex === i} onSelect={() => {selectedIndex = i}}>
                <a href="">{item}</a>
            </NavItem>
        {/each}
    </ul>
</nav>
