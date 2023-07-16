<script lang="ts">
  import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions
  } from '@rgossiaux/svelte-headlessui';
  import type { SupportedAs } from '@rgossiaux/svelte-headlessui/internal/elements';
  import { onMount } from 'svelte';

  const items = [
    { value: 1, label: 'Ola' },
    { value: 2, label: 'Deus' },
    { value: 3, label: 'Siuuuyuuuuu' }
  ];

  let selectedItem: { label: any } | null = null;

  let _class = '';
  export { _class as class };
</script>

<Listbox bind:value={selectedItem} class={_class}>
  <ListboxButton
    class="relative flex h-10 w-full rounded-lg border-0 bg-stone-400/25 px-5 text-xl text-white outline-none aria-expanded:rounded-none aria-expanded:rounded-t-lg"
  >
    <div class={`flex h-full flex-col justify-center ${selectedItem ? '' : 'text-gray-400'}`}>
      {selectedItem?.label || 'Placeholder'}
    </div>
  </ListboxButton>
  <ListboxOptions class="bottom-full w-full rounded-b-lg bg-stone-400/25 last:rounded-b-lg">
    {#each items as item (item.value)}
      <ListboxOption class="cursor-pointer text-xl text-white hover:bg-stone-200/25" value={item}>
        {item.label}
      </ListboxOption>
    {/each}
  </ListboxOptions>
</Listbox>
