<script lang="ts">
  import TechnologyCard from './technology-card.svelte';
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';

  import * as Dialog from '$lib/components/ui/dialog/index.js';

  import PictureInput from '$lib/components/forms/picture-input.svelte';

  let dialogOpen = false;
  let search = '';

  $: filtered = technologies.filter((tech) =>
    tech.name.toLowerCase().includes(search.toLowerCase())
  );

  export let technologies;

  function removeTechnology(id: number) {
    technologies = technologies.filter((t) => t.id !== id);
  }
</script>

<section class="flex flex-col gap-y-8">
  <section class="align-center flex flex-col items-center gap-4 md:flex-row md:justify-between">
    <section class="flex flex-row gap-x-4">
      <Dialog.Root bind:open={dialogOpen}>
        <Dialog.Trigger
          class="align-center flex h-10 flex-row items-center gap-x-2 rounded-md bg-gray-500/40 p-8 px-4 md:p-4 md:py-0"
        >
          <Icon src={Icons.Add} color="white" size="24px" ariaLabel="Add technology" />

          Adicionar Tecnologia
        </Dialog.Trigger>
        <Dialog.Content class="bg-muted-red-500 p-8">
          <form method="POST" action="?/addTechnology" enctype="multipart/form-data">
            <Dialog.Header class="flex flex-col gap-y-6">
              <Dialog.Title>Adicionar nova tecnologia</Dialog.Title>
              <Dialog.Description>
                <div class="flex flex-col gap-y-8">
                  <div class="grid grid-cols-[0.35fr_1.75fr] items-center gap-4">
                    <label for="name">Nome</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      class="h-5 rounded-md bg-white p-4 text-black"
                    />
                  </div>

                  <div class="grid grid-cols-[0.35fr_1.75fr] items-center gap-4">
                    <label for="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="url"
                      class="h-5 rounded-md bg-white p-4 text-black"
                    />
                  </div>

                  <div class="grid grid-cols-[0.35fr_1.75fr] items-center gap-4">
                    <label for="image">Imagem</label>

                    <PictureInput text="Adicionar imagem" name="image" />
                  </div>
                </div>
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Footer>
              <button> Submeter </button>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </section>

    <section>
      <div class="relative">
        <div class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white">
          <Icon src={Icons.Search} color="white" size="24px" ariaLabel="Search" />
        </div>

        <input
          class="w-md h-10 rounded-md bg-gray-500/40 p-4 pl-12"
          type="text"
          bind:value={search}
        />
      </div>
    </section>
  </section>

  <section class="mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
    {#each filtered as tech}
      <TechnologyCard {tech} {removeTechnology} />
    {/each}
  </section>
</section>
