<script lang="ts">
  import ProjectFormsInput from '../../_components/project-forms-input.svelte';
  import type { PageData } from './$types';
  import FileInput from '@/lib/components/forms/file-input.svelte';
  import PictureInput from '@/lib/components/forms/picture-input.svelte';
  import Button from '@/lib/components/buttons/button.svelte';
  import { enhance } from '$app/forms';

  let { data }: { data: PageData } = $props();
  const project = $derived(data.project);

  let galleryValue = $state<(string | File)[]>([]);

  $effect(() => {
    void JSON.stringify(data.project.gallery);
    galleryValue = [...data.project.gallery];
  });

  let submitError = $state('');

  function validateForm(event: SubmitEvent) {
    submitError = '';
    const form = event.currentTarget as HTMLFormElement;

    const requiredFields: Array<{ name: string; label: string }> = [
      { name: 'title', label: 'Title' },
      { name: 'slug', label: 'Slug' },
      { name: 'description', label: 'Descrição' },
      { name: 'public', label: 'Público Alvo' }
    ];

    for (const field of requiredFields) {
      const input = form.elements.namedItem(field.name);
      if (!(input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement)) continue;

      if (input.value.trim().length === 0) {
        event.preventDefault();
        input.setCustomValidity(`${field.label} é obrigatório.`);
        input.reportValidity();
        return;
      }

      input.setCustomValidity('');
    }

    const githubInput = form.elements.namedItem('github');
    if (githubInput instanceof HTMLInputElement) {
      const githubValue = githubInput.value;
      if (githubValue.length > 0 && githubValue.trim().length === 0) {
        event.preventDefault();
        githubInput.setCustomValidity('O campo GitHub não pode conter apenas espaços.');
        githubInput.reportValidity();
        return;
      }
      githubInput.setCustomValidity('');
    }
  }
</script>

<div class="flex w-full flex-col items-center justify-around">
  <div class="flex w-full justify-center border-b-4 border-red-500 p-2">
    <h1 class="text-4xl font-bold">Editar projeto</h1>
  </div>

  <form
    method="POST"
    enctype="multipart/form-data"
    class="flex w-full flex-col items-center p-10"
    onsubmit={validateForm}
    use:enhance={() => {
      return async ({ result, update }) => {
        submitError =
          result.type === 'failure' ||
          (result.type === 'success' && (result.data as unknown) === false)
            ? 'Não foi possível guardar as alterações. Verifica os campos e tenta novamente.'
            : '';
        await update({ reset: false });
      };
    }}
  >
    <h2 class="mb-10 text-center text-2xl font-bold">Dados Gerais</h2>

    <div class="flex w-full flex-col justify-center gap-10 md:flex-row md:items-start">
      <div class="order-2 flex w-full flex-col gap-5 md:order-1 md:w-1/2">
        <ProjectFormsInput
          label="Title"
          name="title"
          horizontal={true}
          required={true}
          minlength={2}
          maxlength={500}
          value={project.title}
        />

        <ProjectFormsInput
          label="Slug"
          name="slug"
          horizontal={true}
          required={true}
          minlength={2}
          maxlength={500}
          value={project.slug}
        />

        <ProjectFormsInput
          label="GitHub"
          name="github"
          type="url"
          horizontal={true}
          value={project.github}
        />

        <ProjectFormsInput
          label="Slogan"
          name="slogan"
          horizontal={true}
          minlength={2}
          maxlength={100}
          value={project.slogan}
        />

        <ProjectFormsInput
          label="Descrição"
          name="description"
          horizontal={true}
          isTextArea
          required={true}
          minlength={10}
          maxlength={10000}
          value={project.description}
        />

        <div class="flex flex-col gap-2 md:flex-row">
          <p class="w-1/6 font-bold">Fotos</p>
          <FileInput name="gallery" bind:value={galleryValue} />
        </div>

        <ProjectFormsInput
          label="Público Alvo"
          name="public"
          horizontal={true}
          required={true}
          minlength={2}
          maxlength={250}
          value={project.targetAudience}
        />

        <div class="flex w-[50vw] gap-10">
          <Button type="submit" color="secondary" hoverColor="red" text="Guardar Alterações" />
          <Button type="reset" color="secondary" hoverColor="red" text="Cancelar" />
        </div>
        {#if submitError}
          <p class="text-sm font-semibold text-red-300">{submitError}</p>
        {/if}
      </div>

      <div class="order-1 flex flex-col items-center gap-5 self-center md:order-2 md:self-start">
        <PictureInput name="image" text="Adicionar logo" value={project.image} />
        <PictureInput name="thumbnail" text="Adicionar imagem menu" value={project.thumbnail} />
      </div>
    </div>
  </form>
</div>
