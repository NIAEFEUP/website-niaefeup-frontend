<script lang="ts">
  import Dropdown from './dropdown.svelte';
  import Switch from './switch.svelte';
  import type { Role } from '@/types/role';

  let { role } = $props<{ role: Role }>();

  type PermissionCode =
    | 'CREATE_ACCOUNT'
    | 'EDIT_ACCOUNT'
    | 'DELETE_ACCOUNT'
    | 'CREATE_ACTIVITY'
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

  let superuserPermission = $state<Permission>({
    title: 'Superuser',
    description: 'Acesso total e irrestrito ao sistema. Substitui as outras permissões.',
    checked: false,
    code: 'SUPERUSER'
  });

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
        title: 'Editar Atividades',
        description: 'Permite editar informações e dados do evento',
        checked: false,
        code: 'EDIT_ACTIVITY'
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

  let isSuperUser = $derived(superuserPermission.checked);

  type AssociatedActivityPayload = {
    permissions: string[];
    activity: { title: string; id: number; [key: string]: unknown };
    [key: string]: unknown;
  };

  $effect(() => {
    if (!role) return;

    Object.keys(permissionsMap).forEach((category) => {
      permissionsMap[category].forEach((p) => (p.checked = false));
    });
    superuserPermission.checked = false;

    role.permissions.forEach((permCode: string) => {
      if (permCode === 'SUPERUSER') {
        superuserPermission.checked = true;
      } else {
        const target = permissionsMap['Equipa']?.find((p: Permission) => p.code === permCode);
        if (target) target.checked = true;
      }
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

  async function handleToggle(permission: Permission, isChecked: boolean) {
    const isGlobal = permission.code === 'SUPERUSER' || selectedOption === 'Equipa';
    const activityTitle = isGlobal ? null : activityTitleMapping[selectedOption];

    let activityId: number | null = null;

    if (!isGlobal && activityTitle) {
      const assoc = role.associatedActivities.find(
        (a: AssociatedActivityPayload) => a.activity.title === activityTitle
      );

      if (assoc) {
        activityId = assoc.activity.id as number;
      } else {
        const hardcodedIds: Record<string, number> = {
          ' TimeTable Selector': 3,
          uni: 4,
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
      permission.checked = !isChecked;
    }
  }
</script>

<div class="flex h-full w-full max-w-4xl flex-col gap-y-4">
  <div class="mb-4">
    <div
      class="flex w-full items-center justify-between gap-4 rounded-xl border-2 border-red-500 bg-red-500/10 px-4 py-4
        shadow-[0_0_15px_rgba(239,68,68,0.15)] transition-all duration-300 sm:px-6"
    >
      <div class="flex min-w-0 flex-1 flex-col pr-4">
        <span class="text-base font-bold sm:text-lg">
          {superuserPermission.title}
        </span>
        <span class="mt-1 text-xs sm:text-sm">
          {superuserPermission.description}
        </span>
      </div>
      <div class="flex-shrink-0">
        <Switch
          bind:checked={superuserPermission.checked}
          onchange={() => handleToggle(superuserPermission, superuserPermission.checked)}
        />
      </div>
    </div>
  </div>

  <div class="mb-2 h-px w-full bg-white/10"></div>
  <div
    class="mb-6 mt-2 flex w-full flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between"
  >
    <h2 class="text-3xl font-bold text-white">Atividade</h2>
    <div class="w-full sm:w-auto">
      <Dropdown
        options={['TTS', 'UNI', 'NiJobs', 'Eventos', 'Equipa']}
        selected={selectedOption}
        onchange={(option) => {
          selectedOption = option;
        }}
      />
    </div>
  </div>

  <div class="flex flex-col gap-y-3">
    {#each permissions as permission (permission.title)}
      <div
        class="flex w-full items-center justify-between gap-4 rounded-xl border-2 border-transparent bg-white/10 px-4 py-4
          transition-all duration-300 sm:px-6
          {isSuperUser ? 'opacity-40' : 'opacity-100'}"
      >
        <div class="flex min-w-0 flex-1 flex-col pr-4">
          <span class="text-base font-bold text-white sm:text-lg">
            {permission.title}
          </span>
          <span class="mt-1 text-xs text-white/60 sm:text-sm">
            {permission.description}
          </span>
        </div>
        <div class="flex-shrink-0">
          <Switch
            bind:checked={permission.checked}
            disabled={isSuperUser}
            onchange={() => handleToggle(permission, permission.checked)}
          />
        </div>
      </div>
    {/each}
  </div>
</div>
