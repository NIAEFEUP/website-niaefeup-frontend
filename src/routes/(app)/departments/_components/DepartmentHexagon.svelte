<script lang="ts">
  import Hexagon from '@/lib/components/hexagons/hexagon.svelte';

  let { data } = $props();

  const item = data || {};
</script>

{#if item.type === 'logo'}
  <div class="logo-only">
    <img 
      src={item.image} 
      alt="NIAEFEUP" 
      class="logo-img" 
    />
  </div>
{:else}
  <Hexagon orientation="vertical">
    <a href={item.href} class="link">
      <img src={item.image} alt={item.name} class="bg" />
      <div class="overlay"></div>

      <div class="content">
        <p>{item.name}</p>
      </div>
    </a>
  </Hexagon>
{/if}

<style>
  .link {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: white;
  }

  .content {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    z-index: 20;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(80, 0, 0, 0.45);
    z-index: 10;
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