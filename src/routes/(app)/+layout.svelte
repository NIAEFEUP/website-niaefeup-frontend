<script lang="ts">
  import { ModeWatcher } from 'mode-watcher';
  import BackgroundHexagon from './_components/layout/background-hexagon.svelte';
  import Footer from './_components/layout/footer.svelte';
  import Navbar from './_components/layout/navbar.svelte';
  import Sidebar from './_components/layout/sidebar.svelte';
  import SnackbarList from './_components/layout/notifications/snackbar-list.svelte';
  import '@/app.css';
</script>

<ModeWatcher defaultMode="dark" />
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
