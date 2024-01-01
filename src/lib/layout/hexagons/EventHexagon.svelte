<script lang="ts">
  import { onMount } from 'svelte';
  import Hexagon from '@/lib/layout/hexagons/Hexagon.svelte';
  import type { Event } from '@/model/Event';

  export let data;
  export const orientation = 'vertical';
  export let event = data as Event;
</script>

<Hexagon orientation="vertical">
  <div
    class="group relative box-content flex h-full w-full justify-center md:shadow-black/[.58] md:text-shadow"
    data-testid="event-hexagon"
  >
    <div class="flex w-fit flex-col content-center justify-center">
      <p
        class="z-20 w-full whitespace-nowrap px-8 text-center text-xs text-gray-100 sm:text-xs md:text-sm lg:text-base xl:text-lg"
      >
        {#if !event.dateInterval.endDate}
          {event.dateInterval.startDate
            .toLocaleString('pt', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })
            .replaceAll(/(de\s)|(\.)/gi, '')}
        {:else}
          {event.dateInterval.startDate
            .toLocaleString('pt', {
              day: 'numeric',
              month: 'short',
              year: '2-digit'
            })
            .replaceAll(/(de\s)|(\.)/gi, '') +
            ' - ' +
            event.dateInterval.endDate
              .toLocaleDateString('pt', {
                day: 'numeric',
                month: 'short',
                year: '2-digit'
              })
              .replaceAll(/(de\s)|(\.)/gi, '')}
        {/if}
      </p>
      <p
        class="z-20 my-1.5 w-full bg-taupe-200 text-center text-sm font-semibold text-rose-950 outline outline-2 outline-offset-2 outline-taupe-200 transition-colors ease-in group-hover:bg-taupe-200 group-hover:text-rose-950 group-hover:outline-taupe-200 group-hover:text-shadow-none sm:bg-transparent sm:text-sm sm:text-gray-100 sm:outline-transparent md:text-base lg:text-lg xl:text-xl"
      >
        {event.title}
      </p>
      <p
        class="z-20 w-full whitespace-nowrap text-center text-xs text-gray-100 transition-all sm:text-xs md:text-sm lg:text-base xl:text-lg"
      >
        {event.location}
      </p>
    </div>
    <div class="absolute inset-0 z-10 h-full w-full bg-vivid-red-950/[.62] text-lg" />
    <img
      src={event.thumbnailPath}
      alt="Event thumbnail"
      class="absolute inset-0 z-0 h-full w-full object-cover"
    />
  </div>
</Hexagon>
