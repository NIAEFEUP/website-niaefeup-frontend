<script lang="ts">
  import type { Generation } from '@/model/Generation';
  import Icon from '../component/Icon.svelte';
  import Icons from '../component/Icons';

  export let generations: Generation[];
  // by default we select the last generation but we can change it to any generation
  // that is on the list
  export let selectedGeneration: Generation | undefined = generations.at(-1);
  
  //TODO (luisd): make this size reactive?
  const displayedSize = 3;
  let offset =
    generations.length < displayedSize
      ? 0
      : generations.findIndex((element) => element == selectedGeneration) - displayedSize + 1;

  $: displayedGenerations = generations.slice(offset, offset + displayedSize);

  const changeDisplayedGenerations = (i: number) => {
    if (generations.length < displayedSize) return;
    if (generations.length - (offset + i) < displayedSize) return;
    if (offset + i < 0) {
      offset = 0;
      return;
    }
    offset += i;
  };


</script>

<div class="flex w-full flex-row items-center justify-center gap-1">
  <button data-end={offset == 0 || null} class="[&>svg]:text-taupe-300 [&>svg]:data-[end=true]:text-white" on:click={() => changeDisplayedGenerations(-1)}>
    <Icon src={Icons.AngleLeft} size="3em" color="white" />
  </button>
  <div class="grid w-9/12 grid-cols-1 grid-rows-1">
    <!-- Bar -->
    <div class="z-1 col-span-full row-span-full m-auto h-1.5 w-full rounded-lg bg-taupe-300" />
    <!-- Points -->
    <div
      class="z-2 col-span-full row-span-full m-auto flex w-full flex-row justify-around overflow-hidden "
    >
      {#each displayedGenerations as generation}
        {#if generation == selectedGeneration}
          <button
            class="mb-6 flex flex-col items-center justify-start"
            on:click={() => (selectedGeneration = generation)}
            data-active
          >
            <p class="text-taupe-100">{generation.schoolYear}</p>
            <div class="h-4 w-4 rounded-full bg-taupe-100" />
          </button>
        {:else}
          <button
            class="mb-6 flex flex-col items-center justify-start"
            on:click={() => (selectedGeneration = generation)}
          >
            <p class="text-taupe-300">{generation.schoolYear}</p>
            <div class="h-4 w-4 rounded-full bg-taupe-300" />
          </button>
        {/if}
      {/each}
    </div>
  </div>
  <button data-end={offset == generations.length - displayedSize || null} class="[&>svg]:text-taupe-300 [&>svg]:data-[end=true]:text-white" on:click={() => changeDisplayedGenerations(1)}>
    <Icon src={Icons.AngleRight} size="3em" color="white" />
  </button>
</div>
