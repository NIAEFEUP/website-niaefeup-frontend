<script>
  import PictureInput from '$lib/components/forms/picture-input.svelte';
  import LabelInput from '$lib/components/forms/label-input.svelte';
</script>

<div>
  <div class="flex flex-row">
    <p class="ml-11 text-5xl font-bold">Novo Evento</p>
  </div>

  <div class="mx-auto my-8 h-1 w-[97%] bg-red-500"></div>

  <div class="flex flex-row">
    <div class="ml-60 mr-40 mt-10 flex flex-col gap-10 font-semibold">
      <LabelInput
        label="Título*"
        id="caixa de texto1"
        type="text"
        placeholder="Insira o texto"
        isTextArea={false}
        horizontal={true}
      />
      <LabelInput
        label="Data / Hora*"
        id="caixa de texto2"
        type="text"
        placeholder="Insira o texto"
        isTextArea={false}
        horizontal={true}
      />
      <LabelInput
        label="Localização*"
        id="caixa de texto3"
        type="text"
        placeholder="Insira o texto"
        isTextArea={false}
        horizontal={true}
      />
      <LabelInput
        label="Descrição"
        id="caixa de texto4"
        type="text"
        placeholder="Insira o texto"
        isTextArea={false}
        horizontal={true}
      />
      <LabelInput
        label="Inscrição"
        id="caixa de texto5"
        type="text"
        placeholder="Insira o texto"
        isTextArea={false}
        horizontal={true}
      />
      <div class="mt-5 flex flex-row gap-16">
        <div class="flex h-10 w-48 items-center justify-center rounded-lg bg-red-400 font-semibold">
          Selecionar Ficheiros
        </div>
        <p class="flex items-center justify-center font-semibold">Nenhum Ficheiro Selecionado</p>
      </div>
      <div class="flex h-12 w-48 items-center justify-center rounded-lg bg-red-500 font-bold">
        Guardar Alterações
      </div>
    </div>

    <div class="ml-80 mt-20 flex flex-col">
      <PictureInput text="Insira a Imagem" name="Profile Picture" />
    </div>
  </div>
</div>
