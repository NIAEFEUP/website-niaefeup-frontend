<script lang="ts">
  import Hexagon from '@/lib/components/hexagons/hexagon.svelte';

  export const orientation = 'horizontal';

  interface DepartmentItem {
    type?: string;
    image?: string;
    name?: string;
    description?: string;
    onselect?: (item: DepartmentItem) => void;
  }

  let { data = {} }: { data?: DepartmentItem } = $props();

  function handleClick() {
    if (data.onselect) {
      data.onselect(data);
    }
  }
</script>

{#if data.type === 'logo'}
  <div class="flex h-full w-full items-center justify-center">
    <button
      class="flex h-full w-[81%] cursor-pointer items-center justify-center border-none bg-transparent p-0"
      onclick={() => data.onselect && data.onselect(data)}
      type="button"
    >
      <img src={data.image} alt="NIAEFEUP" class="h-full w-full object-contain" />
    </button>
  </div>
{:else}
  <div class="h-full w-full">
    <Hexagon {orientation}>
      <button
        class="group relative block h-full w-full cursor-pointer border-none bg-muted-red-700 p-0 text-white outline-none"
        onclick={handleClick}
        type="button"
      >
        {#if data.image}
          <img
            src={data.image}
            alt={data.name}
            class="absolute inset-0 h-full w-full object-cover"
          />
        {/if}
        <div
          class="absolute inset-0 z-10 bg-[rgba(80,0,0,0.45)] transition-colors duration-200 group-hover:bg-[rgba(80,0,0,0.65)]"
        ></div>
        <div
          class="absolute inset-0 z-20 flex items-center justify-center text-xl md:text-[2rem] font-bold"
        >
          <p class="text-center">{data.name}</p>
        </div>
      </button>
    </Hexagon>
  </div>
{/if}
