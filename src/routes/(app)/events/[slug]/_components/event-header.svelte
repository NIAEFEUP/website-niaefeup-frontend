<script lang="ts">
  import Icon from '@/lib/components/icons/icon.svelte';
  import Icons from '@/lib/components/icons/icons';
  import type { Event } from '@/types/event';
  import { format } from 'date-fns';
  import { pt } from 'date-fns/locale';

  import { Button } from '$lib/components/ui/button/index.js';

  export let data: Event;
  let date = new Date(data.dateInterval.startDate);
  let weekday = format(date, 'EEEE', { locale: pt });
  let time = format(date, "HH'h'mm");
</script>

<div class="grid gap-12 md:grid-cols-3">
  <div class="space-y-12 text-white md:col-span-2">
    <h1 class="text-6xl font-bold">{data.title}</h1>
    <ul class="space-y-4">
      <li class="text-xl capitalize">{weekday} - {time}</li>
      <li class="flex items-center gap-2 text-xl font-bold">
        <Icon
          src={Icons.Calendar}
          color="white"
          size="20px"
          href="https://www.instagram.com/niaefeup/"
          ariaLabel="Instagram"
        />
        {format(date, 'd MMMM yyyy', { locale: pt })}
      </li>
      <li class="flex w-full items-center gap-2 text-xl">
        <Icon
          src={Icons.Location}
          color="white"
          size="20px"
          href="https://www.instagram.com/niaefeup/"
          ariaLabel="Instagram"
        />
        {data.location}
      </li>
    </ul>
  </div>
  <div class="flex flex-col items-center gap-4">
    <img src={data.image} width="250" height="250" alt={data.title} />
    <Button class="bg-primary/50 border border-white px-12 py-6 font-bold uppercase"
      >Inscrever</Button
    >
  </div>
</div>
