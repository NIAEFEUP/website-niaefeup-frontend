<script lang="ts">
  import Hexagon from './Hexagon.svelte';
  import Icon from '$lib/component/Icon.svelte';
  import Icons from '$lib/component/Icons';
  import type { TeamMember } from '@/model/TeamMember';

  export let teamMember: TeamMember;
</script>

<Hexagon orientation="horizontal">
  <div class="group relative" data-testid="hexagon">
    <div
      class="
       absolute top-full z-20 w-full -translate-y-16 px-4 pb-4 duration-500 group-hover:top-1/2 group-hover:-translate-y-1/2"
    >
      <p
        class="mx-auto text-center text-sm font-bold leading-tight text-gray-100 transition-all sm:text-sm md:text-sm lg:text-base xl:text-xl"
      >
        {teamMember.name.split(' ')[0]}
        <br />
        {teamMember.name.split(' ')[1]}
      </p>
      <p
        class="mx-auto
        text-center text-xs leading-tight text-gray-100 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 sm:text-xs md:text-sm lg:text-base xl:text-lg"
      >
        {teamMember.role}
      </p>
      <div class="mt-1 flex justify-center space-x-1">
        {#if teamMember.linkedin}
          <a
            href={teamMember.linkedin}
            class="opacity-0 transition-all duration-500 ease-out group-hover:opacity-100"
            aria-label="{teamMember.name}'s LinkdIn"
          >
            <Icon src={Icons.Linkedin} color="white" size="2.5vw" /></a
          >
        {/if}
        {#if teamMember.gitHub}
          <a
            href={teamMember.gitHub}
            class="opacity-0 transition-all duration-500 ease-out group-hover:opacity-100"
            aria-label="{teamMember.name}'s GitHub"
            ><Icon src={Icons.Github} color="white" size="2.5vw" /></a
          >
        {/if}
        {#if teamMember.customWebsites}
          {#each teamMember.customWebsites as customWebsite}
            <a
              href={customWebsite.url}
              class="opacity-0 transition-all duration-500 ease-out group-hover:opacity-100"
            >
              {#if customWebsite.iconPath}
                <img
                  src={customWebsite.iconPath}
                  alt="Icon of of a custom social website"
                  class="h-[2.5vw] w-[2.5w] object-scale-down"
                />
              {:else}
                <Icon src={Icons.Globe} color="white" size="2.5vw" />
              {/if}
            </a>
          {/each}
        {/if}
      </div>
    </div>

    <div
      class="absolute inset-0 z-10 bg-black text-lg opacity-0 transition-opacity duration-500 group-hover:opacity-30"
    />
    <img
      src={teamMember.photoPath}
      alt="NI member {teamMember.name}"
      class="z-0 h-full w-full object-cover"
    />
  </div>
</Hexagon>
