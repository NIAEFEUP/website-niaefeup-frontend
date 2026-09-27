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
    if (!event.dateInterval?.startDate || !event.dateInterval?.endDate) return '';
    if (event.dateInterval.startDate === 'TBD') return '';
    const start = parseDate(event.dateInterval.startDate);
    const end = parseDate(event.dateInterval.endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return '';

    const fmt = (d: Date) =>
      d
        .toLocaleDateString('pt', { day: 'numeric', month: 'short' })
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
      {#if getDateDisplay()}
        <p
          class="z-20 mx-auto w-full max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap text-center text-xs text-gray-100 sm:text-xs md:text-sm lg:text-base xl:text-lg"
        >
          {getDateDisplay()}
        </p>
      {/if}

      <div class="relative z-20 my-1.5 w-full">
        <span
          aria-hidden="true"
          class="pointer-events-none absolute -inset-1 border-2 border-taupe-200 transition-colors ease-in sm:border-transparent sm:group-hover:border-taupe-200"
        ></span>
        <p
          class="relative overflow-hidden break-words bg-taupe-200 text-center text-sm font-semibold text-rose-950 transition-colors ease-in sm:bg-transparent sm:text-sm sm:text-gray-100 sm:group-hover:bg-taupe-200 sm:group-hover:text-rose-950 sm:group-hover:text-shadow-none md:text-base lg:text-lg xl:text-xl"
        >
          {event.title}
        </p>
      </div>

      {#if event.location}
        <p
          class="z-20 mx-auto w-full max-w-[80%] truncate text-center text-xs text-gray-100"
          title={event.location}
        >
          {event.location}
        </p>
      {/if}
    </div>
    <div class="absolute inset-0 z-10 h-full w-full bg-vivid-red-950/62 text-lg"></div>
    <img
      src={event.image || '/images/ni_logo.png'}
      alt="Miniatura do evento"
      class="absolute inset-0 z-0 h-full w-full object-cover"
    />
  </div>
</Hexagon>
