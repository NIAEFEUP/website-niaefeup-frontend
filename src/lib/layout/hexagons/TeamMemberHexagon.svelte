<script lang="ts">
  import { onMount } from 'svelte';
  import Hexagon from './Hexagon.svelte';
  import Icon from '$lib/component/Icon.svelte';
  import Icons from '$lib/component/Icons';
  import type { TeamMember } from '@/model/TeamMember';

  export let data;
  export const orientation = 'horizontal';
  export let teamMember = data as TeamMember;

  const openHexagonAnimation = (
    target: HTMLElement,
    container: HTMLElement,
    fullOpacityContainers: NodeListOf<HTMLElement>,
    variableOpacityContainer: HTMLElement
  ) => {
    container.style.top = '50%';
    container.style.transform = 'translateY(-50%)';

    fullOpacityContainers.forEach((i) => {
      i.style.opacity = '100%';
    });

    variableOpacityContainer.style.opacity = '30%';

    target.dataset.state = 'open';
  };
  const closeHexagonAnimation = (
    target: HTMLElement,
    container: HTMLElement,
    fullOpacityContainers: NodeListOf<HTMLElement>,
    variableOpacityContainer: HTMLElement
  ) => {
    container.style.top = '';
    container.style.transform = '';

    fullOpacityContainers.forEach((i) => {
      i.style.opacity = '0%';
    });

    variableOpacityContainer.style.opacity = '0%';

    target.dataset.state = 'closed';
  };

  onMount(() => {
    const target: HTMLElement = document.getElementById(teamMember.email) as HTMLElement;

    const container: HTMLElement | null = target.querySelector('.container');
    const fullOpacityContainers: NodeListOf<HTMLElement> | null =
      target.querySelectorAll('.full-opacity');
    const variableOpacityContainer: HTMLElement | null = target.querySelector('.variable-opacity');

    target.addEventListener('touchstart', () => {
      if (container && fullOpacityContainers && variableOpacityContainer) {
        if (target.dataset.state == 'closed') {
          openHexagonAnimation(target, container, fullOpacityContainers, variableOpacityContainer);
        } else {
          closeHexagonAnimation(target, container, fullOpacityContainers, variableOpacityContainer);
        }
      }
    });
  });
</script>

<Hexagon {orientation}>
  <div
    id={teamMember.email}
    class="group relative h-full w-full"
    data-testid="hexagon"
    data-state="closed"
  >
    <div
      data-testid="container"
      class="container absolute bottom-0 z-20 w-full px-4 duration-500 group-hover:bottom-1/2 group-hover:translate-y-1/3"
    >
      <p
        class="mx-auto w-[70%] text-center text-sm font-bold leading-tight text-gray-100 transition-all sm:text-sm md:text-base lg:text-lg xl:text-xl"
      >
        {teamMember.name}
      </p>
      <p
        data-testid="role"
        class="full-opacity mx-auto text-center text-xs leading-tight text-gray-100 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 sm:text-xs md:text-sm lg:text-base xl:text-lg"
      >
        {teamMember.role}
      </p>
      <div class="relative mt-1">
        <div class="absolute flex w-full justify-center gap-1 md:gap-2">
          {#if teamMember.linkedin}
            <a
              href={teamMember.linkedin}
              class="full-opacity h-6 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 sm:h-6 md:h-7 lg:h-8 xl:h-9"
              aria-label="{teamMember.name}'s LinkedIn"
            >
              <Icon src={Icons.Linkedin} color="white" size="100%" /></a
            >
          {/if}
          {#if teamMember.gitHub}
            <a
              href={teamMember.gitHub}
              class="full-opacity h-6 opacity-0 transition-all duration-500 ease-out group-hover:static group-hover:opacity-100 sm:h-6 md:h-7 lg:h-8 xl:h-9"
              aria-label="{teamMember.name}'s GitHub"
              ><Icon src={Icons.Github} color="white" size="100%" /></a
            >
          {/if}
          {#if teamMember.websites}
            {#each teamMember.websites as customWebsite}
              <a
                href={customWebsite.url}
                class="full-opacity h-5 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 sm:h-6 md:h-7 lg:h-8 xl:h-9"
                aria-label="{teamMember.name}'s custom website"
              >
                {#if customWebsite.iconPath}
                  <img
                    src={customWebsite.iconPath}
                    alt="Icon of {teamMember.name}'s custom website"
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
      class="variable-opacity absolute inset-0 z-10 bg-black text-lg opacity-0 transition-opacity duration-500 group-hover:opacity-30"
    />
    <img
      src={teamMember.photo ? teamMember.photo : 'images/default_profile_pic.png'}
      alt="NIAFEUP member {teamMember.name}"
      class="z-0 h-full w-full object-cover"
    />
  </div>
</Hexagon>
