<script lang="ts">
  import '../app.css';
  import Navbar from '$lib/layout/Navbar.svelte';
  import Footer from '$lib/layout/Footer.svelte';
  import Sidebar from '$lib/layout/Sidebar.svelte';
  import BackgroundHexagon from '$lib/layout/BackgroundHexagon.svelte';
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
<Sidebar />
<Navbar/>
<main class="flex-grow bg-ni-primary -z-10">
  <img alt="NIAEFEUP hexagon logo" class="fixed h-full sm:pb-32 overflow-hidden -right-24 sm:right-0 pt-20 pb-40" src="/images/outline_white.png">
  <slot />
</main>
<Footer/>