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

    // DD-MM-YYYY HH:mm
    const match = d.match(/^(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})$/);
    if (match) {
      const [, day, month, year, hour, minute] = match;
      return new Date(`${year}-${month}-${day}T${hour}:${minute}`);
    }

    // Fallback for other formats
    return new Date(d.replace(' ', 'T'));
  };

  const formatDate = (date: Date, options: Intl.DateTimeFormatOptions): string => {
    return date.toLocaleDateString('pt', options).replaceAll(/(de\s)|(\.)/gi, '');
  };

  const getDateDisplay = (): string => {
    const start = parseDate(event.dateInterval.startDate);
    const end = parseDate(event.dateInterval.endDate);

    const startFormatted = formatDate(start, {
      day: 'numeric',
      month: 'short',
      year: '2-digit'
    });
    const endFormatted = formatDate(end, {
      day: 'numeric',
      month: 'short',
      year: '2-digit'
    });

    return `${startFormatted} - ${endFormatted}`;
  };
</script>

<Hexagon {orientation}>
  <div
    class="group relative box-content flex h-full w-full justify-center md:shadow-black/[.58] md:text-shadow"
    data-testid="event-hexagon"
  >
    <div class="flex w-fit flex-col content-center justify-center">
      <p
        class="z-20 w-full whitespace-nowrap px-8 text-center text-xs text-gray-100 sm:text-xs md:text-sm lg:text-base xl:text-lg"
      >
        {getDateDisplay()}
      </p>
      <p
        class="z-20 my-1.5 w-full text-wrap bg-taupe-200 text-center text-sm font-semibold text-rose-950 outline outline-2 outline-offset-2 outline-taupe-200 transition-colors ease-in group-hover:bg-taupe-200 group-hover:text-rose-950 group-hover:outline-taupe-200 group-hover:text-shadow-none sm:bg-transparent sm:text-sm sm:text-gray-100 sm:outline-transparent md:text-base lg:text-lg xl:text-xl
        "
      >
        {event.title}
      </p>
      <p
        class="z-20 w-full whitespace-nowrap text-center text-xs text-gray-100 transition-all sm:text-xs md:text-sm lg:text-base xl:text-lg"
      >
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
