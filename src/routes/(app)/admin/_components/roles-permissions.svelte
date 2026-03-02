<script lang="ts">
  import Dropdown from './dropdown.svelte';
</script>

<div class="flex h-full w-full flex-col gap-y-4 md:w-[350px] lg:w-[500px] xl:w-[700px]">
  <div class="mb-12 flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <h2 class="text-3xl font-bold text-white">Atividade</h2>
    <Dropdown onchange={(option) => console.log('Selected:', option)} />
  </div>
  oiiso
</div>
