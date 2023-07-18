<script lang="ts">
  import Hexagon from './Hexagon.svelte';
  import Icon from '$lib/component/Icon.svelte';
  import Icons from '$lib/component/Icons';
  import type { TeamMember } from '@/model/TeamMember';

  export let orientation: 'horizontal' | 'vertical';
  export let teamMember: TeamMember;
</script>

<Hexagon {orientation}>
  <div class="group relative">
    <div
      class="
       absolute top-full z-20 w-full -translate-y-8 pb-4 pl-4 pr-4 duration-500 group-hover:top-1/2 group-hover:-translate-y-1/2"
    >
      <p
        class="mx-auto text-center text-sm font-bold leading-tight text-gray-100 transition-all sm:text-xs lg:text-base xl:text-xl"
      >
        {teamMember.name}
      </p>
      <p
        class="mx-auto
        text-center text-xs leading-tight text-gray-100 opacity-0 transition-all ease-in group-hover:opacity-100 lg:text-base xl:text-xl"
      >
        {teamMember.role}
      </p>
      <div class="mt-1 flex justify-center space-x-1">
        {#if teamMember.linkedin}
          <a href={teamMember.linkedin}>
            <Icon src={Icons.Linkedin} color="white" size="2.5vw" /></a
          >
        {/if}
        {#if teamMember.gitHub}
          <a href={teamMember.gitHub}><Icon src={Icons.Github} color="white" size="2.5vw" /></a>
        {/if}
        {#if teamMember.customWebsites}
          {#each teamMember.customWebsites as customWebsite}
            <a href={customWebsite.url}>
              {#if customWebsite.iconPath}
                <img
                  src={customWebsite.iconPath}
                  alt="Icon of of a custom social website"
                  class="h-[2.5vw] w-[2.5vw] object-scale-down"
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
