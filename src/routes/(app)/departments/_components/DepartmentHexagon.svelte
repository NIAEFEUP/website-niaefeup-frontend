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
  <div class="hex-wrapper">
    <Hexagon {orientation}>
      <button class="link" onclick={handleClick} type="button">
        <img src={item.image} alt={item.name} class="bg" />
        <div class="overlay"></div>
        <div class="content">
          <p class="label">{item.name}</p>
        </div>
      </button>
    </Hexagon>
  </div>
{/if}

<style>
  .hex-wrapper {
    width: 100%;
    height: 100%;
  }

  .link {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: white;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  .content {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 700;
    z-index: 20;
  }

  .label {
    text-align: center;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(80, 0, 0, 0.45);
    z-index: 10;
    transition: background 0.2s;
  }

  .link:hover .overlay {
    background: rgba(80, 0, 0, 0.65);
  }

  .bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

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