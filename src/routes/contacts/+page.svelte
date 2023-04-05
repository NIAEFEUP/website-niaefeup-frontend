<script>
    import Graph from './Graph.svelte';
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import BiMap from "svelte-icons-pack/bi/BiMap"; 

    let windowWidth = 0;

</script>

<svelte:window bind:innerWidth={windowWidth} />

<main class="flex flex-col justify-center my-20 -10 ">
    <section class="flex flex-col text-white font-raleway text-center mb-4">
        <h1 class="text-2xl font-bold">&lt; Contacta-nos /&gt;</h1>
    </section>
    <div class="md:grid grid-cols-2 mx-10">
        <form class="justify-self-end min-w-[70%]">
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
        <div class="flex justify-center w-full md:px-3">
            <Graph />
        </div>
    </div>
    {#if windowWidth >= 768}
    <img
        alt="Feup Buildings Outline"
            src="/images/feup_buildings_md.svg"
        class="align-center justify-self-center w-full"
        style="min-width:400px; height:200px; object-fit: none; object-position: center;"

    />
    {:else}
    <img
        alt="Feup Buildings Outline"
            src="/images/feup_buildings.svg"
        class="align-center justify-self-center w-full"
        style="min-width:400px; min-height:160px; object-fit: none; object-position: center;"

    />
    {/if}
    <span id="location" class="flex text-white mx-2 justify-center overflow-x-hidden md:self-center md:justify-start">

        <Icon
            src ={BiMap} 
            color="white"
            size="40"
        />
        <div>
            <p>Rua Dr. Roberto Frias 4200-465, Porto</p>
            <p>Sala B315</p>
        </div>
    </span>
</main>

<style>
    form > input {
        width: 100%;
    }

    @media (min-width: 1050px) {
        #location {
            width: 1039px;
        }
    }
</style>