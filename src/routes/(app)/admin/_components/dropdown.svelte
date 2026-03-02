<script>
  import { createEventDispatcher } from 'svelte';
  import { ChevronDown } from 'lucide-svelte';

  export let options = ['TTS', 'UNI', 'NiJobs', 'Eventos', 'Equipa'];
  export let selected = 'Select Option';

  let isOpen = false;
  const dispatch = createEventDispatcher();

  function clickOutside(node) {
    const handleClick = (event) => {
      if (node && !node.contains(event.target) && !event.defaultPrevented) {
        node.dispatchEvent(new CustomEvent('click_outside', node));
      }
    };

    document.addEventListener('click', handleClick, true);

    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }

  function handleSelect(option) {
    selected = option;
    isOpen = false;
    dispatch('change', option);
  }
</script>

<div
  class="relative inline-block text-left"
  use:clickOutside
  on:click_outside={() => (isOpen = false)}
>
  <button
    on:click={() => (isOpen = !isOpen)}
    class="flex min-w-[120px] items-center justify-between gap-4 rounded-lg bg-taupe-100 p-6 text-2xl font-bold text-black shadow-sm transition-colors hover:bg-red-300"
  >
    <span>{selected}</span>
    <ChevronDown class="transition-transform duration-200 {isOpen ? 'rotate-180' : ''}" />
  </button>

  {#if isOpen}
    <div
      class="absolute left-0 z-50 w-full origin-top-left overflow-hidden rounded-lg bg-taupe-200 text-2xl font-bold text-black shadow-lg"
    >
      <div class="py-1">
        {#each options as option}
          <button
            on:click={() => handleSelect(option)}
            class="block w-full px-4 py-2 text-left transition-colors hover:bg-red-50 hover:text-red-700"
          >
            {option}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>
