<script lang="ts">
  import Dropdown from './dropdown.svelte';
  import Switch from './switch.svelte';
  import type { Role } from '@/types/role';

  let { role } = $props<{ role: Role }>();

  type PermissionCode =
    | 'CREATE_ACCOUNT'
    // | 'VIEW_ACCOUNT'
    | 'EDIT_ACCOUNT'
    | 'DELETE_ACCOUNT'
    | 'CREATE_ACTIVITY'
    // | 'VIEW_ACTIVITY'
    | 'EDIT_ACTIVITY'
    | 'DELETE_ACTIVITY'
    | 'EDIT_SETTINGS'
    | 'SUPERUSER';

  type Permission = {
    title: string;
    description: string;
    checked: boolean;
    code: PermissionCode;
  };

  type PermissionsMap = Record<string, Permission[]>;

  // Cleaned up to ONLY use the 10 available backend permissions
  let permissionsMap: PermissionsMap = $state({
    TTS: [
      {
        title: 'Editar Atividade',
        description: 'Permite editar página, timeline e dados do projeto',
        checked: false,
        code: 'EDIT_ACTIVITY'
      },
      {
        title: 'Apagar Atividade',
        description: 'Permite eliminar a atividade do sistema',
        checked: false,
        code: 'DELETE_ACTIVITY'
      }
    ],
    UNI: [
      {
        title: 'Editar Atividade',
        description: 'Permite editar página, timeline e dados do projeto',
        checked: false,
        code: 'EDIT_ACTIVITY'
      },
      {
        title: 'Apagar Atividade',
        description: 'Permite eliminar a atividade do sistema',
        checked: false,
        code: 'DELETE_ACTIVITY'
      }
    ],
    NiJobs: [
      {
        title: 'Editar Atividade',
        description: 'Permite editar página, timeline e dados do projeto',
        checked: false,
        code: 'EDIT_ACTIVITY'
      },
      {
        title: 'Apagar Atividade',
        description: 'Permite eliminar a atividade do sistema',
        checked: false,
        code: 'DELETE_ACTIVITY'
      }
    ],
    Eventos: [
      {
        title: 'Criar Atividade',
        description: 'Permite criar novas atividades e eventos globais',
        checked: false,
        code: 'CREATE_ACTIVITY'
      },
      {
        title: 'Editar Atividade',
        description: 'Permite editar informações e dados do evento',
        checked: false,
        code: 'EDIT_ACTIVITY'
      },
      {
        title: 'Apagar Atividade',
        description: 'Permite eliminar a atividade do sistema',
        checked: false,
        code: 'DELETE_ACTIVITY'
      }
    ],
    Equipa: [
      {
        title: 'Criar Membros',
        description: 'Permite registar novos membros no sistema',
        checked: false,
        code: 'CREATE_ACCOUNT'
      },
      {
        title: 'Editar Membros',
        description: 'Permite editar informações e cargos de membros',
        checked: false,
        code: 'EDIT_ACCOUNT'
      },
      {
        title: 'Apagar Membros',
        description: 'Permite remover membros do sistema',
        checked: false,
        code: 'DELETE_ACCOUNT'
      },
      {
        title: 'Criar Atividades',
        description: 'Permite criar novos projetos e eventos globais',
        checked: false,
        code: 'CREATE_ACTIVITY'
      },
      {
        title: 'Apagar Atividades',
        description: 'Permite eliminar projetos e eventos do sistema',
        checked: false,
        code: 'DELETE_ACTIVITY'
      },
      {
        title: 'Gerir Configurações',
        description: 'Permite alterar configurações e tags gerais',
        checked: false,
        code: 'EDIT_SETTINGS'
      },
      {
        title: 'Superuser',
        description: 'Acesso total e irrestrito ao sistema',
        checked: false,
        code: 'SUPERUSER'
      }
    ]
  });

  const activityTitleMapping: Record<string, string> = {
    TTS: ' TimeTable Selector',
    UNI: 'uni',
    NiJobs: 'NiJobs',
    Eventos: 'Eventos'
  };

  let selectedOption = $state('TTS');
  let permissions = $derived(permissionsMap[selectedOption] ?? []);

  type AssociatedActivityPayload = {
    permissions: string[];
    activity: { title: string; id: number; [key: string]: unknown };
    [key: string]: unknown;
  };

  // Keep UI in sync with Role object when changing tabs
  $effect(() => {
    if (!role) return;

    Object.keys(permissionsMap).forEach((category) => {
      permissionsMap[category].forEach((p) => (p.checked = false));
    });

    role.permissions.forEach((permCode: string) => {
      const target = permissionsMap['Equipa']?.find((p: Permission) => p.code === permCode);
      if (target) target.checked = true;
    });

    role.associatedActivities.forEach((assoc: AssociatedActivityPayload) => {
      const uiCategory = Object.keys(activityTitleMapping).find(
        (key) => activityTitleMapping[key] === assoc.activity.title
      );

      if (uiCategory && permissionsMap[uiCategory]) {
        assoc.permissions.forEach((permCode: string) => {
          const target = permissionsMap[uiCategory].find((p: Permission) => p.code === permCode);
          if (target) target.checked = true;
        });
      }
    });
  });

  // Handle saving to the backend
  async function handleToggle(permission: Permission, isChecked: boolean) {
    const isGlobal = selectedOption === 'Equipa';
    const activityTitle = isGlobal ? null : activityTitleMapping[selectedOption];

    let activityId: number | null = null;

    if (!isGlobal && activityTitle) {
      const assoc = role.associatedActivities.find(
        (a: AssociatedActivityPayload) => a.activity.title === activityTitle
      );

      if (assoc) {
        activityId = assoc.activity.id as number;
      } else {
        // FALLBACK IDs: Update 10 and 11 to the actual DB IDs for NiJobs and Eventos!
        const hardcodedIds: Record<string, number> = {
          ' TimeTable Selector': 3, // based on the json provided earlier, activity ID is 3 for TTS
          uni: 4, // based on the json provided earlier, activity ID is 4 for uni
          NiJobs: 10,
          Eventos: 11
        };
        activityId = hardcodedIds[activityTitle] || null;

        if (!activityId) {
          alert(`Erro: ID da atividade '${activityTitle}' não encontrado!`);
          permission.checked = !isChecked;
          return;
        }
      }
    }

    const payload = {
      permission: permission.code,
      action: isChecked ? 'grant' : 'revoke',
      activityId: activityId
    };

    try {
      const res = await fetch(`/api/roles/${role.id}/permissions`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to update permission');

      // Update local state to persist UI visually
      if (isGlobal) {
        if (isChecked) {
          role.permissions.push(permission.code);
        } else {
          role.permissions = role.permissions.filter((p: string) => p !== permission.code);
        }
      } else {
        let assoc = role.associatedActivities.find(
          (a: AssociatedActivityPayload) => a.activity.title === activityTitle
        );

        if (!assoc && isChecked) {
          assoc = {
            id: Date.now(),
            permissions: [],
            activity: { title: activityTitle as string, id: activityId as number }
          } as unknown as AssociatedActivityPayload;
          role.associatedActivities.push(assoc);
        }

        if (assoc) {
          if (isChecked) {
            assoc.permissions.push(permission.code);
          } else {
            assoc.permissions = assoc.permissions.filter((p: string) => p !== permission.code);
          }
        }
      }
    } catch (error) {
      console.error(error);
      permission.checked = !isChecked; // Revert switch visually
    }
  }
</script>

<div class="flex h-full w-full flex-col gap-y-4 md:w-[350px] lg:w-[500px] xl:w-[700px]">
  <div class="mb-12 flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <h2 class="text-3xl font-bold text-white">Atividade</h2>
    <Dropdown
      options={['TTS', 'UNI', 'NiJobs', 'Eventos', 'Equipa']}
      selected={selectedOption}
      onchange={(option) => {
        selectedOption = option;
      }}
    />
  </div>

  {#each permissions as permission (permission.title)}
    <div class="flex w-full items-center justify-between rounded-xl bg-white/10 px-6 py-4">
      <div class="flex flex-col">
        <span class="text-lg font-bold text-white">{permission.title}</span>
        <span class="text-sm text-white/60">{permission.description}</span>
      </div>
      <Switch
        bind:checked={permission.checked}
        onchange={() => handleToggle(permission, permission.checked)}
      />
    </div>
  {/each}
</div>
