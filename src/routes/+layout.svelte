<script lang="ts">
  import '@/app.css';
  import Navbar from '$lib/layout/Navbar.svelte';
  import Footer from '$lib/layout/Footer.svelte';
  import Sidebar from '$lib/layout/Sidebar.svelte';
  import SnackbarList from '$lib/notifications/SnackbarList.svelte';
  import BackgroundHexagon from '$lib/layout/BackgroundHexagon.svelte';
</script>

<div class="flex h-screen w-screen flex-col overflow-scroll">
  <Sidebar />
  <Navbar />
  <main class="mt-20 grow">
    <BackgroundHexagon position="right" />
    <slot />
  </main>
  <Footer />
  <SnackbarList />
</div>

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
