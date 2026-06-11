<script lang="ts">
  import type { PageData } from './$types';
  import HexagonTile from './_components/event-hexagon.svelte';
  import Button from '@/lib/components/buttons/button.svelte';
  import type { Event } from '@/types/event';
  import HexagonGrid from '@/lib/components/hexagons/hexagon-grid.svelte';

  let { data }: { data: PageData } = $props();

  const hasPerms: boolean = $derived(data.hasPerms);
  const events: Event[] = $derived(data.events);

  const MOBILE_BREAKPOINT = 768;
  let windowWidth = $state(0);
  let cols = $derived(windowWidth < MOBILE_BREAKPOINT ? 1 : 4);
</script>

<svelte:window bind:innerWidth={windowWidth} />
<section>
  <div class="flex w-full flex-col items-center">
    <h1 class="my-2 text-center font-source_code text-xl text-white md:my-4 md:text-3xl">
      <span>&lt;</span> <strong>Eventos</strong> <span>/&gt;</span>
    </h1>

    {#if hasPerms}
      <div class="my-8 flex w-5/6 justify-end sm:my-6 md:my-6 lg:mb-12 xl:mb-12 2xl:mb-12">
        <a href="/projects/create">
          <Button color="secondary" hoverColor="red" width="small" text="Novo Evento" />
        </a>
      </div>
    {/if}

    <div class="w-full max-w-7xl px-4 md:px-20 lg:px-32">
      {#if events.length === 0}
        <div class="py-12 text-center">
          <p class="text-gray-400">Nenhum evento encontrado</p>
        </div>
      {:else}
        <HexagonGrid
          items={events}
          {cols}
          orientation="vertical"
          gap="medium"
          component={HexagonTile}
        />
      {/if}
    </div>
  </div>
</section>
