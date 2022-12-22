<script>
  import '../app.css';
  import Navbar from '$lib/layout/Navbar.svelte';
</script>

<style>
  :global(html) {
    min-height: 100vh;
  }

  :global(body) {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>

<Navbar/>
<div class="flex-grow bg-ni-primary">
  <slot />
</div>
