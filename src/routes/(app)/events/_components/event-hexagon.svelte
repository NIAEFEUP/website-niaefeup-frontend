<script lang="ts">
  import Hexagon from '@/lib/components/hexagons/hexagon.svelte';
  import type { Event } from '@/types/event.ts';

  interface Props {
    data: Event;
    orientation?: 'horizontal' | 'vertical';
  }

  let { data: event, orientation = 'vertical' }: Props = $props();

  const parseDate = (d: string | Date): Date => {
    if (d instanceof Date) return d;
    const match = d.match(/^(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})$/);
    if (match) {
      const [, day, month, year, hour, minute] = match;
      return new Date(`${year}-${month}-${day}T${hour}:${minute}`);
    }
    return new Date(d.replace(' ', 'T'));
  };

  const getDateDisplay = (): string => {
    const start = parseDate(event.dateInterval.startDate);
    const end = parseDate(event.dateInterval.endDate);

    const fmt = (d: Date) =>
      d.toLocaleDateString('pt', { day: 'numeric', month: 'short' })
       .replace(/\./g, '')
       .replace(/ de /g, ' ');

    return `${fmt(start)} – ${fmt(end)}`;
  };
</script>

<Hexagon {orientation}>
  <div
    class="group relative box-content flex h-full w-full justify-center md:shadow-black/[.58] md:text-shadow"
    data-testid="event-hexagon"
  >
  <div class="flex w-full flex-col content-center justify-center">

  <p class="z-20 w-full max-w-[80%] mx-auto whitespace-nowrap text-center text-xs text-gray-100 sm:text-xs md:text-sm lg:text-base xl:text-lg overflow-hidden text-ellipsis">
    {getDateDisplay()}
  </p>

  <p class="z-20 my-1.5 w-full text-center text-sm font-semibold bg-taupe-200 text-rose-950 outline outline-2 outline-offset-2 outline-taupe-200 transition-colors ease-in group-hover:bg-taupe-200 group-hover:text-rose-950 group-hover:outline-taupe-200 group-hover:text-shadow-none sm:bg-transparent sm:text-sm sm:text-gray-100 sm:outline-transparent md:text-base lg:text-lg xl:text-xl break-words overflow-hidden">
    {event.title}
  </p>

  <p class="z-20 w-full max-w-[80%] mx-auto text-center text-xs text-gray-100 truncate" title={event.location}>
    {event.location}
  </p>
</div>
    <div class="absolute inset-0 z-10 h-full w-full bg-vivid-red-950/[.62] text-lg"></div>
    <img
      src={event.image}
      alt="Event thumbnail"
      class="absolute inset-0 z-0 h-full w-full object-cover"
    />
  </div>
</Hexagon>

