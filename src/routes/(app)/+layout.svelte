<script lang="ts">
  import { ModeWatcher } from 'mode-watcher';
  import BackgroundHexagon from './_components/layout/background-hexagon.svelte';
  import Footer from './_components/layout/footer.svelte';
  import Navbar from './_components/layout/navbar.svelte';
  import Sidebar from './_components/layout/sidebar.svelte';
  import SnackbarList from './_components/layout/notifications/snackbar-list.svelte';
  import '@/app.css';
  
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<ModeWatcher defaultMode="dark" />
<Sidebar />
<Navbar />
<main class="bg-ni-primary my-20 flex-grow">
  <BackgroundHexagon position="right" />
  {@render children?.()}
</main>
<Footer />
<SnackbarList />

<style>
  :global(html) {
    height: 100%;
    min-height: 100vh;
    overflow: auto;
  }

  :global(body) {
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }

  /*
  A browser autofill option (in loging form for example) may apply a filter to our input fields that clashes with our desired aesthetic,
  therefore we undo that change and keep the original style
  */
  :global(
    input:-webkit-autofill,
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active
  ) {
    -webkit-box-shadow: 0 0 0px 1000px rgb(255 233 233 / var(--tw-bg-opacity)) inset; /*Since we can't alter the browsers background change on autofill fields we add an inner shadow with the desired color*/
    -webkit-text-fill-color: rgb(65 19 21 / 0.54);
  }
</style>
