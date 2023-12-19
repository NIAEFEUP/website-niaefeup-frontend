<script lang="ts">
    import Hexagon from '@/lib/layout/hexagons/Hexagon.svelte';
    import type { Event } from '@/model/Event';
  
    export let event: Event;
  </script>
  
  <Hexagon orientation="vertical">
    <div
      class="group relative flex h-full w-full flex-col content-center justify-center"
      data-testid="event-hexagon"
    >
      <p
        class="xs:text-[0.5em] z-20 whitespace-nowrap text-center text-xs text-gray-100 sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl"
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
        class="xs:text-xs outline-light group-hover:bg-light group-hover:text-darkText z-20 my-1.5 w-full px-8 text-center text-xs font-semibold text-gray-100 outline-2 outline-offset-2 transition-colors ease-in group-hover:outline sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
      >
        {event.title}
      </p>
  
      <p
        class="xs:text-[0.5em] z-20 whitespace-nowrap text-center text-xs text-gray-100 transition-all sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl"
      >
        {event.location}
      </p>
  
      <div class="bg-quaternary60 absolute inset-0 z-10 text-lg" />
      <img
        src={event.thumbnailPath}
        alt="Event thumbnail"
        class="absolute inset-0 z-0 h-full w-full object-cover"
      />
    </div></Hexagon
  >
  