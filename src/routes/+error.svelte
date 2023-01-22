<script>
  import { page } from '$app/stores';
  import ErrorSection from '../components/ErrorSection.svelte';
  import Button from '../components/Button.svelte';
</script>

<main class="flex flex-col font-source-code-pro justify-center my-20 mx-10 gap-20">
    <section class="flex flex-col text-white text-center break-normal gap-10">
        <h1 class="text-7xl md:text-huge font-extrabold">{$page.status}</h1>
        <h2 class="text-3xl md:text-6xl font-semibold">missing ; before statement</h2>
    </section>
    <div class="flex flex-row m-auto gap-20">
        <ErrorSection align="text-left" heading="Error type" text="Syntax Error"/>
        <ErrorSection align="text-right" heading="What went wrong?" text="There is a semicolon (;) missing somewhere"/>
    </div>
    <form class="m-auto" method="POST" action="/">
        <Button type="submit" color="primary" hoverColor="secondary" text="Voltar" width="large"/>
    </form>
</main>
