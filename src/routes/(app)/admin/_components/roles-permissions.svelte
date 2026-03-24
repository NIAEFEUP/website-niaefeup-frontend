<script lang="ts">
  import Dropdown from './dropdown.svelte';
  import Switch from './switch.svelte';
  import type { Role } from '@/types/role';
  import type { Project } from '@/types/project';

  export let role: Role;
  export let projects: Project[];

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

  // Main default state setup
  let superuserPermission: Permission = {
    title: 'Superuser',
    description:
      'Concede acesso total e irrestrito ao sistema. Ativa todas as permissões. Ao desmarcar, remove todas as permissões.',
    checked: false,
    code: 'SUPERUSER'
  };

  let permissionsMap: PermissionsMap = {
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
  };

  $: allOptions = [...(projects?.map((p: Project) => p.title) ?? []), 'Eventos', 'Equipa'];

  let selectedOption: string = allOptions[0] ?? '';

  $: if (projects && permissionsMap) {
    const hardcodedKeys = Object.keys(permissionsMap).reduce(
      (acc, key) => {
        acc[key.trim().toLowerCase()] = key;
        return acc;
      },
      {} as Record<string, string>
    );
    const globalTabs = ['equipa', 'eventos'];
    projects.forEach((project) => {
      const backendKey = project.title.trim();
      const canonical = backendKey.toLowerCase();
      if (globalTabs.includes(canonical)) return;
      if (!permissionsMap[backendKey]) {
        if (hardcodedKeys[canonical]) {
          permissionsMap[backendKey] = permissionsMap[hardcodedKeys[canonical]];
        } else {
          permissionsMap[backendKey] = [
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
          ];
        }
      }
    });
  }

  function getPermissionsForOption(option: string) {
    const canonical = option.trim().toLowerCase();
    const key = Object.keys(permissionsMap).find((k) => k.trim().toLowerCase() === canonical);
    return key ? permissionsMap[key] : [];
  }

  $: permissions = getPermissionsForOption(selectedOption);

  $: isSuperUser = superuserPermission.checked;

  $: if (role) {
    Object.keys(permissionsMap).forEach((category) => {
      permissionsMap[category].forEach((p) => (p.checked = false));
    });
    superuserPermission.checked = false;
    role.permissions.forEach((permCode: string) => {
      if (permCode === 'SUPERUSER') {
        superuserPermission.checked = true;
      } else {
        ['Equipa', 'Eventos'].forEach((section) => {
          const target = permissionsMap[section]?.find((p) => p.code === permCode);
          if (target) target.checked = true;
        });
      }
    });
    role.associatedActivities.forEach((assoc: any) => {
      const matchingCategory = Object.keys(permissionsMap).find(
        (key) =>
          assoc.activity &&
          assoc.activity.title &&
          key.toLowerCase() === assoc.activity.title.trim().toLowerCase()
      );
      if (matchingCategory && permissionsMap[matchingCategory]) {
        assoc.permissions.forEach((permCode: string) => {
          const target = permissionsMap[matchingCategory].find((p) => p.code === permCode);
          if (target) target.checked = true;
        });
      }
    });
  }

  async function handleToggle(permission: Permission, isChecked: boolean) {
    const isGlobal =
      permission.code === 'SUPERUSER' ||
      selectedOption === 'Equipa' ||
      selectedOption === 'Eventos';
    const activityTitle = isGlobal ? null : selectedOption;
    let activityId: number | null = null;
    if (!isGlobal && activityTitle) {
      const assoc = role.associatedActivities.find(
        (a: any) =>
          a.activity &&
          a.activity.title &&
          a.activity.title.trim().toLowerCase() === activityTitle.trim().toLowerCase()
      );
      if (assoc) {
        activityId = assoc.activity.id as number;
      } else {
        const matchedProject =
          projects && activityTitle
            ? projects.find(
                (p: Project) => p.title.trim().toLowerCase() === activityTitle.trim().toLowerCase()
              )
            : null;
        activityId = matchedProject ? matchedProject.id : null;
        if (!activityId) {
          throw new Error(`Erro: ID da atividade '${activityTitle}' não encontrado!`);
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
        let assoc = role.associatedActivities.find((a: any) => a.activity.title === activityTitle);
        if (!assoc && isChecked) {
          assoc = {
            id: Date.now(),
            permissions: [],
            activity: {
              id: activityId as number,
              title: activityTitle as string,
              description: '',
              teamMembers: [],
              slug: '',
              image: '',
              gallery: []
            }
          };
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
          ariaLabel={`Permissão: ${superuserPermission.title}`}
          bind:checked={superuserPermission.checked}
          onchange={async () => {
            await handleToggle(superuserPermission, superuserPermission.checked);
            for (const [category, perms] of Object.entries(permissionsMap)) {
              for (const perm of perms) {
                if (perm.code !== 'SUPERUSER') {
                  if (superuserPermission.checked && !perm.checked) {
                    perm.checked = true;
                    await handleToggle(perm, true);
                  } else if (!superuserPermission.checked && perm.checked) {
                    perm.checked = false;
                    await handleToggle(perm, false);
                  }
                }
              }
            }
          }}
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
        options={allOptions}
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
            ariaLabel={`Permissão: ${permission.title}`}
            bind:checked={permission.checked}
            disabled={isSuperUser}
            onchange={() => handleToggle(permission, permission.checked)}
          />
        </div>
      </div>
    {/each}
  </div>
</div>
