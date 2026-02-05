<script lang="ts">
  import type { PageData } from './$types';
  import HexagonTile from './_components/event-hexagon.svelte';
  import Button from '@/lib/components/buttons/button.svelte';
  import type { Event } from '@/types/event';
  import HexagonGrid from '@/lib/components/hexagons/hexagon-grid.svelte';

  let { data }: { data: PageData } = $props();

  const hasPerms: boolean = data.hasPerms;

  const events: Event[] = data.events;
</script>

<section>
  <div class="flex w-full flex-col items-center">
    <h1 class="my-2 text-center font-source_code text-xl text-white md:my-4 md:text-3xl">
      &lt&nbsp<strong>Eventos</strong>&nbsp/&gt
    </h1>
    {#if hasPerms}
      <div class="my-8 flex w-5/6 justify-end sm:my-6 md:my-6 lg:mb-12 xl:mb-12 2xl:mb-12">
        <a href="/projects/create">
          <Button color="secondary" hoverColor="red" width="small" text="Novo Evento"></Button>
        </a>
      </div>
    {/if}

    <div class="w-full max-w-7xl px-4 md:px-20 lg:px-32">
      <HexagonGrid
        items={events}
        cols={4}
        orientation="vertical"
        gap="medium"
        component={HexagonTile}
      />
    </div>
  </div>
</section>
