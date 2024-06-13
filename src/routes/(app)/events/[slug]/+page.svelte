<script>
  import * as Tabs from '$lib/components/ui/tabs/index';
  import EventHeader from './_components/event-header.svelte';

  export let data;
</script>

<main class="container my-32 w-full max-w-screen-lg">
  <Tabs.Root value="info">
    <Tabs.List class="mx-auto my-8 grid w-1/2 grid-cols-2">
      <Tabs.Trigger value="info">Informações</Tabs.Trigger>
      <Tabs.Trigger value="respostas">Respostas</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="info"><EventHeader {data} /></Tabs.Content>
    <Tabs.Content value="respostas">Respostas</Tabs.Content>
  </Tabs.Root>
</main>
