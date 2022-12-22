<script>
  import '../app.css';
  import Navbar from '$lib/layout/Navbar.svelte';
<<<<<<< HEAD
  import Footer from '$lib/layout/Footer.svelte';
=======
>>>>>>> feat: background and navbar
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
<<<<<<< HEAD
<main class="flex-grow bg-ni-primary">
  <slot />
</main>
<Footer/>
=======
<div class="flex-grow bg-ni-primary">
  <slot />
</div>
>>>>>>> feat: background and navbar
