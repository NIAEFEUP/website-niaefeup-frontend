<script>
  import '../app.css';
  import Navbar from '$lib/layout/Navbar.svelte';
  import Footer from '$lib/layout/Footer.svelte';
  import Sidebar from '$lib/layout/Sidebar.svelte';
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


<!-- Uncomment <Sidebar /> and comment main + navbar + footer to correctly see the sidebar  -->
<!-- <Sidebar /> -->
<Navbar/>
<main class="min-h-[200vh] flex-grow bg-ni-primary">
  <img alt="NIAEFEUP hexagon logo" class="py-11 fixed h-full z-1 overflow-hidden right-0" src="/images/outline_white.png">
  <slot />
</main>
<Footer/>