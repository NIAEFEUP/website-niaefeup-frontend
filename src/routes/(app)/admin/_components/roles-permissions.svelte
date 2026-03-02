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
        title: 'Permission Title A',
        description: 'Short description for permission A',
        checked: false
      },
      {
        title: 'Permission Title B',
        description: 'Short description for permission B',
        checked: false
      }
    ],
    UNI: [
      {
        title: 'Permission Title C',
        description: 'Short description for permission C',
        checked: false
      }
    ],
    NiJobs: [
      {
        title: 'Permission Title D',
        description: 'Short description for permission D',
        checked: false
      },
      {
        title: 'Permission Title E',
        description: 'Short description for permission E',
        checked: false
      },
      {
        title: 'Permission Title F',
        description: 'Short description for permission F',
        checked: false
      }
    ],
    Eventos: [
      {
        title: 'Permission Title G',
        description: 'Short description for permission G',
        checked: false
      }
    ],
    Equipa: [
      {
        title: 'Permission Title H',
        description: 'Short description for permission H',
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
