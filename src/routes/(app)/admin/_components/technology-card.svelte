<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog/index.js';

  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';

  import { enhance } from '$app/forms';

  export let tech;
  export let removeTechnology;

  let dialogOpen = false;

  async function deleteTechnology(e) {
    removeTechnology(Number(e.formData.get('id')));
    dialogOpen = false;
  }
</script>

<article
  class="mx-auto flex h-10 w-[16em] flex-row items-center justify-between rounded-3xl bg-gray-500/25 p-4"
>
  <div class="align-center mr-4 flex flex-row items-center gap-x-2">
    <img src={tech.image} alt="Technology logo" class="h-8 w-8 rounded-full" />
    <p class="uppercase drop-shadow-xl">{tech.name}</p>
  </div>

  <Dialog.Root bind:open={dialogOpen}>
    <Dialog.Trigger>
      <Icon src={Icons.Trash} color="white" size="24px" ariaLabel="Trash" />
    </Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Tens a certeza que queres eliminar esta tecnologia?</Dialog.Title>
      </Dialog.Header>
      <Dialog.Footer>
        <form method="POST" action="?/deleteTechnology" use:enhance={deleteTechnology}>
          <input type="hidden" name="id" value={tech.id} />
          <button class="h-10 rounded-md bg-muted-red-500 px-4"> Confirmar </button>
        </form>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
</article>
