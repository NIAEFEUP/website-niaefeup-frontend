<script lang="ts">
  import '../app.css';
  import Navbar from '$lib/layout/Navbar.svelte';
  import Footer from '$lib/layout/Footer.svelte';
  import Sidebar from '$lib/layout/Sidebar.svelte';
</script>

<!-- Uncomment <Sidebar /> and comment main + navbar + footer to correctly see the sidebar  -->
<Sidebar />
<Navbar />
<main class="bg-ni-primary -z-10 flex-grow">
  <img
    alt="NIAEFEUP hexagon logo"
    class="fixed -right-24 h-full overflow-hidden pt-20 pb-40 sm:right-0 sm:pb-32"
    src="/images/outline_white.png"
  />
  <slot />
</main>
<Footer />

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
