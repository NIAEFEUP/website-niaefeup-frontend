<script>
  import { onMount } from 'svelte';

  let isScrolled = false;
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
  class="bg-ni-navbar fixed z-30 hidden h-min w-full grid-cols-2 items-center justify-center px-7 py-2 font-raleway text-xs text-white sm:grid sm:text-base"
  class:isScrolled
  aria-label="Navigation Bar"
>
  <div class="flex w-full justify-start">
    <a href="/" class="flex items-center gap-4">
      <img src="/images/ni_logo.png" alt="NIAEFEUP's logo" width="40" height="40" />
      <span>NIAEFEUP</span>
    </a>
  </div>
  <div class="flex justify-end gap-7">
    <a href="/#/">Equipa</a>
    <a href="/#/">Projetos</a>
    <a href="/#/">Eventos</a>
    <a href="/contacts">Contactos</a>
  </div>
</nav>

<style>
  .isScrolled {
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.12);
  }
</style>
