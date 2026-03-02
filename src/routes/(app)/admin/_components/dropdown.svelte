<script>
  import { createEventDispatcher } from 'svelte';
  import { ChevronDown } from 'lucide-svelte';

  export let options = [
    'TTS',
    'UNI',
    'NiJobs',
    'Eventos',
    'Equipa',
    'opcao bue bue bue grande que nao vai caber aqui para testar cenas ya'
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

  function marquee(node) {
    let timeout1, timeout2, timeout3;
    let isHovered = false;

    const trigger = node.closest('button');

    const start = () => {
      isHovered = true;
      const diff = node.scrollWidth - node.clientWidth;

      if (diff > 0) {
        const duration = Math.max(diff * 10, 1000);

        node.classList.remove('truncate', 'w-full');
        node.classList.add('w-max', 'whitespace-nowrap');

        const animate = () => {
          if (!isHovered) return;
          node.style.transition = `transform ${duration}ms ease-in-out`;
          node.style.transform = `translateX(-${diff}px)`;

          timeout1 = setTimeout(() => {
            if (!isHovered) return;
            node.style.transition = `transform ${duration}ms ease-in-out`;
            node.style.transform = `translateX(0px)`;

            timeout2 = setTimeout(animate, duration + 300);
          }, duration + 300);
        };

        timeout3 = setTimeout(animate, 150);
      }
    };

    const stop = () => {
      isHovered = false;
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);

      const computedStyle = window.getComputedStyle(node);
      const currentTransform = computedStyle.getPropertyValue('transform');

      node.style.transition = 'none';
      node.style.transform = currentTransform;

      void node.offsetWidth;

      node.style.transition = `transform 0.8s ease-in-out`;
      node.style.transform = `translateX(0px)`;

      setTimeout(() => {
        if (!isHovered) {
          node.style.transition = '';
          node.style.transform = '';
          node.classList.remove('w-max', 'whitespace-nowrap');
          node.classList.add('truncate', 'w-full');
        }
      }, 800);
    };

    trigger.addEventListener('mouseenter', start);
    trigger.addEventListener('mouseleave', stop);

    return {
      destroy() {
        trigger.removeEventListener('mouseenter', start);
        trigger.removeEventListener('mouseleave', stop);
      }
    };
  }
</script>

<div
  class="relative z-50 w-[200px] text-left"
  use:clickOutside
  on:click_outside={() => (isOpen = false)}
>
  <button
    on:click={() => (isOpen = !isOpen)}
    class="relative z-10 flex w-full items-center justify-between gap-4 rounded-lg bg-taupe-100 px-6 py-4 text-2xl font-bold text-black shadow-sm transition-colors hover:bg-red-300"
  >
    <div class="flex-1 overflow-hidden">
      <span class="block w-full truncate text-left" use:marquee>{selected}</span>
    </div>

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
            <div class="w-full overflow-hidden">
              <span class="block w-full truncate text-left" use:marquee>{option}</span>
            </div>
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>
