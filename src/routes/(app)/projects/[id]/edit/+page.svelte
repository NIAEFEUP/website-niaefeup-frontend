<script>
  import LabelInput from '@/lib/components/forms/label-input.svelte';
  import PictureInput from '@/lib/components/forms/picture-input.svelte';
  import RadioButtons from '@/lib/components/forms/radio-buttons.svelte';
  import Button from '@/lib/components/button.svelte';
</script>

<div class="flex flex-col items-center">
  <div class="flex w-[65vw] flex-col items-center">
    <div class="flex w-full items-center justify-center border-b-4 border-red-500">
      <div class="flex h-[3vw]">
        <h1 class="text-4xl font-bold">Editar projeto</h1>
      </div>
    </div>
    <!-- <div class="h-1 w-[70vw] mt-5 bg-red-500"></div> -->
    <form method="POST">
      <div class="flex flex-col flex-wrap justify-center p-10">
        <div class="flex items-center justify-center">
          <p class="text-2xl font-bold">Dados Gerais</p>
        </div>
        <div class="flex flex-row items-center p-10">
          <div>
            <LabelInput label="Nome" name="dummy" horizontal />
            <!-- <div class="flex h-10 w-[50vw] items-center">
            <div class="flex w-1/6 items-center">
              <p class="font-bold">Nome*</p>
            </div>
            <input
              aria-label="text-input"
              class="mb-2 h-10 w-[30vw] rounded-lg bg-white p-2 text-primary placeholder-primary opacity-70"
              type="text"
              id="subject"
              placeholder=""
            />
          </div> -->
            <div class="mt-5">
              <LabelInput label="GitHub" horizontal />
            </div>

            <!--  <div class="mt-5 flex h-10 w-[50vw] items-center">
            <div class="flex w-1/6 items-center">
              <p class="font-bold">Github*</p>
            </div>
            <input
              aria-label="text-input"
              class="mb-2 h-10 w-[30vw] rounded-lg bg-white p-2 text-primary placeholder-primary opacity-70"
              type="text"
              id="subject"
              placeholder=""
            />
          </div> -->
            <div class="mt-5">
              <LabelInput label="Slogan" horizontal isTextArea />
            </div>
            <!-- <div class="mt-5 flex h-20 w-[50vw]">
            <div class="flex w-1/6 items-center">
              <p class="font-bold">Slogan*</p>
            </div>
            <input
              aria-label="text-input"
              class="mb-2 h-20 w-[30vw] rounded-lg bg-white p-2 text-primary placeholder-primary opacity-70"
              type="text"
              id="subject"
              placeholder=""
            />
          </div> -->
            <div class="mt-5 flex w-[50vw]">
              <div class="flex w-1/6">
                <p class="font-bold">Tipo*</p>
              </div>
              <div class="flex-col">
                <div class="flex gap-10">
                  <RadioButtons options={['aplicacao', 'website', 'outro']} horizontal />
                  <!-- <div class="flex h-10 w-[9vw] items-center justify-center rounded-xl bg-red-500">
                  <p>aplicacao</p>
                </div>
                <div class="flex h-10 w-[9vw] items-center justify-center rounded-xl bg-white">
                  <p class="text-black">website</p>
                </div>
                <div class="flex h-10 w-[9vw] items-center justify-center rounded-xl bg-white">
                  <p class="text-black">outro</p>
                </div> -->
                </div>
                <div
                  class="mt-5 flex h-40 flex-col items-center justify-center rounded-xl bg-white bg-opacity-30"
                >
                  <div class="mt-5">
                    <LabelInput label="Google Play" horizontal boxwidth="[25vw]" labelwidth="1/4" />
                  </div>

                  <!-- <div class="flex w-[25vw]">
                  <div class="flex w-1/4 items-center">
                    <p>Google Play</p>
                  </div>
                  <input
                    aria-label="text-input"
                    class=" mb-2 h-10 w-[20vw] rounded-lg bg-white p-2 text-primary placeholder-primary"
                    type="text"
                    id="subject"
                    placeholder=""
                  />
                </div> -->
                  <div class="mt-5">
                    <LabelInput label="App Store" horizontal boxwidth="[25vw]" labelwidth="1/4" />
                  </div>
                  <!-- <div class="mt-5 flex w-[25vw]">
                  <div class="flex w-1/4 items-center">
                    <p>App Store</p>
                  </div>
                  <input
                    aria-label="text-input"
                    class=" mb-2 h-10 w-[20vw] rounded-lg bg-white p-2 text-primary placeholder-primary"
                    type="text"
                    id="subject"
                    placeholder=""
                  />
                </div> -->
                </div>
              </div>
            </div>

            <div class="mt-5">
              <LabelInput label="Descricao" horizontal />
            </div>

            <!--  <div class="mt-5 flex w-[50vw]">
            <div class="flex w-1/6">
            <p class="font-bold">Descrição</p>
            </div>
            <input
            aria-label="text-input"
            class="mb-2 h-40 w-[30vw] rounded-lg bg-white p-2 text-primary placeholder-primary opacity-70"
            type="text"
            id="subject"
            placeholder=""
            />
            </div> -->
            <div class="mt-5 flex h-10 w-[50vw]">
              <div class="flex w-1/6 items-center">
                <p class="font-bold">Fotos</p>
              </div>
              <div class="flex gap-10">
                <RadioButtons options={['Selecionar ficheiro', 'image.png']} horizontal />
                <!-- <div class="flex h-10 w-[9vw] items-center justify-center rounded-xl bg-red-500">
                <p>Selecionar Ficheiro</p>
              </div>
              <div class="flex h-10 w-[9vw] items-center justify-center rounded-xl bg-white">
                <p class="text-black">Image.png</p>
              </div> -->
              </div>
            </div>

            <div class="mt-5">
              <LabelInput label="Publico Alvo" horizontal />
            </div>
            <!-- <div class="mt-5 flex h-10 w-[50vw]">
            <div class="flex w-1/6 items-center">
            <p class="font-bold">Público Alvo</p>
            </div>
            <input
            aria-label="text-input"
            class="mb-2 h-10 w-[30vw] rounded-lg bg-white p-2 text-primary placeholder-primary opacity-70"
            type="text"
            id="subject"
            placeholder=""
            />
          </div> -->
            <div class="mt-5">
              <LabelInput label="Tecnologias" horizontal isTextArea />
            </div>
            <!-- <div class="mt-5 flex w-[50vw]">
            <div class="flex w-1/6">
              <p class="font-bold">Tecnologias</p>
            </div>
            <input
              aria-label="text-input"
              class="mb-2 h-40 w-[30vw] rounded-lg bg-white p-2 text-primary placeholder-primary opacity-70"
              type="text"
              id="subject"
              placeholder=""
            />
          </div> -->
            <Button type="submit" color="primary" hoverColor="secondary" text="morra" />
            <div class="mt-[5vw] flex w-[50vw] gap-10">
              <RadioButtons options={['Guardar Alteracoes', 'Cancelar']} horizontal />
              <!-- <div class="flex h-10 w-[15vw] items-center justify-center rounded-xl bg-red-500">
              <p class="font-bold">Guardar Alterações</p>
            </div>
            <div class="flex h-10 w-[10vw] items-center justify-center rounded-xl bg-gray-500">
              <p class="font-bold">Cancelar</p>
            </div> -->
            </div>
          </div>
          <div class="self-start">
            <PictureInput />
          </div>
          <!-- <div class="flex self-start">
          <div
            class="flex h-[10vw] w-[10vw] items-center justify-center rounded-xl bg-red-500 bg-opacity-80"
          >
            <p class="font-bold">Adicionar Logo*</p>
          </div>
        </div> -->
        </div>
      </div>
    </form>
  </div>
</div>
