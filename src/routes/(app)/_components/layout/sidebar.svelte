<script lang="ts">
  import SidebarItems from './sidebar-items';
  import NavItem from './nav-item.svelte';
  import BackgroundHexagon from './background-hexagon.svelte';
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';

  let selectedIndex: number | null = null;
  let sidebarClosed = true;
</script>

{#if sidebarClosed}
  <nav
    class="fixed grid h-fit w-full grid-cols-[1fr_4em] grid-rows-1 justify-items-center bg-transparent px-2 py-4 text-white"
  >
    <button
      class="col-start-2 h-fit w-1/2 sm:invisible"
      on:click={() => (sidebarClosed = !sidebarClosed)}
      aria-label="Open sidebar"
    >
      <Icon src={Icons.Bars} color="white" size="31px" />
    </button>
  </nav>
{:else}
  <nav
    class="bg-ni-sidebar absolute grid h-screen w-screen grid-cols-[1fr_4em] grid-rows-[4em_1fr] justify-items-center px-2 py-4 sm:invisible"
  >
    <BackgroundHexagon position="left" />
    <button
      class="col-start-2 h-fit w-1/2 text-white"
      on:click={() => (sidebarClosed = !sidebarClosed)}
    >
      <Icon src={Icons.Close} color="white" size="31px" />
    </button>
    <ul
      class="col-span-2 col-start-1 flex w-full flex-col items-start gap-10 pt-12 font-source_code text-3xl text-white"
    >
      {#each SidebarItems as item, i}
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
