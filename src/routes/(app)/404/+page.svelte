<script lang="ts">
  import ErrorSection from '../_components/error/error-section.svelte';
  import Button from '@/lib/components/buttons/button.svelte';
</script>

<main class="mx-10 my-20 flex flex-col justify-center gap-20 font-source_code">
  <section class="flex flex-col gap-10 break-normal text-center text-white">
    <h1 class="text-7xl font-extrabold 2xl:text-huge">404</h1>
    <h2 class="text-3xl font-semibold md:text-4xl 2xl:text-6xl">Página não encontrada</h2>
  </section>
  <ErrorSection
    align="text-center"
    heading="Perdeste-te?"
    text="A página que procuras não existe ou foi movida."
  />
  <form class="m-auto" method="GET" action="/">
    <Button
      type="submit"
      color="primary"
      hoverColor="secondary"
      text="Voltar ao início"
      width="large"
    />
  </form>
</main>
