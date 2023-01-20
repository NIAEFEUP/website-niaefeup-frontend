<script>
  import { page } from '$app/stores';
</script>

<main class="flex flex-col font-source-code-pro justify-center my-20 mx-10 gap-20">
    <section class="flex flex-col flex-1 text-white text-center break-normal gap-10">
        <h1 class="text-7xl md:text-huge font-extrabold">{$page.status}</h1>
        <h2 class="text-3xl md:text-6xl font-semibold">missing ; before statement</h2>
    </section>
    <div class="flex flex-row flex-1 m-auto gap-20">
        <section class="flex flex-col basis-2/5 text-white text-left break-normal gap-3">
            <h1 class="text-2xl md:text-5xl font-raleway font-bold">Error type</h1>
            <h2 class="text-xl md:text-4xl font-medium">Syntax Error</h2>
        </section>
        <section class="flex flex-col basis 3/5 text-white text-right break-normal gap-3">
            <h1 class="text-2xl md:text-5xl font-raleway font-bold">What went wrong?</h1>
            <h2 class="text-xl md:text-4xl font-medium">There is a semicolon (;) missing somewhere</h2>
        </section>
    </div>
    <a href="/" class="flex bg-primary hover:bg-secondary m-auto text-white font-raleway font-bold min-w-50 py-2 px-4 rounded">
        <p class="px-5">Voltar</p>
    </a>
</main>
