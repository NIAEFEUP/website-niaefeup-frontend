<script lang="ts">
  import type { Role } from '@/types/role';
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import LabelInput from '$lib/components/forms/label-input.svelte';
  import { enhance, applyAction } from '$app/forms';
  import { sentenceFirstLetterToUpperCase } from '$lib/utils';
  import type { BackendError } from '@/types/backend-error';

  interface Props {
    roles: Role[];
  }
  let { roles = $bindable() }: Props = $props();
  let selectedRole: Role | null = $state(roles[0] ?? null);
  let dialogOpen = $state(false);
  let errorMessage: BackendError | null = $state(null);
</script>

<Dialog.Root bind:open={dialogOpen}>
  <div class="flex flex-col md:flex-row md:py-12">
    <header
      class="from-muted-red-900/95 to-muted-red-900/80 sticky top-0 z-20 border-b border-white/10 bg-gradient-to-b backdrop-blur-md md:hidden"
    >
      <div class="flex items-center justify-between gap-3 px-8 py-4">
        <div class="flex-1">
          <select
            class="w-full appearance-none rounded-xl border border-white/20 bg-gray-500/40 px-4 py-3
                   text-base font-medium text-white focus:border-muted-red-400 focus:outline-none"
            bind:value={selectedRole}
            aria-label="Selecionar role"
          >
            {#if !selectedRole}
              <option value={null} disabled selected>Selecione uma role...</option>
            {/if}
            {#each roles as role (role.id)}
              <option value={role}>{role.name}</option>
            {/each}
          </select>
        </div>

        <Dialog.Trigger
          class="flex flex-shrink-0 items-center gap-2 rounded-xl bg-gray-500/40 px-4 py-3 text-white transition hover:bg-white/25"
          aria-label="Adicionar nova role"
        >
          <Icon src={Icons.Add} color="white" size="22px" />
        </Dialog.Trigger>
      </div>
    </header>

    <aside class="hidden w-80 flex-col gap-y-4 pr-12 md:flex">
      {#each roles as role (role.id)}
        <button
          class="rounded-2xl px-8 py-3 text-center text-xl font-bold transition-all duration-200
                 {selectedRole?.id === role.id
            ? ' bg-muted-red-500 text-white shadow-lg'
            : 'bg-white/10 text-white hover:bg-white/20'}"
          onclick={() => (selectedRole = role)}
          aria-label={`Selecionar role ${role.name}`}
        >
          {role.name}
        </button>
      {/each}

      <Dialog.Trigger
        class="mt-4 flex items-center gap-3 rounded-xl bg-gray-500/40 px-6 py-3.5 text-left text-xl font-medium text-white transition hover:bg-white/20"
      >
        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500/50">
          <Icon src={Icons.Add} color="white" size="20px" />
        </div>
        Adicionar Role
      </Dialog.Trigger>
    </aside>

    <Dialog.Content class="rounded-3xl bg-muted-red-500 p-0">
      <form
        method="POST"
        action="?/addRole"
        use:enhance={({ formData }) => {
          errorMessage = null;

          const name = formData.get('name')?.toString().trim();

          if (name && roles.some((r) => r.name.toLowerCase() === name.toLowerCase())) {
            errorMessage = { message: 'Role já existente!' };
            return;
          }
          return async ({ result }) => {
            if (result.type === 'success') {
              if (result.data?.success) {
                const newRole = result.data.data as Role;
                roles = [...roles, newRole];
                selectedRole = newRole;
                dialogOpen = false;

                await applyAction(result);
              } else {
                errorMessage = {
                  message:
                    typeof result.data?.error === 'string'
                      ? result.data.error
                      : 'Erro ao criar a role'
                };
              }
            } else if (result.type === 'failure') {
              errorMessage = {
                message:
                  typeof result.data?.error === 'string' ? result.data.error : 'Erro de validação'
              };
            } else {
              errorMessage = { message: 'Erro inesperado' };
            }
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
                  {sentenceFirstLetterToUpperCase(errorMessage.message)}
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

    <div class="w-px bg-red-500"></div>

    <section class="flex-1 px-10 py-6 md:py-0 md:pl-12">
      <div class="mb-12 flex items-center justify-between">
        <h2 class="text-3xl font-bold text-white">Atividade</h2>
      </div>

      <div class="mt-20 text-gray-400">
        <p>Seleciona uma role e uma atividade para ver/editar permissões.</p>
      </div>
    </section>
  </div>
</Dialog.Root>
