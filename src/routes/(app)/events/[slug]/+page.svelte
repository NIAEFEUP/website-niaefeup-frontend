<script lang="ts">
  import { fade } from 'svelte/transition';
  import EventEnrollButton from '../_components/event-enroll-button.svelte';
  import type { PageData } from './$types';
  import Carousel from '$lib/components/gallery/Carousel.svelte';
  import HexagonGrid from '$lib/components/hexagons/hexagon-grid.svelte';
  import type { Event } from '@/types/event';
  import EditButton from '$lib/components/buttons/edit-button.svelte';
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';
  import TeamMemberHexagon from '@/routes/(app)/team/_components/team-member-hexagon.svelte';

  let { data }: { data: PageData } = $props();

  let event: Event = $derived(data.event);
  let hasPerms: boolean = $derived(data.hasPerms);

  let activeTab = $state<'evento' | 'equipa'>('evento');

  let screenSizeThreshold = 768;
  let windowWidth: number = $state(0);

  function parseCustomDate(dateStr: string): Date | null {
    if (!dateStr) return null;
    const match = dateStr.match(/(\d{2})-(\d{2})-(\d{4})[ T](\d{2})[:](\d{2})/);
    if (!match) return null;
    const [, day, month, year, hour, minute] = match;
    return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
  }

  function formatWeekdayTime(date: Date): string {
    let weekday = new Intl.DateTimeFormat('pt-PT', { weekday: 'long' }).format(date);
    weekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    return `${weekday} - ${hour}h${minute}`;
  }

  function formatDateExtense(date: Date) {
    const day = date.getDate().toString();
    let month = new Intl.DateTimeFormat('pt-PT', { month: 'long' }).format(date);
    month = month.toLowerCase();
    const year = date.getFullYear().toString();
    return { day, month, year };
  }

  let parsedEventDate = $derived(
    typeof event?.dateInterval?.startDate === 'string'
      ? parseCustomDate(event.dateInterval.startDate)
      : null
  );
</script>

<svelte:window bind:innerWidth={windowWidth} />
{#if event}
  <section class="mx-9 min-h-screen pt-4 md:mx-32 md:pt-16 lg:mx-56">
    {#if windowWidth < screenSizeThreshold}
      <div class="flex flex-col items-center">
        <p
          class="mb-6 text-center font-source_code text-2xl font-bold text-white md:text-3xl lg:text-4xl xl:text-5xl"
        >
          &lt; {event.title} /&gt;
        </p>
      </div>

      <div class="mb-6 flex justify-center">
        <div class="relative flex w-fit rounded-2xl bg-transparent">
          <div
            class="absolute inset-y-0 left-0 w-1/2 rounded-3xl bg-rose-200/30 transition-all duration-300 ease-in-out"
            class:translate-x-full={activeTab === 'equipa'}
            class:translate-x-0={activeTab === 'evento'}
          ></div>

          <button
            class="z-10 w-36 py-1 transition-colors duration-300
            {activeTab === 'evento' ? 'font-bold text-white' : 'text-gray-400 hover:text-white'}"
            onclick={() => (activeTab = 'evento')}
          >
            Evento
          </button>
          <button
            class="z-10 w-36 py-1 transition-colors duration-300
            {activeTab === 'equipa' ? 'font-bold text-white' : 'text-gray-400 hover:text-white'}"
            onclick={() => (activeTab = 'equipa')}
          >
            Equipa
          </button>
        </div>
      </div>
    {/if}

    {#if hasPerms}
      <div class="my-4 flex justify-end md:my-8 md:w-5/6">
        <EditButton size="small" link="/events/{event.slug}/edit" />
      </div>
    {/if}

    {#if windowWidth >= screenSizeThreshold || activeTab === 'evento'}
      <header class="flex flex-row justify-center gap-6" transition:fade={{ duration: 300 }}>
        <div class="flex flex-col gap-16">
          <div class="my-auto flex flex-row items-stretch">
            {#if windowWidth > screenSizeThreshold}
              <div class="mr-6 flex flex-col justify-center gap-8">
                <h1
                  class="mb-4 pr-8 text-2xl font-bold text-white md:text-3xl lg:pr-16 lg:text-5xl"
                >
                  {event.title}
                </h1>
                <div class="flex flex-1 flex-col justify-start gap-3 text-lg">
                  {#if parsedEventDate}
                    {@const d = formatDateExtense(parsedEventDate)}
                    <span>{formatWeekdayTime(parsedEventDate)}</span>
                    <span class="flex items-center gap-2">
                      <Icon src={Icons.Calendar} size="18" />
                      <span>
                        <b>{d.day}</b> de <b>{d.month}</b> <b>{d.year}</b>
                      </span>
                    </span>
                  {:else}
                    <span>Data inválida</span>
                  {/if}
                  <span class="flex items-center gap-2">
                    <Icon src={Icons.Location} size="18" />
                    {event.location}
                  </span>
                </div>
              </div>
            {/if}

            <div class="flex shrink-0 flex-col items-center gap-8">
              <img
                src={event.image}
                alt="{event.title}'s image"
                class="aspect-square h-36 w-36 rounded-xl object-cover md:h-60 md:w-60"
              />

              <div class="hidden md:block">
                <EventEnrollButton
                  registerUrl={event.registerUrl}
                  onClick={() => {
                    if (event.registerUrl) window.open(event.registerUrl, '_blank');
                  }}
                />
              </div>
            </div>

            {#if windowWidth < screenSizeThreshold}
              <div class="ml-4 flex flex-1 flex-col justify-start gap-3 text-sm">
                {#if parsedEventDate}
                  {@const d = formatDateExtense(parsedEventDate)}
                  <span>{formatWeekdayTime(parsedEventDate)}</span>
                  <span class="flex min-w-0 flex-nowrap items-center gap-2">
                    <Icon src={Icons.Calendar} size="18" />
                    <span class="block break-words">
                      <b>{d.day}</b> de <b>{d.month}</b> <b>{d.year}</b>
                    </span>
                  </span>
                {:else}
                  <span>Data inválida</span>
                {/if}
                <span class="flex min-w-0 flex-nowrap items-center gap-2">
                  <Icon src={Icons.Location} size="18" />
                  <span class="block break-words">{event.location}</span>
                </span>
              </div>
            {/if}
          </div>

          <div class="mx-auto block w-fit md:hidden">
            <EventEnrollButton
              registerUrl={event.registerUrl}
              onClick={() => {
                if (event.registerUrl) window.open(event.registerUrl, '_blank');
              }}
            />
          </div>
        </div>
      </header>
    {/if}

    {#if windowWidth < screenSizeThreshold}
      <div class="mt-8">
        {#if activeTab === 'evento'}
          <div in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 300 }}>
            <div class="my-12 text-justify text-lg font-medium">
              <span>{event.description}</span>
            </div>
            <div class="mt-16 flex justify-center">
              <Carousel photos={event.gallery} />
            </div>
          </div>
        {:else if activeTab === 'equipa'}
          <div
            class="mt-4 flex justify-center"
            in:fade={{ duration: 300, delay: 300 }}
            out:fade={{ duration: 300 }}
          >
            <HexagonGrid
              items={event.teamMembers || []}
              cols={2}
              gap="small"
              orientation="horizontal"
              component={TeamMemberHexagon}
            />
          </div>
        {/if}
      </div>
    {:else}
      <div class="mt-16 flex justify-center">
        <Carousel photos={event.gallery} />
      </div>

      <div class="my-12 text-justify text-xl font-medium">
        <span>{event.description}</span>
      </div>

      <div class="mt-12">
        <div class="flex flex-col items-center">
          <p
            class="mb-12 text-center font-source_code text-xl font-bold text-white md:text-2xl lg:text-3xl xl:text-4xl"
          >
            &lt; Equipa /&gt;
          </p>
        </div>
        <HexagonGrid
          items={event.teamMembers || []}
          cols={5}
          gap="small"
          orientation="horizontal"
          component={TeamMemberHexagon}
        />
      </div>
    {/if}
  </section>
{:else}
  <p>Loading event details...</p>
{/if}
