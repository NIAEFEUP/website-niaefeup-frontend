<script>
  import { createEventDispatcher } from 'svelte';

  // Props
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
    class="flex min-w-[120px] items-center justify-between rounded bg-taupe-100 p-3 text-sm font-medium shadow-sm transition-colors hover:bg-red-300"
  >
    <span>{selected}</span>
    <svg
      class="ml-2 h-4 w-4 transition-transform {isOpen ? 'rotate-180' : ''}"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {#if isOpen}
    <div
      class="absolute left-0 z-50 w-full origin-top-left overflow-hidden rounded-md border bg-taupe-200 shadow-lg"
    >
      <div class="py-1">
        {#each options as option}
          <button
            on:click={() => handleSelect(option)}
            class="block w-full px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-red-50 hover:text-red-700"
          >
            {option}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>
