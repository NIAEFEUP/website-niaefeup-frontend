<script lang="ts">
  import Graph from './_components/graph.svelte';
  import LabelInput from '@/lib/components/forms/label-input.svelte';
  import Icon from '@/lib/components/icons/icon.svelte';
  import Icons from '@/lib/components/icons/icons';
  import { LucideLoaderCircle, LucideCheckCircle, LucideXCircle, LucideSend } from 'lucide-svelte';

  let email = $state('');
  let name = $state('');
  let subject = $state('');
  let message = $state('');

  let loading = $state(false);
  let success = $state(false);
  let error = $state(false);
  let successTimeout: ReturnType<typeof setTimeout> | null = null;
  let errorTimeout: ReturnType<typeof setTimeout> | null = null;

  let sendButtonText = $derived(
    success ? 'Enviado' : error ? 'Erro' : loading ? 'A enviar...' : 'Enviar'
  );

  async function submitForm(event: Event) {
    event.preventDefault();
    if (successTimeout) {
      clearTimeout(successTimeout);
      successTimeout = null;
    }
    if (errorTimeout) {
      clearTimeout(errorTimeout);
      errorTimeout = null;
    }
    success = false;
    error = false;
    loading = true;
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        name,
        subject,
        message
      })
    });

    if (response.ok) {
      success = true;
      loading = false;
      email = '';
      name = '';
      subject = '';
      message = '';
      successTimeout = setTimeout(() => {
        success = false;
        successTimeout = null;
      }, 2000);
    } else {
      error = true;
      loading = false;
      errorTimeout = setTimeout(() => {
        error = false;
        errorTimeout = null;
      }, 2000);
    }
  }
</script>

<section class="flex flex-col justify-center">
  <section class="mb-4 flex flex-col text-center font-raleway text-white">
    <h1 class="text-2xl font-bold">&lt; Contacta-nos /&gt;</h1>
  </section>
  <div class="mx-10 grid-cols-2 md:grid">
    <form class="min-w-[85%] justify-self-end" method="POST" action="" onsubmit={submitForm}>
      <LabelInput
        label="// Email"
        id="email"
        type="email"
        placeholder="xxxxxxxxxxxxx@gmail.com"
        required={true}
        bind:value={email}
      />
      <LabelInput
        label="// Nome"
        id="name"
        type="text"
        required={true}
        minlength={2}
        maxlength={100}
        bind:value={name}
      />
      <LabelInput
        label="// Assunto"
        id="subject"
        type="text"
        required={true}
        minlength={5}
        maxlength={200}
        bind:value={subject}
      />
      <LabelInput
        label="// Mensagem"
        id="message"
        type="text"
        isTextArea={true}
        required={true}
        minlength={10}
        maxlength={5000}
        bind:value={message}
      />

      <button
        class="m-1 flex flex-row justify-between gap-x-1 justify-self-start rounded-lg bg-vivid-red-900 py-1 pl-2 pr-3 text-white"
        type="submit"
      >
        {#if success}
          <LucideCheckCircle class="p-1" />
        {:else if error}
          <LucideXCircle class="p-1" />
        {:else if loading}
          <LucideLoaderCircle class="animate-spin p-1" />
        {:else}
          <LucideSend class="p-1" />
        {/if}
        {sendButtonText}
      </button>
    </form>
    <div class="m-2 flex w-full justify-center md:m-5 md:my-0">
      <Graph />
    </div>
  </div>
  <picture>
    <source media="(max-width: 767px)" srcset="/images/feup_buildings.svg" />
    <source media="(min-width: 767px)" srcset="/images/feup_buildings_md.svg" />
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
    <Icon src={Icons.Pin} color="white" size="40" className="py-2 pl-1" />
    <div>
      <p>Rua Dr. Roberto Frias 4200-465, Porto</p>
      <p>Sala B315</p>
    </div>
  </span>
</section>
