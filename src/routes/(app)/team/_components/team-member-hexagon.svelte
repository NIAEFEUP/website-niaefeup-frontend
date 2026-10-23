<script lang="ts">
  import Hexagon from '$lib/components/hexagons/hexagon.svelte';
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';
  import type { TeamMember } from '@/types/team-member';

  export const orientation = 'horizontal';
  let { data, teamMember = data as TeamMember } = $props();
</script>

<Hexagon {orientation}>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div class="group relative h-full w-full outline-none" data-testid="hexagon" tabindex="0">
    <div
      data-testid="container"
      class="absolute bottom-0 z-20 w-full px-4 duration-500 group-focus-within:bottom-1/2 group-focus-within:translate-y-1/2 group-hover:bottom-1/2 group-hover:translate-y-1/2"
    >
      <p
        class="mx-auto w-[70%] text-center text-sm font-bold leading-tight text-gray-100 transition-all sm:text-sm md:text-base lg:text-lg xl:text-xl text-shadow-lg"
      >
        {teamMember.name}
      </p>
      <div
        data-testid="role"
        class="mx-auto text-center text-xs leading-tight text-gray-100 opacity-0 transition-all duration-500 ease-out group-focus-within:opacity-100 group-hover:opacity-100 sm:text-xs md:text-sm lg:text-base xl:text-lg"
      >
        {#if teamMember.roles && teamMember.roles.length > 0}
          {#each teamMember.roles as role (role.id)}
            <p>{role.name}</p>
          {/each}
        {/if}
      </div>
      <div
        class="grid grid-rows-[0fr] transition-all duration-500 ease-out group-focus-within:grid-rows-[1fr] group-hover:grid-rows-[1fr]"
      >
        <div
          class="flex min-h-0 justify-center gap-1 overflow-hidden opacity-0 transition-opacity duration-500 group-focus-within:opacity-100 group-hover:opacity-100 md:gap-2"
        >
          {#if teamMember.linkedin}
            <a
              href={teamMember.linkedin}
              class="mt-1 h-6 sm:h-6 md:h-7 lg:h-8 xl:h-9"
              aria-label="LinkedIn de {teamMember.name}"
            >
              <Icon src={Icons.Linkedin} color="white" size="100%" /></a
            >
          {/if}
          {#if teamMember.github}
            <a
              href={teamMember.github}
              class="mt-1 h-6 sm:h-6 md:h-7 lg:h-8 xl:h-9"
              aria-label="GitHub de {teamMember.name}"
              ><Icon src={Icons.Github} color="white" size="100%" /></a
            >
          {/if}
          {#if teamMember.websites}
            {#each teamMember.websites as customWebsite (customWebsite.url)}
              <a
                href={customWebsite.url}
                class="mt-1 h-5 sm:h-6 md:h-7 lg:h-8 xl:h-9"
                aria-label="Website de {teamMember.name}"
              >
                {#if customWebsite.iconPath}
                  <img
                    src={customWebsite.iconPath}
                    alt="Ícone do website de {teamMember.name}"
                    class="icon h-full w-full object-cover"
                  />
                {:else}
                  <Icon src={Icons.Globe} color="white" size="100%" />
                {/if}
              </a>
            {/each}
          {/if}
        </div>
      </div>
    </div>
    <div
      class="absolute inset-0 z-10 bg-black text-lg opacity-0 transition-opacity duration-500 group-focus-within:opacity-30 group-hover:opacity-30"
    ></div>
    <img
      src={teamMember.photo ? teamMember.photo : '/images/default_profile_pic.png'}
      alt="Membro do NIAEFEUP {teamMember.name}"
      class="z-0 h-full w-full object-cover"
    />
  </div>
</Hexagon>
