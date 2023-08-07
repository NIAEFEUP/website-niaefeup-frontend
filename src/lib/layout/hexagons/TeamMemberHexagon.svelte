<script lang="ts">
  import { onMount } from 'svelte';
  import Hexagon from './Hexagon.svelte';
  import Icon from '$lib/component/Icon.svelte';
  import Icons from '$lib/component/Icons';
  import type { TeamMember } from '@/model/TeamMember';

  export let data;
  export const orientation = 'horizontal';
  export let teamMember = data as TeamMember;

  onMount(() => {
    const listTargets: NodeListOf<HTMLElement> | null = document.querySelectorAll('.target');

    let clickToggle = 0;

    for (let target of listTargets) {
      const container: HTMLElement | null = target.querySelector('.container');
      const fullOpacityContainers: NodeListOf<HTMLElement> | null =
        target.querySelectorAll('.full-opacity');
      const variableOpacityContainer: HTMLElement | null =
        target.querySelector('.variable-opacity');

      target.addEventListener('touchstart', () => {
        if (!clickToggle) {
          if (container) {
            container.style.top = '50%';
            container.style.transform = 'translateY(-50%)';
          }

          fullOpacityContainers.forEach((i) => {
            i.style.opacity = '100%';
          });

          if (variableOpacityContainer) {
            variableOpacityContainer.style.opacity = '30%';
          }

          clickToggle++;
        } else {
          if (container) {
            container.style.top = '';
            container.style.transform = '';
          }

          fullOpacityContainers.forEach((i) => {
            i.style.opacity = '0%';
          });

          if (variableOpacityContainer) {
            variableOpacityContainer.style.opacity = '0%';
          }

          clickToggle = 0;
        }
      });
    }
  });
</script>

<Hexagon {orientation}>
  <div class="target group relative" data-testid="hexagon">
    <div
      class="container
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
        class="full-opacity mx-auto
        text-center text-xs leading-tight text-gray-100 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 sm:text-xs md:text-sm lg:text-base xl:text-lg"
      >
        {teamMember.role}
      </p>
      <div class="mt-1 flex justify-center space-x-1">
        {#if teamMember.linkedin}
          <a
            href={teamMember.linkedin}
            class="full-opacity h-[15%] w-[15%] opacity-0 transition-all duration-500 ease-out group-hover:opacity-100"
            aria-label="{teamMember.name}'s LinkedIn"
          >
            <Icon src={Icons.Linkedin} color="white" size="100%" /></a
          >
        {/if}
        {#if teamMember.gitHub}
          <a
            href={teamMember.gitHub}
            class="full-opacity h-[15%] w-[15%] opacity-0 transition-all duration-500 ease-out group-hover:opacity-100"
            aria-label="{teamMember.name}'s GitHub"
            ><Icon src={Icons.Github} color="white" size="100%" /></a
          >
        {/if}
        {#if teamMember.customWebsites}
          {#each teamMember.customWebsites as customWebsite}
            <a
              href={customWebsite.url}
              class="full-opacity h-[15%] w-[15%] opacity-0 transition-all duration-500 ease-out group-hover:opacity-100"
              aria-label="{teamMember.name}'s custom website"
            >
              {#if customWebsite.iconPath}
                <img
                  src={customWebsite.iconPath}
                  alt="Icon of {teamMember.name}'s custom website"
                  class="h-full w-full object-cover"
                />
              {:else}
                <Icon src={Icons.Globe} color="white" size="100%" />
              {/if}
            </a>
          {/each}
        {/if}
      </div>
    </div>

    <div
      class="variable-opacity absolute inset-0 z-10 bg-black text-lg opacity-0 transition-opacity duration-500 group-hover:opacity-30"
    />
    <img
      src={teamMember.photoPath}
      alt="NIAFEUP member {teamMember.name}"
      class="z-0 h-full w-full object-cover"
    />
  </div>
</Hexagon>
