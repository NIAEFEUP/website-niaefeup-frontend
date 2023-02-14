<script>
    import Graph from './Graph.svelte'
</script>

<main class="flex flex-col justify-center my-20 mx-10 gap-20">
    <section class="flex flex-col text-white font-raleway text-center ">
        <h1 class="text-2xl font-bold">&lt; Contacta-nos /&gt;</h1>
    </section>
    <div class="flex flex-wrap">
        <form>
            <label class="m-1 text-white font-source-code" for="email">// Email</label><br>
            <input class="rounded-lg p-1 text-primary placeholder-primary" type="email" id="email" placeholder="xxxxxxxxxxxxx@gmail.com"><br>
            <label class="m-1 text-white font-source-code" for="name">// Nome</label><br>
            <input class="rounded-lg p-1 text-primary placeholder-primary" type="text" id="name"><br>
            <label class="m-1 text-white font-source-code" for="subject">// Assunto</label><br>
            <input class="rounded-lg p-1 text-primary placeholder-primary" type="text" id="subject"><br>
            <label class="m-1 text-white font-source-code" for="message">// Mensagem</label><br>
            <textarea class="rounded-lg p-1 text-primary placeholder-primary" id="message"></textarea><br>

            <button class="m-1 px-5 py-1 rounded-lg justify-self-start text-white bg-primary" type="submit">Enviar</button>
        </form>
        <Graph />
    </div>
</main>