<script lang="ts">
  import type { PageData } from './$types';
  import type { Event } from '@/types/event';
  import PictureInput from '$lib/components/forms/picture-input.svelte';
  import LabelInput from '$lib/components/forms/label-input.svelte';
  import Button from '$lib/components/buttons/button.svelte';
  import FormsHeader from '$lib/components/forms-header.svelte';
  import { toISOLocal } from '$lib/utils.ts'

  export let data: PageData;
  export let event: Event = data.event;
</script>

{#await event}
  <p>...waiting</p>
{:then event}
  <div class="flex h-full flex-col">
    <FormsHeader label="Editar Evento" />

    <div class="flex w-[100] flex-grow flex-col justify-around md:flex-row">
      <form
        method="POST"
        enctype="multipart/form-data"
        class="flex flex-col font-semibold md:flex-row md:gap-64"
      >
        <div class="order-2 ml-5 mt-5 flex flex-col content-start justify-center gap-10 md:order-1">
          <LabelInput
            label="Título"
            name="Title"
            type="text"
            placeholder="Insira o texto"
            horizontal
            textGap="25"
            required="{true};"
            value={event.title}
            className="flex-col ml-5 mr-5 md:flex-row md:ml-0 md:mr-0"
          />
          <LabelInput
            label="Slug"
            name="Slug"
            type="text"
            placeholder="Insira o texto"
            horizontal
            textGap="25"
            value={event.slug}
            required={true}
            className="flex-col ml-5 mr-5 md:flex-row md:ml-0 md:mr-0"
          />
          <LabelInput
            label="Início"
            name="DateStart"
            type="datetime-local"
            placeholder="Insira o texto"
            horizontal
            textGap="25"
            required={true}
            value={toISOLocal(event.dateInterval.startDate)}
            className="flex-col ml-5 mr-5 md:flex-row md:ml-0 md:mr-0"
          />
          <LabelInput
            label="Fim"
            name="DateEnd"
            type="datetime-local"
            placeholder="12-02-2025 12:30"
            horizontal
            textGap="25"
            required={true}
            value={toISOLocal(event.dateInterval.endDate)}
            className="flex-col ml-5 mr-5 md:flex-row md:ml-0 md:mr-0"
          />
          <LabelInput
            label="Descrição"
            name="Description"
            type="text"
            placeholder="Insira o texto"
            horizontal
            textGap="25"
            value={event.description}
            required="{true};"
            className="flex-col ml-5 mr-5 md:flex-row md:ml-0 md:mr-0"
          />
          <LabelInput
            label="Inscrição"
            name="SignUp"
            type="text"
            placeholder="Insira o texto"
            horizontal
            textGap="25"
            value={event.registerUrl}
            className="flex-col ml-5 mr-5 md:flex-row md:ml-0 md:mr-0"
          />
          <LabelInput
            label="Localização"
            name="Place"
            type="text"
            placeholder="Insira o texto"
            horizontal
            textGap="25"
            value={event.location}
            className="flex-col ml-5 mr-5 md:flex-row md:ml-0 md:mr-0"
          />

          <div class="ml-5 mr-5 flex flex-row gap-16 md:ml-0 md:flex-row">
            <Button
              type="button"
              color="primary"
              hoverColor="secondary"
              width="large"
              text="Selecionar Ficheiros"
            />
            <p class="flex items-center justify-center font-semibold">
              Nenhum Ficheiro Selecionado
            </p>
          </div>

          <div class="ml-5 mr-5 flex flex-row md:ml-0">
            <Button
              type="submit"
              color="primary"
              hoverColor="primary"
              width="large"
              text="Guardar Alterações"
            />
          </div>
        </div>

        <div class="order-1 mt-20 flex flex-col align-top md:order-2">
          <PictureInput text="Insira a Imagem" name="image" source={event.image} />
        </div>
      </form>
    </div>
  </div>
{/await}
