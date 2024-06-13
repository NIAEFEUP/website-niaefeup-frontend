<script lang="ts">
  import Button from '@/lib/components/button.svelte';
  import Icon from '@/lib/components/icons/icon.svelte';
  import Icons from '@/lib/components/icons/icons';
  import type { Event } from '@/types/event';
  import { format } from 'date-fns';
  import { pt } from 'date-fns/locale';

  export let data: Event;
  let date = new Date(data.dateInterval.startDate);
</script>

<div class="container mx-auto my-32 grid max-w-screen-lg grid-cols-3">
  <div class="col-span-2 space-y-12 text-white">
    <h1 class="text-6xl font-bold">{data.title}</h1>
    <ul class="space-y-4">
      <!-- <li class="text-xl">{moment.utc(date).locale('pt').format('dddd - HH:mm')}</li> -->
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
      <li class="flex items-center gap-2 text-xl">
        <Icon
          src={Icons.Location}
          color="white"
          size="20px"
          href="https://www.instagram.com/niaefeup/"
          ariaLabel="Instagram"
        />
        <!-- {data.location} -->
      </li>
    </ul>
  </div>
  <div class="flex flex-col items-center gap-4">
    <img src={data.image} width="250" height="250" alt={data.title} />
    <Button type="submit" hoverColor="secondary" text="Teste" color="secondary" width="medium" />
  </div>
</div>
