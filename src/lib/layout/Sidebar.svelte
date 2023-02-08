<script lang="ts">
    import NavItem from "$lib/navbar/NavItem.svelte";
    import FaBars from 'svelte-icons/fa/FaBars.svelte'
    import FaTimes from 'svelte-icons/fa/FaTimes.svelte';

    let selectedIndex: number | null = null;

    const items = [
        "Início",
        "Eventos",
        "Projetos",
        "Equipa",
        "Contactos",
    ];

    let sidebarOpen = false;
</script>

{#if !sidebarOpen}
    <nav class="fixed bg-transperent text-white w-full grid grid-cols-[1fr_4em] grid-rows-[4em_1fr] justify-items-center py-2 px-2 h-screen">
        <button class="w-1/2 col-start-2 sm:invisible" on:click={() => sidebarOpen = !sidebarOpen}>
            <FaBars />
        </button>
    </nav>
{:else}
    <nav class="bg-ni-sidebar grid grid-cols-[1fr_4em] grid-rows-[4em_1fr] justify-items-center sm:invisible py-2 px-2 absolute w-screen h-screen">
        <img alt="NIAEFEUP hexagon logo" class="fixed h-full overflow-hidden -left-24 pt-24 pb-40" src="/images/outline_white_180.png">
        <button class="text-white w-1/2 col-start-2" on:click={() => sidebarOpen = !sidebarOpen}>
            <FaTimes  />
        </button>
        <ul class="flex flex-col pt-12 items-start gap-10 text-white text-3xl font-source-code w-full col-start-1 col-span-2">
            {#each items as item, i}
            <NavItem selected={selectedIndex === i}>
                <a href="" on:click={() => {selectedIndex = i}}>{item}</a>
            </NavItem>
            {/each}
        </ul>
    </nav>
{/if}
