<script>
  import ErrorSection from './_components/error/error-section.svelte';
  // @ts-expect-error Import is as expected but throws error
  import { page } from '$app/state';
  import TextButton from '@/lib/components/buttons/text-button.svelte';
</script>

<main class="mx-10 my-20 flex flex-col justify-center gap-20 font-source_code">
  <section class="flex flex-col gap-10 break-normal text-center text-white">
    <h1 class="text-7xl font-extrabold 2xl:text-huge">{page.status}</h1>
    <h2 class="text-3xl font-semibold md:text-4xl 2xl:text-6xl">Error</h2>
  </section>
  <ErrorSection align="text-center" heading="What went wrong?" text={page.error.message} />
  <form class="m-auto" method="GET" action="/">
    <TextButton type="submit" color="primary" hoverColor="secondary" text="Voltar" width="medium" />
  </form>
</main>
