<script lang="ts">
  import { ChevronDown } from 'lucide-svelte';

  export let options: string[] = ['TTS', 'UNI', 'NiJobs', 'Eventos', 'Equipa'];
  export let selected: string = options[0];
  export let onchange: ((option: string) => void) | undefined = undefined;

  let isOpen = false;

  function clickOutside(node: HTMLElement, callback: () => void) {
    const handleClick = (event: Event) => {
      if (
        node &&
        event.target instanceof Node &&
        !node.contains(event.target) &&
        !event.defaultPrevented
      ) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }

  function handleSelect(option: string) {
    selected = option;
    isOpen = false;
    onchange?.(option);
  }

  function marquee(node: HTMLElement) {
    let timeout1: ReturnType<typeof setTimeout>;
    let timeout2: ReturnType<typeof setTimeout>;
    let timeout3: ReturnType<typeof setTimeout>;
    let isHovered = false;

    const trigger = node.closest('button');

    const start = () => {
      isHovered = true;
      const diff = node.scrollWidth - node.clientWidth;

      if (diff > 0) {
        const duration = Math.max(diff * 10, 1000);

        const hadMxAuto = node.classList.contains('mx-auto');
        node.dataset.hadMxAuto = hadMxAuto.toString();

        node.classList.remove('truncate', 'max-w-full');
        if (hadMxAuto) node.classList.remove('mx-auto');

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
          node.classList.add('truncate', 'max-w-full');

          if (node.dataset.hadMxAuto === 'true') {
            node.classList.add('mx-auto');
          }
        }
      }, 800);
    };

    if (trigger) {
      trigger.addEventListener('mouseenter', start);
      trigger.addEventListener('mouseleave', stop);
    }

    return {
      destroy() {
        if (trigger) {
          trigger.removeEventListener('mouseenter', start);
          trigger.removeEventListener('mouseleave', stop);
        }
      }
    };
  }
</script>

<div class="relative z-10 w-[150px] text-left" use:clickOutside={() => (isOpen = false)}>
  <button
    on:click={() => (isOpen = !isOpen)}
    class="relative z-10 flex w-full items-center justify-between gap-2 rounded-md bg-taupe-100 px-4 py-2 text-xl font-bold text-black transition-colors hover:bg-red-300"
  >
    <div class="flex flex-1 overflow-hidden">
      <span class="mx-auto block max-w-full truncate" use:marquee>{selected}</span>
    </div>

    <ChevronDown class="shrink-0 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}" />
  </button>

  {#if isOpen}
    <div
      class="absolute left-0 top-full z-0 -mt-4 w-full origin-top overflow-hidden rounded-b-md bg-taupe-200 text-xl font-bold text-black"
    >
      <div class="py-1 pt-4">
        {#each options.filter((opt) => opt !== selected) as option (option)}
          <button
            on:click={() => handleSelect(option)}
            class="block w-full px-4 py-2 transition-colors hover:text-vivid-red-700"
          >
            <div class="flex w-full overflow-hidden">
              <span class="block max-w-full truncate text-left" use:marquee>{option}</span>
            </div>
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>
