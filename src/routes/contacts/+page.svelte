<script>
    import LabelInput from '$lib/component/LabelInput.svelte';
    import Graph from './Graph.svelte';
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import BiMap from "svelte-icons-pack/bi/BiMap"; 

</script>

<main class="flex flex-col justify-center my-20 -10 ">
    <section class="flex flex-col text-white font-raleway text-center mb-4">
        <h1 class="text-2xl font-bold">&lt; Contacta-nos /&gt;</h1>
    </section>
    <div class="md:grid grid-cols-2 mx-10">
        <form class="justify-self-end min-w-[85%] lg:min-w-[70%]">
            <LabelInput label="// Email" id="email" type="email" placeholder="xxxxxxxxxxxxx@gmail.com"></LabelInput>
            <LabelInput label="// Nome" id="name" type="text"></LabelInput>
            <LabelInput label="// Assunto" id="subject" type="text"></LabelInput>
            <LabelInput label="// Mensagem" id="message" type="text" isTextArea={true}></LabelInput>

            <button class="m-1 px-5 py-1 rounded-lg justify-self-start text-white bg-primary" type="submit">Enviar</button>
        </form>
        <div class="flex justify-center w-full m-5 md:my-0">
            <Graph />
        </div>
    </div>
    <picture>
        <source media="(max-width: 768px)" srcset="/images/feup_buildings.svg" />
        <source media="(min-width: 769px)" srcset="/images/feup_buildings_md.svg" />
        <img src="/images/feup_buildings.svg" alt="Feup Buildings Outline" 
            class="align-center justify-self-center w-full object-none object-center h-52"
        />
    </picture>
    <span id="location" class="flex lg:w-[1039px] text-white ml-3 justify-center overflow-x-hidden md:self-center md:justify-start">
        <Icon
            src ={BiMap} 
            color="white"
            size="40"
            className="py-2 pl-1"
        />
        <div>
            <p>Rua Dr. Roberto Frias 4200-465, Porto</p>
            <p>Sala B315</p>
        </div>
    </span>
</main>
