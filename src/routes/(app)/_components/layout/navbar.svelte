<script>
  // @ts-expect-error Import is as expected but throws error

  import { page } from '$app/stores';

  $: currentPage = $page.url.pathname;
  const links = [
    { href: '/team/', label: 'Equipa', pageComp: '/team' },
    { href: '/projects/', label: 'Projetos', pageComp: '/projects' },
    { href: '/events/', label: 'Eventos', pageComp: '/events' },
    { href: '/contacts/', label: 'Contactos', pageComp: '/contacts' }
  ];
</script>

<nav
  class="fixed hidden h-min w-full grid-cols-2 items-center justify-center px-7 py-2 font-raleway text-xs text-white sm:grid sm:text-base"
  aria-label="Navigation Bar"
>
  <div class="flex w-full justify-start">
    <a href="/" class="flex items-center gap-4">
      <img src="/images/ni_logo.png" alt="NIAEFEUP's logo" width="40" height="40" />
      <span>NIAEFEUP</span>
    </a>
  </div>
  <div class="flex justify-end gap-7">
    {#each links as { href, label, pageComp }}
      <a class:active={currentPage === pageComp} {href}>
        <p class="font-bold">{label}</p>
      </a>
    {/each}
  </div>
</nav>

<style>
  .active {
    background-color: theme('colors.muted-red.400');
    padding: 2px 6px;
    border-radius: 4px;
  }
</style>
