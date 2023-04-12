<script>
  import LabelInput from '$lib/component/LabelInput.svelte';
  import Graph from './Graph.svelte';
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import BiMap from 'svelte-icons-pack/bi/BiMap';
</script>

<main class="-10 my-20 flex flex-col justify-center ">
  <section class="mb-4 flex flex-col text-center font-raleway text-white">
    <h1 class="text-2xl font-bold">&lt; Contacta-nos /&gt;</h1>
  </section>
  <div class="mx-10 grid-cols-2 md:grid">
    <form class="min-w-[85%] justify-self-end lg:min-w-[70%]">
      <LabelInput label="// Email" id="email" type="email" placeholder="xxxxxxxxxxxxx@gmail.com" />
      <LabelInput label="// Nome" id="name" type="text" />
      <LabelInput label="// Assunto" id="subject" type="text" />
      <LabelInput label="// Mensagem" id="message" type="text" isTextArea={true} />

      <button
        class="m-1 justify-self-start rounded-lg bg-primary px-5 py-1 text-white"
        type="submit">Enviar</button
      >
    </form>
    <div class="m-5 flex w-full justify-center md:my-0">
      <Graph />
    </div>
  </div>
  <picture>
    <source media="(max-width: 768px)" srcset="/images/feup_buildings.svg" />
    <source media="(min-width: 769px)" srcset="/images/feup_buildings_md.svg" />
    <img
      src="/images/feup_buildings.svg"
      alt="Feup Buildings Outline"
      class="align-center h-52 w-full justify-self-center object-none object-center"
    />
  </picture>
  <span
    id="location"
    class="ml-3 flex justify-center overflow-x-hidden text-white md:justify-start md:self-center lg:w-[1039px]"
  >
    <Icon src={BiMap} color="white" size="40" className="py-2 pl-1" />
    <div>
      <p>Rua Dr. Roberto Frias 4200-465, Porto</p>
      <p>Sala B315</p>
    </div>
  </span>
</main>
