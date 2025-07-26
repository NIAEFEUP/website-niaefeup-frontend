<script>
  import EventHeader from './_components/event-header.svelte';
  import Carousel from './_components/carousel.svelte';
  import * as Tabs from '$lib/components/ui/tabs/index';

  export let data;
</script>

<main class="container my-32 w-full max-w-screen-lg">
  <h1 class="text-center text-3xl font-bold md:hidden">{data.title}</h1>
  <Tabs.Root value="info">
    <Tabs.Content value="info">
      <EventHeader data={data} />
      <Carousel eventGallery={data.event.gallery} eventTitle={data.title} />
      <p class="text-justify text-2xl font-semibold">{data.event.description}</p>
    </Tabs.Content>
  </Tabs.Root>
</main>
