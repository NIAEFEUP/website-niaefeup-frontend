<script>
  import Dropdown from './dropdown.svelte';
</script>

<div class="flex h-full w-[500px] flex-col gap-y-4 p-8">
  <div class="mb-12 flex items-center justify-between">
    <h2 class="text-3xl font-bold text-white">Atividade</h2>
    <Dropdown
      options={['Opção 1', 'Opção 2', 'Opção 3']}
      on:select={(e) => console.log('Selected:', e.detail)}
    />
  </div>
  oi
</div>
