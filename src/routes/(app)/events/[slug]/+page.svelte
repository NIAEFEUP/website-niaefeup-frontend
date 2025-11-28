<script lang="ts">
  import type { PageData } from './$types';
  import type { Event } from '@/types/event';
  import EditButton from '$lib/components/buttons/edit-button.svelte';
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';

  let { data }: { data: PageData } = $props();

  const event: Event = data.event;
  const hasPerms: boolean = data.hasPerms;

  let screenSizeThreshold = 768;
  let windowWidth: number = $state(0);
</script>

<svelte:window bind:innerWidth={windowWidth} />

{#if event}
  <section class="mx-9 min-h-screen pt-12 md:mx-32 md:pt-32 lg:mx-64">
    {#if hasPerms}
      <div class="my-4 flex justify-end md:my-8 md:w-5/6">
        <EditButton size="small" link="/events/{event.slug}/edit" />
      </div>
    {/if}
    <header class="flex flex-row justify-center gap-6">
      <div class="my-auto flex flex-row items-center md:items-start">
        <h1 class="mb-4 text-2xl font-semibold text-white md:text-4xl">{event.title}</h1>
        <!-- src={event.image} -->
        <img
          src="https://picsum.photos/200"
          alt="{event.title}'s image"
          class="aspect-square w-36 rounded-xl md:w-60"
        />
      </div>
    </header>

    <div class="mt-14 text-center md:mt-28">
      <strong class="text-4xl text-white">{event.slogan}</strong>
    </div>

    {#if event.links && event.links.length > 0}
      <ul class="mt-16 flex flex-wrap justify-center gap-10">
        {#each event.links as link (link.url)}
          <li>
            <a
              href={link.url}
              class="flex h-20 w-60 items-center justify-center overflow-hidden rounded-xl text-white md:h-28 md:w-56"
            >
              <img
                src={link.iconPath}
                alt="{event.title}'s custom website"
                class="object-cover md:h-28 md:w-56"
              />
            </a>
          </li>
        {/each}
      </ul>
    {/if}

    <div class="mt-20 flex flex-col items-center justify-center gap-4 md:flex-row">
      <img class="w-max-xl w-1/3" src={event.thumbnail} alt="{event.title}'s thumbnail" />
      {#if windowWidth < screenSizeThreshold}
        <p class="mt-4 w-5/6 text-left text-3xl font-bold">tem por objetivo...</p>
      {/if}
      <p class="w-5/6 max-w-xl text-right text-2xl text-gray-100 md:w-1/3 md:text-4xl">
        {event.description}
      </p>
    </div>

    <div class="mt-24 flex flex-col justify-evenly md:flex-row">
      {#if event.technologies && event.technologies.length > 0}
        <div class="flex flex-col items-center md:w-1/3">
          <p
            class="mb-6 font-source_code text-2xl font-bold text-white md:text-3xl lg:text-4xl xl:text-5xl"
          >
            &lt; Tecnologias /&gt;
          </p>
          <div class="mb-12 mt-6 flex flex-wrap justify-center gap-4 md:gap-8">
            {#each event.technologies as technology (technology.url)}
              <a
                href={technology.url}
                target="_blank"
                class="flex h-20 w-20 content-center items-center gap-4 rounded-full bg-white/20 px-4 py-4 md:w-64 md:px-8"
              >
                <img
                  src={technology.image}
                  alt="Technology {technology.name}'s logo"
                  class="max-h-12"
                />
                {#if windowWidth > screenSizeThreshold}
                  <p class="text-xl text-white">{technology.name}</p>
                {/if}
              </a>
            {/each}
          </div>
        </div>
      {/if}
      <div
        class="flex flex-col items-center {event.technologies && event.technologies.length > 0
          ? 'md:w-1/3'
          : 'md:w-full md:justify-center'}"
      >
        <p
          class="mb-6 font-source_code text-2xl font-bold text-white md:text-3xl lg:text-4xl xl:text-5xl"
        >
          &lt; Público Alvo /&gt;
        </p>
        <div class="flex justify-center gap-8">
          <p class="text-center text-xl font-semibold text-white md:text-3xl">
            {event.targetAudience}
          </p>
        </div>
      </div>
    </div>
  </section>
{:else}
  <p>Loading project details...</p>
{/if}
