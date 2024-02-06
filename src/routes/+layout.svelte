<script lang="ts">
  import BackgroundHexagon from '$lib/components/layout/BackgroundHexagon.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Sidebar from '$lib/components/layout/Sidebar.svelte';
  import SnackbarList from '$lib/notifications/SnackbarList.svelte';
  import '@/app.pcss';
</script>

<Sidebar />
<Navbar />
<main class="bg-ni-primary flex-grow">
  <BackgroundHexagon position="right" />
  <slot />
</main>
<Footer />
<SnackbarList />

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
