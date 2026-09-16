<script lang="ts">
  import type { SubmitFunction } from '@sveltejs/kit';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';
  import { enhance } from '$app/forms';
  import type { Technology } from '@/types/technology';

  let { tech, removeTechnology }: { tech: Technology; removeTechnology: (id: number) => void } =
    $props();

  let dialogOpen = $state(false);
  let deleteError = $state<string | null>(null);

  const deleteTechnology: SubmitFunction = ({ formData }) => {
    deleteError = null;

    return async ({ result }) => {
      if (result.type === 'success' && result.data?.success) {
        removeTechnology(Number(formData.get('id')));
        dialogOpen = false;
      } else {
        deleteError = 'Falha ao eliminar tecnologia. Tenta novamente.';
      }
    };
  };
</script>

<article
  class="mx-auto flex h-10 w-[16em] flex-row items-center justify-between rounded-3xl bg-gray-500/25 p-4"
>
  <div class="align-center mr-4 flex flex-row items-center gap-x-2">
    <div class="h-8 w-8 rounded-full">
      <img src={tech.image} alt="Technology logo" class="h-full w-full object-cover" />
    </div>
    <p class="drop-shadow-xl">{tech.name}</p>
  </div>

  <Dialog.Root bind:open={dialogOpen}>
    <Dialog.Trigger>
      <Icon src={Icons.Trash} color="white" size="24px" ariaLabel="Trash" />
    </Dialog.Trigger>
    <Dialog.Content class="p-4">
      <Dialog.Header>
        <Dialog.Title>Tens a certeza que queres eliminar {tech.name}?</Dialog.Title>
      </Dialog.Header>
      <Dialog.Footer>
        {#if deleteError}
          <p class="mb-2 text-center text-red-500">{deleteError}</p>
        {/if}
        <form method="POST" action="?/deleteTechnology" use:enhance={deleteTechnology}>
          <input type="hidden" name="id" value={tech.id} />
          <button
            type="submit"
            class="h-10 rounded-md bg-muted-red-500 px-4"
            aria-label="Confirm deletion of {tech.name}"
          >
            Confirmar
          </button>
        </form>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
</article>
