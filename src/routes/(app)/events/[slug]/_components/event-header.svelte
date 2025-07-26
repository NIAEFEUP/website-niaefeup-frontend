<script lang="ts">
  import Icon from '@/lib/components/icons/icon.svelte';
  import Icons from '@/lib/components/icons/icons';
  import type { Event } from '@/types/event';
  import moment from 'moment';

  import { Button } from '$lib/components/ui/button/index.js';

  export let data: Event;
  let event = data?.event;
  let momentDate = event 
    ? moment.utc(event.dateInterval.startDate, 'DD-MM-YYYY HH:mm').locale('pt') 
    : null;

</script>

<div class="flex flex-col items-center gap-12">
  <div class="flex flex-col md:grid md:gap-12 md:grid-cols-3 w-full">
    <div class="space-y-12 text-white md:col-span-2 mx-auto">
      <h1 class="hidden text-6xl font-bold md:block">
        {event.title}
      </h1>
      <ul class="space-y-4">
        <li class="
          text-xl capitalize w-fit text-center mx-auto
          md:w-full md:text-left md:ml-0
        ">
          {momentDate.format('dddd - HH[h]mm')}
        </li>
        <li class="
          flex items-center gap-2 text-xl font-bold w-fit text-center mx-auto
          md:w-full md:text-left md:ml-0
          ">
          <Icon src={Icons.Calendar} color="white" size="20px" />
          {momentDate.format('LL')}
        </li>
        <li class="
          flex items-center gap-2 text-xl w-fit text-center mx-auto
          md:w-full md:text-left md:ml-0
        ">
          <Icon src={Icons.Location} color="white" size="20px" />
          {event.location}
        </li>
      </ul>
    </div>
    <div class="order-first flex flex-col items-center gap-4 md:order-last">
      <div class="relative w-[250px] aspect-square overflow-hidden rounded-lg">
        <img
          src={event.image}
          alt={data.title}
          class="absolute inset-0 h-full w-full object-cover"
        />
      </div>
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