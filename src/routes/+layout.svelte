<script lang="ts">
  import BackgroundHexagon from '$lib/layout/BackgroundHexagon.svelte';
  import Footer from '$lib/layout/Footer.svelte';
  import Navbar from '$lib/layout/Navbar.svelte';
  import Sidebar from '$lib/layout/Sidebar.svelte';
  import SnackbarList from '$lib/notifications/SnackbarList.svelte';
  import '@/app.css';
</script>

<!-- <Sidebar /> -->
<!-- <Navbar /> -->
<main class="bg-ni-primary flex-grow">
  <BackgroundHexagon position="right" />
  <slot />
</main>
<!-- <Footer /> -->
<!-- <SnackbarList /> -->

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
