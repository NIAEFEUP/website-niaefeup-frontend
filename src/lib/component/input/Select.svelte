<script lang="ts">
  import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions
  } from '@rgossiaux/svelte-headlessui';
  import Icon from '../Icon.svelte';
  import Icons from '../Icons';

  export let value: string | number | null;
  export let name: string;
  export let placeholder: string | undefined;
  export let options: { value: string | number; label: string }[] = [];

  let _class = '';
  export { _class as class };
</script>

<Listbox bind:value class={_class}>
  <input hidden {name} bind:value />
  <ListboxButton
    class="relative flex h-10 w-full justify-between rounded-lg border-0 bg-stone-400/25 px-5 text-xl text-white outline-none focus-within:ring aria-expanded:rounded-none aria-expanded:rounded-t-lg"
  >
    <div
      class={`flex h-full flex-col justify-center overflow-hidden text-ellipsis whitespace-nowrap ${
        value ? '' : 'text-gray-400'
      }`}
    >
      {options.find((v) => v.value == value)?.label || placeholder || 'Placeholder'}
    </div>

    <div class="flex h-full flex-col justify-center">
      {#if value}
        <button
          on:click={(e) => {
            value = null;
            e.stopPropagation();
          }}
        >
          <Icon src={Icons.Times} color="white" size="24px" />
        </button>
      {:else}
        <Icon src={Icons.ArrowDown} color="white" size="24px" />
      {/if}
    </div>
  </ListboxButton>
  <ListboxOptions class="bottom-full w-full rounded-b-lg bg-stone-400/25 ">
    {#if options.length === 0}
      <div class="text-md mx-5 cursor-pointer p-2 text-white">
        {'No options to show'}
      </div>
    {/if}
    {#each options as item, i}
      {@const rounded = i === options.length - 1 ? 'rounded-b-lg' : ''}
      {@const color = item.value === value ? 'bg-stone-200/25' : ''}

      <ListboxOption
        class={`cursor-pointer p-2 px-5 text-xl text-white hover:bg-stone-200/25 ${rounded} ${color}`}
        value={item.value}
      >
        {item.label}
      </ListboxOption>
    {/each}
  </ListboxOptions>
</Listbox>
