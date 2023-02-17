<script lang="ts">
  import NavItem from '$lib/navbar/NavItem.svelte';
  import BackgroundHexagon from '$lib/layout/BackgroundHexagon.svelte';
  import Icon from '$lib/component/Icon.svelte';
  import Icons from '$lib/component/Icons';

  let selectedIndex: number | null = null;

  const items = ['Início', 'Eventos', 'Projetos', 'Equipa', 'Contactos'];

  let sidebarClosed = true;
</script>

{#if sidebarClosed}
  <nav
    class="fixed bg-transperent text-white w-full grid grid-cols-[1fr_4em] grid-rows-[4em_1fr] justify-items-center py-2 px-2 h-screen"
  >
    <button
      class="w-1/2 col-start-2 sm:invisible"
      on:click={() => (sidebarClosed = !sidebarClosed)}
    >
      <Icon src={Icons.Bars} color="#411315" size="31px" href={undefined} />
    </button>
  </nav>
{:else}
  <nav
    class="bg-ni-sidebar grid grid-cols-[1fr_4em] grid-rows-[4em_1fr] justify-items-center sm:invisible py-2 px-2 absolute w-screen h-screen"
  >
    <BackgroundHexagon position="left" />
    <button class="text-white w-1/2 col-start-2" on:click={() => (sidebarClosed = !sidebarClosed)}>
      <Icon src={Icons.Times} color="white" size="31px" href={undefined} />
    </button>
    <ul
      class="flex flex-col pt-12 items-start gap-10 text-white text-3xl font-source-code w-full col-start-1 col-span-2"
    >
      {#each items as item, i}
        <NavItem selected={selectedIndex === i}>
          <a
            href="#/"
            on:click={() => {
              selectedIndex = i;
            }}>{item}</a
          >
        </NavItem>
      {/each}
    </ul>
  </nav>
{/if}
