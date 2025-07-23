<script>
  import FileInput from '../../../../../lib/components/forms/file-input.svelte';
  import LabelInput from '../../../../../lib/components/forms/label-input.svelte';
  import PictureInput from '../../../../../lib/components/forms/picture-input.svelte';
  import Button from '../../../../../lib/components/buttons/button.svelte';
</script>

<div class="flex w-full flex-col items-center justify-around">
  <div class="flex w-full justify-center border-b-4 border-red-500 p-2">
    <h1 class="text-4xl font-bold">Editar projeto</h1>
  </div>

  <form method="POST" enctype="multipart/form-data" class="flex w-full flex-col items-center p-10">
    <p class="mb-10 text-center text-2xl font-bold">Dados Gerais</p>

    <div class="flex w-full flex-col justify-center gap-10 md:flex-row md:items-start md:p-10">
      <div class="order-2 flex w-full flex-col gap-5 md:order-1 md:w-1/2">
        <LabelInput
          label="Title"
          name="title"
          horizontal
          placeholder="Insira o texto"
          className="flex-col md:flex-row"
          textGap="10"
        />

        <LabelInput
          label="Slug"
          name="slug"
          horizontal
          placeholder="Insira o texto"
          className="flex-col md:flex-row"
          textGap="10"
        />

        <LabelInput
          label="GitHub"
          name="github"
          horizontal
          placeholder="Insira o texto"
          className="flex-col md:flex-row"
          textGap="10"
        />

        <LabelInput
          label="Slogan"
          name="slogan"
          horizontal
          isTextArea
          placeholder="Insira o texto"
          className="flex-col md:flex-row"
          textGap="10"
        />

        <LabelInput
          label="Descrição"
          name="description"
          horizontal
          placeholder="Insira o texto"
          className="flex-col md:flex-row"
          textGap="10"
        />

        <div class="flex flex-col gap-5 md:flex-row">
          <p class="w-1/6 font-bold">Fotos</p>
          <FileInput name="addFile" />
        </div>

        <LabelInput
          label="Público Alvo"
          name="public"
          horizontal
          placeholder="Insira o texto"
          className="flex-col md:flex-row"
          textGap="10"
        />

        <div class="flex w-[50vw] gap-10">
          <Button type="submit" color="reddish" hoverColor="reddish" text="Guardar Alterações" />
          <Button type="reset" color="reddish" hoverColor="reddish" text="Cancelar" />
        </div>
      </div>

      <div class="order-1 flex flex-col items-center gap-5 self-center md:order-2 md:self-start">
        <PictureInput name="image" text="logo" />
        <PictureInput name="imageMenu" text="imagem do menu" />
      </div>
    </div>
  </form>
</div>
