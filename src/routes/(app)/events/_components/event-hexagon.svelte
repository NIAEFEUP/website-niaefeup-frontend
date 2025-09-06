<script lang="ts">
  import Hexagon from '@/lib/components/hexagons/hexagon.svelte';
  import type { Event } from '@/types/event.ts';

  export const orientation = 'vertical';
  let { data, event = data as Event } = $props();
</script>

<Hexagon orientation="vertical">
  <div
    class="group md:text-shadow relative box-content flex h-full w-full justify-center md:shadow-black/[.58]"
    data-testid="event-hexagon"
  >
    <div class="flex w-fit flex-col content-center justify-center">
      <p
        class="z-20 w-full px-8 text-center text-xs whitespace-nowrap text-gray-100 sm:text-xs md:text-sm lg:text-base xl:text-lg"
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
        class="bg-taupe-200 outline-taupe-200 group-hover:bg-taupe-200 group-hover:outline-taupe-200 z-20 my-1.5 w-full text-center text-sm font-semibold text-rose-950 outline-2 outline-offset-2 transition-colors ease-in outline-solid group-hover:text-rose-950 group-hover:text-shadow-none sm:bg-transparent sm:text-sm sm:text-gray-100 sm:outline-transparent md:text-base lg:text-lg xl:text-xl"
      >
        {event.title}
      </p>
      <p
        class="z-20 w-full text-center text-xs whitespace-nowrap text-gray-100 transition-all sm:text-xs md:text-sm lg:text-base xl:text-lg"
      >
        {event.location}
      </p>
    </div>
    <div class="bg-vivid-red-950/62 absolute inset-0 z-10 h-full w-full text-lg"></div>
    <img
      src={event.thumbnailPath}
      alt="Event thumbnail"
      class="absolute inset-0 z-0 h-full w-full object-cover"
    />
  </div>
</Hexagon>
