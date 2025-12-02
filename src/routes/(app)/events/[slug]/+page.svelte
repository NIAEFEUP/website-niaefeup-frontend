<script lang="ts">
  import { fade } from 'svelte/transition';
  import Carousel from '../../../../lib/components/gallery/Carousel.svelte';
  import EventEnrollButton from '../_components/event-enroll-button.svelte';
  import HexagonGrid from '../../../../lib/components/hexagons/hexagon-grid.svelte';
  import type { PageData } from './$types';
  import type { Event } from '@/types/event';
  import EditButton from '$lib/components/buttons/edit-button.svelte';
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';
  import TeamMemberHexagon from '@/routes/(app)/team/_components/team-member-hexagon.svelte';

  let { data }: { data: PageData } = $props();

  const event: Event = data.event;
  const hasPerms: boolean = data.hasPerms;

  // Tab state only used for Mobile view
  let activeTab = $state<'evento' | 'equipa'>('evento');

  let screenSizeThreshold = 768;
  let windowWidth: number = $state(0);

  // --- MOCK DATA START ---
  const mockTeamMembers = [
    {
      name: 'Dr. Libby Raynor',
      email: 'cary.mraz@hotmail.com',
      bio: 'Lead organizer and technical supervisor.',
      birthDate: '12-12-1994 14:09',
      photo: 'https://i.pravatar.cc/300?img=1',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      websites: [],
      isActive: true,
      id: 1
    },
    {
      name: 'Brianna Kihn',
      email: 'katelyn.nitzsche@gmail.com',
      birthDate: '10-06-1997 17:45',
      photo: 'https://i.pravatar.cc/300?img=5',
      linkedin: 'https://linkedin.com',
      websites: [],
      isActive: false,
      id: 4
    },
    {
      name: 'Deon Thompson',
      email: 'suzann.balistreri@gmail.com',
      bio: 'Fullstack developer passionate about Svelte.',
      birthDate: '13-03-1983 11:46',
      photo: 'https://i.pravatar.cc/300?img=3',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      websites: [],
      isActive: true,
      id: 5
    },
    {
      name: 'Sarah Jenkins',
      email: 'sarah.j@example.com',
      bio: 'Design lead.',
      birthDate: '01-01-1995 10:00',
      photo: 'https://i.pravatar.cc/300?img=9',
      linkedin: 'https://linkedin.com',
      websites: [],
      isActive: true,
      id: 6
    },
    {
      name: 'Michael Chen',
      email: 'm.chen@example.com',
      bio: 'Backend architect.',
      birthDate: '05-05-1990 12:00',
      photo: 'https://i.pravatar.cc/300?img=11',
      linkedin: 'https://linkedin.com',
      websites: [],
      isActive: true,
      id: 7
    },
    {
      name: 'Jessica Alverez',
      email: 'jess.a@example.com',
      bio: 'Community manager.',
      birthDate: '07-07-1998 09:00',
      photo: 'https://i.pravatar.cc/300?img=24',
      linkedin: 'https://linkedin.com',
      websites: [],
      isActive: true,
      id: 8
    },
    {
      name: 'David Ross',
      email: 'd.ross@example.com',
      bio: 'Logistics coordinator.',
      birthDate: '11-11-1992 16:00',
      photo: 'https://i.pravatar.cc/300?img=13',
      linkedin: 'https://linkedin.com',
      websites: [],
      isActive: true,
      id: 9
    },
    {
      name: 'Emily Blunt',
      email: 'e.blunt@example.com',
      bio: 'Marketing specialist.',
      birthDate: '02-02-1996 14:00',
      photo: 'https://i.pravatar.cc/300?img=32',
      linkedin: 'https://linkedin.com',
      websites: [],
      isActive: true,
      id: 10
    },
    {
      name: 'Tom Hardy',
      email: 't.hardy@example.com',
      bio: 'Security lead.',
      birthDate: '03-03-1985 08:00',
      photo: 'https://i.pravatar.cc/300?img=53',
      linkedin: 'https://linkedin.com',
      websites: [],
      isActive: true,
      id: 11
    },
    {
      name: 'Scarlett Jo',
      email: 's.jo@example.com',
      bio: 'Event Host.',
      birthDate: '04-04-1994 18:00',
      photo: 'https://i.pravatar.cc/300?img=44',
      linkedin: 'https://linkedin.com',
      websites: [],
      isActive: true,
      id: 12
    },
    {
      name: 'Chris Evans',
      email: 'c.evans@example.com',
      bio: 'Volunteer coordinator.',
      birthDate: '06-06-1981 11:00',
      photo: 'https://i.pravatar.cc/300?img=59',
      linkedin: 'https://linkedin.com',
      websites: [],
      isActive: true,
      id: 13
    },
    {
      name: 'Robert Down',
      email: 'r.down@example.com',
      bio: 'Sponsor relations.',
      birthDate: '08-08-1975 13:00',
      photo: 'https://i.pravatar.cc/300?img=68',
      linkedin: 'https://linkedin.com',
      websites: [],
      isActive: true,
      id: 14
    },
    {
      name: 'Mark Ruff',
      email: 'm.ruff@example.com',
      bio: 'Technical support.',
      birthDate: '09-09-1978 15:00',
      photo: 'https://i.pravatar.cc/300?img=12',
      linkedin: 'https://linkedin.com',
      websites: [],
      isActive: true,
      id: 15
    },
    {
      name: 'Chris Hem',
      email: 'c.hem@example.com',
      bio: 'Infrastructure.',
      birthDate: '10-10-1983 17:00',
      photo: 'https://i.pravatar.cc/300?img=8',
      linkedin: 'https://linkedin.com',
      websites: [],
      isActive: true,
      id: 16
    }
  ];
  // --- MOCK DATA END ---

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

  function formatDateExtense(date: Date): string {
    const day = date.getDate().toString();
    let month = new Intl.DateTimeFormat('pt-PT', { month: 'long' }).format(date);
    month = month.toLowerCase();
    const year = date.getFullYear().toString();
    return `<b>${day}</b> de <b>${month}</b> <b>${year}</b>`;
  }

  let parsedEventDate = $derived(parseCustomDate(event?.dateInterval?.startDate));
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
                    <span>{formatWeekdayTime(parsedEventDate)}</span>
                    <span class="flex items-center gap-2">
                      <Icon src={Icons.Calendar} class="mr-1 inline-block" size={18} />
                      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                      {@html formatDateExtense(parsedEventDate)}
                    </span>
                  {:else}
                    <span>Data inválida</span>
                  {/if}
                  <span class="flex items-center gap-2">
                    <Icon src={Icons.Location} class="mr-1 inline-block" size={18} />
                    {event.location}
                  </span>
                </div>
              </div>
            {/if}

            <div class="flex shrink-0 flex-col items-center gap-8">
              <img
                src="https://picsum.photos/200"
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
                  <span>{formatWeekdayTime(parsedEventDate)}</span>
                  <span class="flex min-w-0 flex-nowrap items-center gap-2">
                    <Icon src={Icons.Calendar} class="mr-1 inline-block flex-shrink-0" size={18} />
                    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                    <span class="block break-words">{@html formatDateExtense(parsedEventDate)}</span
                    >
                  </span>
                {:else}
                  <span>Data inválida</span>
                {/if}
                <span class="flex min-w-0 flex-nowrap items-center gap-2">
                  <Icon src={Icons.Location} class="mr-1 inline-block flex-shrink-0" size={18} />
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
              <Carousel photos={event.photos} />
            </div>
          </div>
        {:else if activeTab === 'equipa'}
          <div
            class="mt-4 flex justify-center"
            in:fade={{ duration: 300, delay: 300 }}
            out:fade={{ duration: 300 }}
          >
            <HexagonGrid
              items={mockTeamMembers}
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
        <Carousel photos={event.photos} />
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
          items={mockTeamMembers}
          cols={5}
          gap="small"
          orientation="horizontal"
          component={TeamMemberHexagon}
        />
      </div>
    {/if}
  </section>
{:else}
  <p>Loading project details...</p>
{/if}
