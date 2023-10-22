<script>
  import EventHeader from '@/lib/events-page/details-page/EventHeader.svelte';
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<main>
  <EventHeader {data} />
</main>
