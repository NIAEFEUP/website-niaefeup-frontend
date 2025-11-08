<script lang="ts">
  import ProjectFormsInput from '../../_components/project-forms-input.svelte';
  import type { PageData } from './$types';
  import FileInput from '@/lib/components/forms/file-input.svelte';
  import PictureInput from '@/lib/components/forms/picture-input.svelte';
  import Button from '@/lib/components/buttons/button.svelte';
  import type { Project } from '@/types/project';

  let { data }: { data: PageData } = $props();
  const project: Project = data.project;
</script>

<div class="flex w-full flex-col items-center justify-around">
  <div class="flex w-full justify-center border-b-4 border-red-500 p-2">
    <h1 class="text-4xl font-bold">Editar projeto</h1>
  </div>

  <form method="POST" enctype="multipart/form-data" class="flex w-full flex-col items-center p-10">
    <h2 class="mb-10 text-center text-2xl font-bold">Dados Gerais</h2>

    <div class="flex w-full flex-col justify-center gap-10 md:flex-row md:items-start md:p-10">
      <div class="order-2 flex w-full flex-col gap-5 md:order-1 md:w-1/2">
        <ProjectFormsInput label="Title" name="title" value={project.title} />

        <ProjectFormsInput label="Slug" name="slug" value={project.slug} />

        <ProjectFormsInput label="GitHub" name="github" value={project.github} />

        <ProjectFormsInput label="Slogan" name="slogan" isTextArea value={project.slogan} />

        <ProjectFormsInput label="Descrição" name="description" value={project.description} />

        <div class="flex flex-col gap-2 md:flex-row">
          <p class="w-1/6 font-bold">Fotos</p>
          <FileInput name="gallery", value={project.gallery} />
        </div>

        <ProjectFormsInput label="Público Alvo" name="public" value={project.targetAudience} />

        <div class="flex w-[50vw] gap-10">
          <Button type="submit" color="secondary" hoverColor="red" text="Guardar Alterações" />
          <Button type="reset" color="secondary" hoverColor="red" text="Cancelar" />
        </div>
      </div>

      <div class="order-1 flex flex-col items-center gap-5 self-center md:order-2 md:self-start">
        <PictureInput name="image" text="Adicionar logo"  value={project.image}/>
        <PictureInput name="thumbnail" text="Adicionar imagem menu" value={project.thumbnail} />
      </div>
    </div>
  </form>
</div>
