<script lang="ts">
  import SidebarItems from './SidebarItems';
  import NavItem from '$lib/navbar/NavItem.svelte';
  import BackgroundHexagon from '$lib/layout/BackgroundHexagon.svelte';
  import Icon from '$lib/component/Icon.svelte';
  import Icons from '$lib/component/Icons';

  let selectedIndex: number | null = null;
  let sidebarClosed = true;
</script>

{#if sidebarClosed}
  <nav
    class="fixed grid h-fit w-full grid-cols-[1fr_4em] grid-rows-1 justify-items-center bg-transparent py-4 px-2 text-white"
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
    class="bg-ni-sidebar absolute grid h-screen w-screen grid-cols-[1fr_4em] grid-rows-[4em_1fr] justify-items-center py-4 px-2 sm:invisible"
  >
    <BackgroundHexagon position="left" />
    <button
      class="col-start-2 h-fit w-1/2 text-white"
      on:click={() => (sidebarClosed = !sidebarClosed)}
    >
      <Icon src={Icons.Times} color="white" size="31px" />
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
