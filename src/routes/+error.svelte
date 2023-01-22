<script>
  import { page } from '$app/stores';
  import ErrorSection from '$lib/error/ErrorSection.svelte';
  import Button from '$lib/common/Button.svelte';
</script>

<main class="flex flex-col font-source-code-pro justify-center my-20 mx-10 gap-20">
    <section class="flex flex-col text-white text-center break-normal gap-10">
        <h1 class="text-7xl md:text-huge font-extrabold">{$page.status}</h1>
        <h2 class="text-3xl md:text-6xl font-semibold">missing ; before statement</h2>
    </section>
    <div class="flex flex-row m-auto gap-20">
        <ErrorSection side="left" heading="Error type" text="Syntax Error"/>
        <ErrorSection side="right" heading="What went wrong?" text="There is a semicolon (;) missing somewhere"/>
    </div>
    <Button color="bg-primary" hover="hover:bg-secondary" href="/" text="Voltar" width="w-32"/>
</main>
