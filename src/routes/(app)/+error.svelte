<script>
  import ErrorSection from './_components/error/error-section.svelte';
  // @ts-expect-error Import is as expected but throws error
  import { page } from '$app/state';
  import Button from '@/lib/components/buttons/button.svelte';
</script>

<main class="font-source_code mx-10 my-20 flex flex-col justify-center gap-20">
  <section class="flex flex-col gap-10 text-center break-normal text-white">
    <h1 class="2xl:text-huge text-7xl font-extrabold">{page.status}</h1>
    <h2 class="text-3xl font-semibold md:text-4xl 2xl:text-6xl">Error</h2>
  </section>
  <ErrorSection align="text-center" heading="What went wrong?" text={page.error.message} />
  <form class="m-auto" method="GET" action="/">
    <Button type="submit" color="primary" hoverColor="secondary" text="Voltar" width="medium" />
  </form>
</main>
