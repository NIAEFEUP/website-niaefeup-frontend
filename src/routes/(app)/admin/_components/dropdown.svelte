<script>
  import { createEventDispatcher } from 'svelte';
  import { ChevronDown } from 'lucide-svelte';

  export let options = [
    'TTS',
    'UNI',
    'NiJobs',
    'Eventos',
    'Equipa',
    'opcao bue bue bue grande que noa vai caber aqui para testar cenas ya'
  ];
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
  class="relative z-50 w-[300px] text-left"
  use:clickOutside
  on:click_outside={() => (isOpen = false)}
>
  <button
    on:click={() => (isOpen = !isOpen)}
    class="relative z-10 flex w-full items-center justify-between gap-4 rounded-lg bg-taupe-100 p-6 text-2xl font-bold text-black shadow-sm transition-colors hover:bg-red-300"
  >
    <span class="truncate">{selected}</span>

    <ChevronDown class="shrink-0 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}" />
  </button>

  {#if isOpen}
    <div
      class="absolute left-0 top-full z-0 -mt-4 w-full origin-top overflow-hidden rounded-b-lg bg-taupe-200 text-2xl font-bold text-black shadow-lg"
    >
      <div class="py-1 pt-6">
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
