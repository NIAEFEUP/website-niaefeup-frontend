<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import Button from '@/lib/components/error-page/Button.svelte';
  import Icon from '@/lib/icons/Icon.svelte';
  import Icons from '@/lib/icons/Icons';
  import type { Event } from '@/model/Event';
  import { format } from 'date-fns';
  import { pt } from 'date-fns/locale';
  import moment from 'moment';

  export let data: Event;
  let date = new Date(data.dateInterval.startDate);
</script>

<div class="container my-32 grid max-w-screen-lg grid-cols-3 ">
  <div class="col-span-2 space-y-12 text-white">
    <h1 class="text-6xl font-bold ">{data.title}</h1>
    <ul class="space-y-4">
      <li class="text-xl">{moment.utc(date).locale('pt').format('dddd - HH:mm')}</li>
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
        {data.location}
      </li>
    </ul>
  </div>
  <div class="flex flex-col items-center gap-4">
    <img src={data.image} width="250" height="250" alt={data.title} />
    <Button type="submit" hoverColor="secondary" text="Teste" color="secondary" width="medium" />
  </div>
  <Card.Root>
    <Card.Header>
      <Card.Title>Card Title</Card.Title>
      <Card.Description>Card Description</Card.Description>
    </Card.Header>
    <Card.Content>
      <p>Card Content</p>
    </Card.Content>
    <Card.Footer>
      <p>Card Footer</p>
    </Card.Footer>
  </Card.Root>
</div>
