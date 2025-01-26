<script>
  // @ts-expect-error Import is as expected but throws error

  import { page } from '$app/stores';

  $: currentPage = $page.url.pathname;
  const links = [
    { href: '#', label: 'Equipa', pageComp: '/team' },
    { href: '#', label: 'Projetos', pageComp: '/projects' },
    { href: '#', label: 'Eventos', pageComp: '/events' },
    { href: '/contacts', label: 'Contactos', pageComp: '/contacts' }
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
  <div class="flex justify-end items-center gap-7">
    {#each links as { href, label, pageComp }}
      {#if currentPage === pageComp}
        <a href={href} class="bg-muted-red-400 p-2 rounded">
          <p class="font-bold">{label}</p>
        </a>
      {:else}
        <a href={href} class="rounded">
          <p class="font-bold">{label}</p>
        </a>
      {/if}
    {/each}
  </div>
</nav>
