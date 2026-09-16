<script lang="ts">
  import { LucideSend } from 'lucide-svelte';
  import Graph from './_components/graph.svelte';
  import LabelInput from '@/lib/components/forms/label-input.svelte';
  import Icon from '@/lib/components/icons/icon.svelte';
  import Icons from '@/lib/components/icons/icons';

  const FORMSUBMIT_URL = 'https://formsubmit.co/a80b58e2539ff022feaad8aae1acc319';

  let email = $state('');
  let name = $state('');
  let subject = $state('');
  let message = $state('');

  let emailSubject = $derived(subject ? `[Website Contacto] ${subject}` : '[Website Contacto]');
</script>

<section class="flex flex-col justify-center px-4 sm:px-6 md:px-10">
  <section class="mb-6 flex flex-col text-center font-raleway text-white">
    <h1 class="text-2xl font-bold sm:text-3xl">&lt; Contacta-nos /&gt;</h1>
  </section>
  <div
    class="mx-auto flex w-full max-w-5xl flex-col items-center gap-y-8 md:grid md:grid-cols-2 md:items-start md:gap-x-8 md:gap-y-0"
  >
    <form
      class="w-full max-w-lg md:max-w-none md:min-w-[85%] md:justify-self-end"
      method="POST"
      action={FORMSUBMIT_URL}
    >
      <input type="hidden" name="_subject" value={emailSubject} />
      <LabelInput
        label="// Email"
        id="email"
        name="email"
        type="email"
        placeholder="xxxxxxxxxxxxx@gmail.com"
        required={true}
        bind:value={email}
      />
      <LabelInput
        label="// Nome"
        id="name"
        name="name"
        type="text"
        required={true}
        minlength={2}
        maxlength={100}
        bind:value={name}
      />
      <LabelInput
        label="// Assunto"
        id="subject"
        name="subject"
        type="text"
        required={true}
        minlength={5}
        maxlength={200}
        bind:value={subject}
      />
      <LabelInput
        label="// Mensagem"
        id="message"
        name="message"
        type="text"
        isTextArea={true}
        required={true}
        minlength={10}
        maxlength={5000}
        bind:value={message}
      />

      <button
        class="mt-2 flex w-full flex-row items-center justify-center gap-x-2 rounded-lg bg-vivid-red-900 px-5 py-3 font-source-code font-bold text-white transition hover:bg-vivid-red-800 sm:w-auto sm:self-start"
        type="submit"
      >
        <LucideSend class="h-5 w-5 p-0.5" />
        <span>Enviar</span>
      </button>
    </form>
    <div class="flex w-full justify-center md:m-5 md:my-0">
      <Graph />
    </div>
  </div>
  <picture class="mt-8">
    <source media="(max-width: 767px)" srcset="/images/feup_buildings.svg" />
    <source media="(min-width: 767px)" srcset="/images/feup_buildings_md.svg" />
    <img
      src="/images/feup_buildings.svg"
      alt="Contorno dos edifícios da FEUP"
      class="align-center h-40 w-full justify-self-center object-none object-center sm:h-52"
    />
  </picture>
  <span
    id="location"
    class="my-2 flex items-center justify-center gap-x-2 px-4 text-center text-white sm:text-left md:ml-3 md:justify-start md:self-center lg:w-259.75"
  >
    <Icon src={Icons.Pin} color="white" size="40" className="shrink-0 py-2 pl-1" />
    <div>
      <p>Rua Dr. Roberto Frias 4200-465, Porto</p>
      <p>Sala B315</p>
    </div>
  </span>
</section>
