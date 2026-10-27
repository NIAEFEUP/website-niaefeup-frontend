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
  <div
    class="group @container relative h-full w-full outline-none"
    data-testid="hexagon"
    tabindex="0"
  >
    <div
      data-testid="container"
      class="absolute bottom-[12%] z-20 w-full px-[6cqw] duration-500 group-focus-within:bottom-1/2 group-focus-within:translate-y-1/2 group-hover:bottom-1/2 group-hover:translate-y-1/2"
    >
      <p
        class="mx-auto w-[70%] text-center text-[max(0.75rem,8cqw)] font-bold leading-tight text-gray-100 transition-all text-shadow-lg"
      >
        {teamMember.name}
      </p>
      <div
        data-testid="role"
        class="mx-auto text-center text-[max(0.6875rem,6.5cqw)] leading-tight text-gray-100 opacity-0 transition-all duration-500 ease-out group-focus-within:opacity-100 group-hover:opacity-100"
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
          class="flex min-h-0 flex-row justify-center gap-x-[3cqw] overflow-hidden opacity-0 transition-opacity duration-500 group-focus-within:opacity-100 group-hover:opacity-100"
        >
          {#if teamMember.linkedin}
            <a
              href={teamMember.linkedin}
              class="mt-[2cqw] size-[14cqw]"
              aria-label="LinkedIn de {teamMember.name}"
            >
              <Icon src={Icons.Linkedin} color="white" size="100%" /></a
            >
          {/if}
          {#if teamMember.github}
            <a
              href={teamMember.github}
              class="mt-[2cqw] size-[14cqw]"
              aria-label="GitHub de {teamMember.name}"
              ><Icon src={Icons.Github} color="white" size="100%" /></a
            >
          {/if}
          {#if teamMember.websites}
            {#each teamMember.websites as customWebsite (customWebsite.url)}
              <a
                href={customWebsite.url}
                class="mt-[2cqw] size-[14cqw]"
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
      alt="Membro do NIFEUP {teamMember.name}"
      class="z-0 h-full w-full object-cover"
    />
  </div>
</Hexagon>
