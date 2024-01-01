<script lang="ts">
  import Hexagon from '@/lib/layout/hexagons/Hexagon.svelte';
  import type { Event } from '@/model/Event';

  export let data;
  export const orientation = 'vertical';
  export let event = data as Event;
</script>

<Hexagon orientation="vertical">
  <div
    class="group relative flex justify-center h-full w-full shadow-black/[.58] text-shadow box-content"
    data-testid="event-hexagon"
  >
    <div class="flex flex-col w-fit content-center justify-center">
      <p
        class="xs:text-[0.5em] px-6 z-20 w-full whitespace-nowrap text-center text-xs text-gray-100 sm:text-sm md:text-base lg:text-lg xl:text-xl"
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
        class="xs:text-xs z-20 my-1.5 w-full text-center text-xs font-semibold text-gray-100 outline-2 outline-offset-2 outline-taupe-200 transition-colors ease-in group-hover:bg-taupe-200 group-hover:text-rose-950 group-hover:outline group-hover:text-shadow-none sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
      >
        {event.title}
      </p>
      <p
        class="xs:text-[0.5em] z-20 w-full whitespace-nowrap text-center text-xs text-gray-100 transition-all sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl"
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
