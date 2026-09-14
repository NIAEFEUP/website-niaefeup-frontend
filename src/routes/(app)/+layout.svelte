<script lang="ts">
  import { ModeWatcher } from 'mode-watcher';
  import Footer from './_components/layout/footer.svelte';
  import Navbar from './_components/layout/navbar.svelte';
  import Sidebar from './_components/layout/sidebar.svelte';
  import SnackbarList from './_components/layout/notifications/snackbar-list.svelte';
  import GlobalLoader from '@/lib/components/layout/global-loader.svelte';
  import { isGlobalLoading } from '@/lib/stores/loader';
  import { navigating } from '$app/stores';
  import { page } from '$app/state';
  import { SITE_DESCRIPTION, OG_IMAGE_PATH, SITE_NAME, canonicalUrl } from '@/lib/config/site';
  import navItems from './_components/layout/sidebar-items';
  import '@/app.css';

  let currentPath = $derived(page.url.pathname);
  let pageTitle = $derived.by(() => {
    if (currentPath === '/') return SITE_NAME;
    const item = navItems
      .filter(({ href }) => href !== '/')
      .filter(({ href }) => currentPath.startsWith(href))
      .sort((a, b) => b.href.length - a.href.length)[0];
    return `${item ? item.label : 'Erro'} | ${SITE_NAME}`;
  });

  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  let isLoadingState = $derived($navigating !== null || $isGlobalLoading);

  let showLoader = $state(false);
  let timer: ReturnType<typeof setTimeout>;

  $effect(() => {
    if (isLoadingState) {
      timer = setTimeout(() => {
        showLoader = true;
      }, 150);
    } else {
      clearTimeout(timer);
      showLoader = false;
    }
  });
</script>

{#if showLoader}
  <GlobalLoader />
{/if}

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={SITE_DESCRIPTION} />
  <link rel="canonical" href={canonicalUrl(currentPath)} />
  <meta property="og:url" content={canonicalUrl(currentPath)} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={SITE_DESCRIPTION} />
  <meta property="og:image" content={canonicalUrl(OG_IMAGE_PATH)} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={SITE_DESCRIPTION} />
  <meta name="twitter:image" content={canonicalUrl(OG_IMAGE_PATH)} />
</svelte:head>

<ModeWatcher defaultMode="dark" />
<Sidebar />
<Navbar />

<main class="bg-ni-primary my-20 grow">
  {@render children?.()}
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
    -webkit-box-shadow: 0 0 0px 1000px rgb(255 233 233 / 1) inset; /*Since we can't alter the browsers background change on autofill fields we add an inner shadow with the desired color*/
    -webkit-text-fill-color: rgb(65 19 21 / 0.54);
  }
</style>
