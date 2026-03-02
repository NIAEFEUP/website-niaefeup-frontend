<script>
  import Dropdown from './dropdown.svelte';
</script>

<div class="flex h-full w-full max-w-2xl flex-col gap-y-4 p-8">
  <div class="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <h2 class="text-3xl font-bold text-white">Atividade</h2>
    <Dropdown onchange={(option) => console.log('Selected:', option)} />
  </div>
  oi
</div>
