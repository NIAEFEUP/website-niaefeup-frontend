<script lang="ts">
  import Hexagon from '@/lib/components/hexagons/hexagon.svelte';

  let { data, orientation = 'horizontal' } = $props();
  const item = data || {};

  function handleClick() {
    if (item.onselect) {
      item.onselect(item);
    }
  }
</script>

{#if item.type === 'logo'}
  <div class="logo-only">
    <button class="logo-btn" onclick={() => item.onselect && item.onselect(item)} type="button">
      <img src={item.image} alt="NIAEFEUP" class="logo-img" />
    </button>
  </div>
{:else}
  <div class="h-full w-full">
    <Hexagon {orientation}>
      <button
        class="group relative block h-full w-full cursor-pointer border-none bg-transparent p-0 text-white outline-none"
        onclick={handleClick}
        type="button"
      >
        <img src={item.image} alt={item.name} class="absolute inset-0 h-full w-full object-cover" />
        <div
          class="absolute inset-0 z-10 bg-[rgba(80,0,0,0.45)] transition-colors duration-200 group-hover:bg-[rgba(80,0,0,0.65)]"
        ></div>
        <div class="absolute inset-0 z-20 flex items-center justify-center text-[2rem] font-bold">
          <p class="text-center">{item.name}</p>
        </div>
      </button>
    </Hexagon>
  </div>
{/if}

<style>
  .logo-only {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
</style>
