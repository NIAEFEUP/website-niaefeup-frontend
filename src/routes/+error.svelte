<script>
  import { page } from '$app/stores';
  import ErrorSection from '$lib/error-page/ErrorSection.svelte';
  import Button from '$lib/error-page/Button.svelte';
</script>

<main class="my-20 mx-10 flex flex-col justify-center gap-20 font-source_code">
  <section class="flex flex-col gap-10 break-normal text-center text-white">
    <h1 class="text-7xl font-extrabold 2xl:text-huge">{$page.status}</h1>
    <h2 class="text-3xl font-semibold md:text-4xl 2xl:text-6xl">missing ; before statement</h2>
  </section>
  <div class="m-auto flex flex-row gap-20">
    <ErrorSection align="text-left" heading="Error type" text="Syntax Error" />
    <ErrorSection
      align="text-right"
      heading="What went wrong?"
      text="There is a semicolon (;) missing somewhere"
    />
  </div>
  <form class="m-auto" method="GET" action="/">
    <Button type="submit" color="primary" hoverColor="secondary" text="Voltar" width="medium" />
  </form>
</main>
