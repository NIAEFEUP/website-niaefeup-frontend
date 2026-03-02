<script lang="ts">
  import Dropdown from './dropdown.svelte';
  import Switch from './switch.svelte';

  type Permission = {
    title: string;
    description: string;
    checked: boolean;
  };

  type PermissionsMap = Record<string, Permission[]>;

  let permissionsMap: PermissionsMap = $state({
    TTS: [
      {
        title: 'Editar Página',
        description: 'Permite editar a página do projeto',
        checked: false
      },
      {
        title: 'Gerir Membros',
        description: 'Permite adicionar/remover e gerir sub-equipas e seus membros',
        checked: false
      },
      {
        title: 'Gerir Timeline',
        description: 'Permite adicionar/remover acontecimentos e gerir timeline',
        checked: false
      }
    ],
    UNI: [
      {
        title: 'Editar Página',
        description: 'Permite editar a página do projeto',
        checked: false
      },
      {
        title: 'Gerir Membros',
        description: 'Permite adicionar/remover e gerir sub-equipas e seus membros',
        checked: false
      },
      {
        title: 'Gerir Timeline',
        description: 'Permite adicionar/remover acontecimentos e gerir timeline',
        checked: false
      }
    ],
    NiJobs: [
      {
        title: 'Editar Página',
        description: 'Permite editar a página do projeto',
        checked: false
      },
      {
        title: 'Gerir Membros',
        description: 'Permite adicionar/remover e gerir sub-equipas e seus membros',
        checked: false
      },
      {
        title: 'Gerir Timeline',
        description: 'Permite adicionar/remover acontecimentos e gerir timeline',
        checked: false
      }
    ],
    Eventos: [
      {
        title: 'Adicionar eventos',
        description: 'Adicionar um evento na página de eventos',
        checked: false
      },
      {
        title: 'Editar eventos',
        description: 'Permite editar um evento',
        checked: false
      },
      {
        title: 'Eliminar eventos',
        description: 'Remover eventos',
        checked: false
      }
    ],
    Equipa: [
      {
        title: 'Adicionar Membro',
        description: 'Permite criar novos membros',
        checked: false
      },
      {
        title: 'Pesquisar Membro',
        description: 'Permite pesquisar membros',
        checked: false
      },
      {
        title: 'Gerir Membro',
        description: 'Editar informações de membros',
        checked: false
      },
      {
        title: 'Gerir Tags',
        description: 'Permite editar a página do',
        checked: false
      },
      {
        title: 'Gerir Cargos',
        description: 'Permite adicionar/remover e gerir sub-equipas e seus membros',
        checked: false
      },
      {
        title: 'Gerir Timeline',
        description: 'Permite editar membros de mandatos passados e adicionar novos mandatos ',
        checked: false
      }
    ]
  });

  let selectedOption = $state('TTS');

  let permissions = $derived(permissionsMap[selectedOption] ?? []);
</script>

<div class="flex h-full w-full flex-col gap-y-4 md:w-[350px] lg:w-[500px] xl:w-[700px]">
  <div class="mb-12 flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <h2 class="text-3xl font-bold text-white">Atividade</h2>
    <Dropdown
      onchange={(option) => {
        selectedOption = option;
      }}
    />
  </div>

  {#each permissions as permission}
    <div class="flex w-full items-center justify-between rounded-xl bg-white/10 px-6 py-4">
      <div class="flex flex-col">
        <span class="text-lg font-bold text-white">{permission.title}</span>
        <span class="text-sm text-white/60">{permission.description}</span>
      </div>
      <Switch bind:checked={permission.checked} />
    </div>
  {/each}
</div>
