<script>
  import { onMount } from 'svelte';
  // @ts-expect-error Import is as expected but throws error
  import { page } from '$app/stores';
  import { resolve } from '$app/paths';

  let currentPage = $derived($page.url.pathname ?? '/');
  const links = [
    { href: resolve('#'), label: 'Equipa', pageComp: '/team' },
    { href: resolve('/projects'), label: 'Projetos', pageComp: '/projects' },
    { href: resolve('#'), label: 'Eventos', pageComp: '/events' },
    { href: resolve('/contacts'), label: 'Contactos', pageComp: '/contacts' }
  ];

  const homeUrl = resolve('/');

  let isScrolled = $state(false);
  let y = 0;

  function handleScroll() {
    y = document.body.scrollTop || document.documentElement.scrollTop;
    isScrolled = y > 0;
  }

  onMount(() => {
    // Add scroll listener to the body
    document.body.addEventListener('scroll', handleScroll);

    // Cleanup on unmount
    return () => {
      document.body.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<nav
  class="bg-ni-navbar font-raleway fixed z-30 hidden h-min w-full grid-cols-2 items-center justify-center px-7 py-2 text-xs text-white sm:grid sm:text-base"
  class:isScrolled
  aria-label="Navigation Bar"
>
  <div class="flex w-full justify-start">
    <a href={homeUrl} class="flex items-center gap-4">
      <img src="/images/ni_logo.png" alt="NIAEFEUP's logo" width="40" height="40" />
      <span>NIAEFEUP</span>
    </a>
  </div>
  <div class="flex items-center justify-end gap-7">
    {#each links as { href, label, pageComp } (label)}
      {#if currentPage === pageComp}
        <a {href} class="bg-muted-red-400 rounded p-2" data-testid={label.toLowerCase()}>
          <p class="font-bold">{label}</p>
        </a>
      {:else}
        <a {href} class="rounded">
          <p class="font-bold">{label}</p>
        </a>
      {/if}
    {/each}
  </div>
</nav>

<style>
  .isScrolled {
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.12);
  }
</style>
