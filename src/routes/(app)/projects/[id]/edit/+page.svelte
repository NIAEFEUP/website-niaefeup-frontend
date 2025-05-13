<script>
  import LabelInput from '@/lib/components/forms/label-input.svelte';
  import PictureInput from '@/lib/components/forms/picture-input.svelte';
  import RadioButtons from '@/lib/components/forms/radio-buttons.svelte';
  import Button from '@/lib/components/button.svelte';
</script>

<div class="flex w-full flex-col items-center">
  <!-- Header -->
  <div class="flex w-full justify-center border-b-4 border-red-500 p-2">
    <h1 class="text-4xl font-bold">Editar projeto</h1>
  </div>

  <form method="POST" class="w-full flex flex-col items-center p-10">
    <p class="mb-10 text-center text-2xl font-bold">Dados Gerais</p>

    <div class="flex w-full flex-col gap-10 md:flex-row md:items-start md:p-10 justify-center">
      <!-- Left column -->
      <div class="order-2 flex w-full flex-col gap-5 md:order-1 md:w-1/2">
        <LabelInput
          label="Title"
          name="title"
          horizontal
          required
          placeholder="Insira o texto"
          className="flex-col md:flex-row"
          textGap="10"
        />

        <LabelInput
          label="Slug"
          name="slug"
          horizontal
          required
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

        <div class="flex w-[50vw] flex-col gap-5 md:flex-row">
          <p class="w-1/6 font-bold">Tipo*</p>

          <div class="flex flex-col gap-5">
            <RadioButtons
              options={['aplicacao', 'website', 'outro']}
              horizontal
            />

            <div class="flex flex-col gap-5 rounded-xl bg-white bg-opacity-30 p-5">
              <LabelInput
                label="Google Play"
                horizontal
                labelwidth="1/4"
                name="googleplay"
                placeholder="Insira o texto"
                className="flex-col md:flex-row"
                textGap="10"
              />

              <LabelInput
                label="App Store"
                horizontal
                boxwidth="[25vw]"
                labelwidth="1/4"
                name="appstore"
                placeholder="Insira o texto"
                className="flex-col md:flex-row"
                textGap="10"
              />
            </div>
          </div>
        </div>

        <LabelInput
          label="Descrição"
          name="description"
          horizontal
          required
          placeholder="Insira o texto"
          className="flex-col md:flex-row"
          textGap="10"
        />

        <div class="flex flex-col gap-5 md:flex-row">
          <p class="w-1/6 font-bold">Fotos</p>
          <RadioButtons
            options={['Selecionar ficheiro', 'image.png']}
            horizontal
          />
        </div>

        <LabelInput
          label="Público Alvo"
          name="public"
          horizontal
          required
          placeholder="Insira o texto"
          className="flex-col md:flex-row"
          textGap="10"
        />

        <div class="flex w-[50vw] gap-10">
          <RadioButtons options={['Guardar Alteracoes', 'Cancelar']} horizontal />
        </div>

        <Button type="submit" color="primary" hoverColor="secondary" text="morra" />
      </div>

      <!-- Right column: pictures -->
      <div class="order-1 flex flex-col items-center gap-5 md:order-2 self-center md:self-start">
        <PictureInput label="Image" name="image" text="logo" />
        <PictureInput label="Image" name="imageMenu" text="imagem do menu" />
      </div>
    </div>
  </form>
</div>




<!-- <div class="flex flex-col items-center">
  <div class="flex w-full flex-col items-center">
    <div class="flex w-full items-center justify-center border-b-4 border-red-500">
      <h1 class="text-4xl font-bold">Editar projeto</h1>
    </div>
    <form method="POST">
      <div class="flex flex-col flex-wrap justify-center p-10">
        <div class="flex items-center justify-center">
          <p class="text-2xl font-bold">Dados Gerais</p>
        </div>
        <div class="flex flex-col md:flex-row md:items-center md:p-10">
          <div class="order-2 mr-5 flex flex-col md:order-1">
            <LabelInput
              label="Title"
              name="title"
              horizontal
              required
              placeholder="Insira o texto"
              className="flex-col mr-5 md:flex-row mde:ml-0 md:mr-0"
              textGap="10"
            />
            <div class="mt-5">
              <LabelInput
                label="Slug"
                name="slug"
                horizontal
                required
                placeholder="Insira o texto"
                className="flex-col mr-5 md:flex-row mde:ml-0 md:mr-0"
                textGap="10"
              />
            </div>
            <div class="mt-5">
              <LabelInput
                label="GitHub"
                name="github"
                horizontal
                placeholder="Insira o texto"
                className="flex-col mr-5 md:flex-row mde:ml-0 md:mr-0"
                textGap="10"
              />
            </div>
            <div class="mt-5">
              <LabelInput
                label="Slogan"
                name="slogan"
                horizontal
                isTextArea
                placeholder="Insira o texto"
                className="flex-col mr-5 md:flex-row mde:ml-0 md:mr-0"
                textGap="10"
              />
            </div>
            <div class="mt-5 flex flex w-[50vw] flex-col md:flex-row">
              <div class="flex w-1/6">
                <p class="font-bold">Tipo*</p>
              </div>
              <div class="flex-col">
                <div class="flex gap-10">
                  <RadioButtons
                    options={['aplicacao', 'website', 'outro']}
                    horizontal
                    placeholder="Insira o texto"
                  />
                </div>
                <div class="mt-5 flex flex-col items-center rounded-xl bg-white bg-opacity-30">
                  <div class="mt-5">
                    <LabelInput
                      label="Google Play"
                      horizontal
                      labelwidth="1/4"
                      name="googleplay"
                      placeholder="Insira o texto"
                      className="flex-col mr-5 md:flex-row mde:ml-0 md:mr-0"
                      textGap="10"
                    />
                  </div>
                  <div class="mt-5 pb-5">
                    <LabelInput
                      label="App Store"
                      horizontal
                      boxwidth="[25vw]"
                      labelwidth="1/4"
                      name="appstore"
                      placeholder="Insira o texto"
                      className="flex-col mr-5 md:flex-row mde:ml-0 md:mr-0"
                      textGap="10"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-5">
              <LabelInput
                label="Descrição"
                name="description"
                horizontal
                required
                placeholder="Insira o texto"
                className="flex-col mr-5 md:flex-row mde:ml-0 md:mr-0"
                textGap="10"
              />
            </div>
            <div class="mt-5 flex flex-col md:mt-5 md:flex-row">
              <div class="flex w-1/6 items-center">
                <p class="font-bold">Fotos</p>
              </div>
              <div class="flex gap-10">
                <RadioButtons options={['Selecionar ficheiro', 'image.png']} horizontal />
              </div>
            </div>
            <div class="mt-5">
              <LabelInput
                label="Público Alvo"
                name="description"
                horizontal
                required
                placeholder="Insira o texto"
                className="flex-col mr-5 md:flex-row mde:ml-0 md:mr-0"
                textGap="10"
              />
              se colocar 20 da certo no mobile
            </div>
            <div class="mt-[5vw] flex w-[50vw] gap-10">
              <RadioButtons options={['Guardar Alteracoes', 'Cancelar']} horizontal />
            </div>
            <Button type="submit" color="primary" hoverColor="secondary" text="morra" />
          </div>
          <div class="order-1 order-1 flex flex-col self-center md:self-start">
            <div>
              <PictureInput label="Image" name="image" text="logo" />
            </div>
            <div class="self-start">
              <PictureInput label="Image" name="image" text="imagem do menu" />
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
 -->