


<script lang="ts">
  import type { Role } from '@/types/role';
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import LabelInput from '$lib/components/forms/label-input.svelte';
  import { enhance, applyAction } from '$app/forms';
  import { sentenceFirstLetterToUpperCase } from '$lib/utils';

  let { roles = $bindable([] as Role[]) } = $props();

  let selectedRole: Role | null = $state(roles[0] ?? null);
  let dialogOpen = $state(false);
  let errorMessage = $state<string | null>(null);
</script>

<div class="flex flex-col md:flex-row  md:py-12">
  <header class="md:hidden sticky top-0 z-20 bg-gradient-to-b from-muted-red-900/95 to-muted-red-900/80 backdrop-blur-md border-b border-white/10">
    <div class="px-8 py-4 flex items-center justify-between gap-3">
      <div class="flex-1">
        <select
          class="w-full rounded-xl bg-gray-500/40 text-white px-4 py-3 border border-white/20
                 focus:outline-none focus:border-muted-red-400 appearance-none text-base font-medium"
          bind:value={selectedRole}
        >
          {#if !selectedRole}
            <option value={null} disabled selected>Selecione uma role...</option>
          {/if}
          {#each roles as role}
            <option value={role}>{role.name}</option>
          {/each}
        </select>
      </div>

      <button
        class="flex-shrink-0 flex items-center gap-2 rounded-xl bg-gray-500/40 px-4 py-3 text-white hover:bg-white/25 transition"
        onclick={() => (dialogOpen = true)}
        aria-label="Adicionar nova role"
      >
        <Icon src={Icons.Add} color="white" size="22px" />
      </button>
    </div>
  </header>

  <aside class="hidden md:flex w-80 flex-col gap-y-4 pr-12">
    {#each roles as role (role.id)}
      <button
        class="rounded-2xl px-8 py-3 text-center text-xl font-bold transition-all duration-200
               {selectedRole?.id === role.id
          ? ' bg-muted-red-500 text-white shadow-lg'
          : 'bg-white/10 text-white hover:bg-white/20'}"
        onclick={() => (selectedRole = role)}
      >
        {role.name}
      </button>
    {/each}

    <Dialog.Root bind:open={dialogOpen}>
      <Dialog.Trigger 
        class="mt-4 flex items-center gap-3 rounded-xl bg-gray-500/40 px-6 py-3.5 text-left text-xl font-medium text-white hover:bg-white/20 transition"
      >
        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500/50">
          <Icon src={Icons.Add} color="white" size="20px" />
        </div>
        Adicionar Role
      </Dialog.Trigger>
      <Dialog.Content class="rounded-3xl bg-muted-red-500 p-0">
        <form
          method="POST"
          action="?/addRole"
          use:enhance={() => {
            errorMessage = null;
            return async ({ result, formData }) => {
              const name = formData.get('name')?.toString().trim();
              if (name && roles.some((r) => r.name.toLowerCase() === name.toLowerCase())) {
                errorMessage = 'Role já existente!';
                return;
              }

              if (result.type === 'success') {
                if (result.data?.success) {
                  const newRole = result.data.data as Role;
                  roles = [...roles, newRole];
                  selectedRole = newRole;
                  dialogOpen = false;
                } else {
                  errorMessage =
                    typeof result.data?.error === 'string'
                      ? result.data.error
                      : 'Erro ao criar a role';
                }
              } else if (result.type === 'failure') {
                errorMessage =
                  typeof result.data?.error === 'string'
                    ? result.data.error
                    : 'Erro de validação';
              } else {
                errorMessage = 'Erro inesperado';
              }

              await applyAction(result);
            };
          }}
        >
          <Dialog.Header class="flex flex-col gap-y-6 p-8">
            <Dialog.Title class="text-xl">Adicionar nova role</Dialog.Title>

            <Dialog.Description>
              <div class="flex flex-col gap-y-6">
                <LabelInput
                  label="Nome"
                  id="name"
                  name="name"
                  type="text"
                  required={true}
                  class="rounded-lg bg-white px-4 py-3 text-black"
                />

                {#if errorMessage}
                  <p class="text-center font-medium text-red-300">
                    {sentenceFirstLetterToUpperCase(errorMessage)}
                  </p>
                {/if}
              </div>
            </Dialog.Description>
          </Dialog.Header>

          <Dialog.Footer class="flex flex-col rounded-md bg-white p-4 sm:flex-col">
            <div class="flex flex-row justify-end gap-6">
              <button
                type="button"
                class="text-lg text-muted-red-700"
                onclick={() => (dialogOpen = false)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="rounded-xl bg-muted-red-700 p-4 text-lg text-white shadow-xl"
              >
                Adicionar
              </button>
            </div>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  </aside>

  <div class="w-px bg-red-500"></div>

  <section class="flex-1 px-10 md:pl-12 py-6 md:py-0">
    <div class="mb-12 flex items-center justify-between">
      <h2 class="text-3xl font-bold text-white">Atividade</h2>
    </div>

    <div class="mt-20 text-gray-400">
      <p>Seleciona uma role e uma atividade para ver/editar permissões.</p>
    </div>
  </section>

</div>