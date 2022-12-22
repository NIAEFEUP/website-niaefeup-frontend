<script>
  import '../app.css';
  import Navbar from '$lib/layout/Navbar.svelte';
  import Footer from '$lib/layout/Footer.svelte';
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
<main class="flex-grow bg-ni-primary">
  <slot />
</main>
<Footer/>