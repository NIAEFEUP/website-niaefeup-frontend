<script lang="ts">
  import Icon from '@/lib/components/icons/icon.svelte';
  import Icons from '@/lib/components/icons/icons';
  import type { Event } from '@/types/event';
  import moment from 'moment';

  import { Button } from '$lib/components/ui/button/index.js';

  export let data: Event;
  let event = data.event;
  let momentDate = moment.utc(event.dateInterval.startDate, 'DD-MM-YYYY HH:mm').locale('pt');
  let eventImage = 'https://picsum.photos/500/500';
</script>

<div class="flex flex-col items-center gap-12">
  <div class="grid grid-cols-2 gap-12 md:grid-cols-3">
    <div class="space-y-12 text-white md:col-span-2">
      <h1 class="hidden text-6xl font-bold md:block">{event.title}</h1>
      <ul class="space-y-4">
        <li class="text-xl capitalize">{momentDate.format('dddd - HH[h]mm')}</li>
        <li class="flex items-center gap-2 text-xl font-bold">
          <Icon src={Icons.Calendar} color="white" size="20px" />
          {momentDate.format('LL')}
        </li>
        <li class="flex w-full items-center gap-2 text-xl">
          <Icon src={Icons.Location} color="white" size="20px" />
          {event.location}
        </li>
      </ul>
    </div>
    <div class="order-first flex flex-col items-center gap-4 md:order-last">
      <img class="rounded-lg" src={eventImage} width="250" height="250" alt={data.title} />
      <Button
        class="hidden border border-white bg-primary/50 px-12 py-6 font-bold uppercase md:flex"
        href={event.registerUrl}
      >
        Inscrever
      </Button>
    </div>
  </div>
  <Button
    class="w-fit border border-white bg-primary/50 px-12 py-6 font-bold uppercase md:hidden"
    href={event.registerUrl}
  >
    Inscrever
  </Button>
</div>
