<script>
  import { page } from '$app/stores';

  $: currentPage = $page.url.pathname;
</script>

<nav
  class="hidden h-min w-full grid-cols-2 items-center justify-center px-7 py-2 font-raleway text-xs text-white sm:grid sm:text-base"
  aria-label="Navigation Bar"
>
  <div class="flex w-full justify-start">
    <a href="#/" class="flex items-center gap-4">
      <img src="/images/ni_logo.png" alt="NIAEFEUP's logo" width="40" height="40" />
      <span>NIAEFEUP</span>
    </a>
  </div>
  <div class="flex justify-end gap-7">
    <a class:active={currentUrl === "http://localhost:3000/#/team/"} href="#/team/"><p class = "font-bold">Equipa</p></a>
    <a class:active={currentUrl === "http://localhost:3000/#/projects/"} href="#/projects/"><p class = "font-bold">Projetos</p></a>
    <a class:active={currentUrl === "http://localhost:3000/#/events/"} href="#/events/"><p class = "font-bold">Eventos</p></a>
    <a class:active={currentUrl === "http://localhost:3000/#/contacts/"} href="#/contacts/"><p class = "font-bold">Contactos</p></a>
  </div>
</nav>

<style>
  .active {
    background-color: rgba(116, 20, 20, 0.4);
    padding: 2px 3px; 
    border-radius: 4px; 
    }
</style>
