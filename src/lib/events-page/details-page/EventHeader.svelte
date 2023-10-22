<script lang="ts">
  import Icon from '$lib/component/Icon.svelte';
  import Icons from '$lib/component/Icons';
  import Button from '@/lib/error-page/Button.svelte';
  import type { Event } from '@/model/Event';

  export let data: Event;
  let date = data.dateInterval.startDate;

  function getWeekday() {
    const dateParts = date.split('-');
    const year = parseInt(dateParts[2]);
    const month = parseInt(dateParts[1]) - 1;
    const day = parseInt(dateParts[0]);
    const parsedDate = new Date(year, month, day);
    const weekdays = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado'
    ];
    return weekdays[parsedDate.getDay()];
  }

  function getMonthName(month) {
    const months = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro'
    ];
    return months[month - 1];
  }

  function formatDate() {
    const dateParts = date.split('-');
    const day = dateParts[0];
    const month = getMonthName(parseInt(dateParts[1]));
    const year = dateParts[2];
    return `${day} de ${month} ${year}`;
  }
</script>

<div class="container my-20 grid grid-cols-3 ">
  <div class="col-span-2 space-y-12 text-white">
    <h1 class="text-6xl font-bold ">{data.title}</h1>
    <ul class="space-y-4">
      <li class="text-xl">{getWeekday()} - 14:30</li>
      <li class="flex items-center gap-2 text-xl font-bold">
        <Icon
          src={Icons.Calendar}
          color="white"
          size="20px"
          href="https://www.instagram.com/niaefeup/"
          ariaLabel="Instagram"
        />
        {formatDate()}
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
    <Button type="submit" hoverColor="secondary" text="Teste" color="primary" width="medium" />
  </div>
</div>
