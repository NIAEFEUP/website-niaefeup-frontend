<script lang="ts">
  import SocialMediaIcon from '../_components/social-media-icon.svelte';
  import IsActiveBadge from '../_components/is-active-badge.svelte';
  import type { PageData } from './$types';
  import type { TeamMember } from '@/types/team-member';
  import Icon from '@/lib/components/icons/icon.svelte';
  import Icons from '@/lib/components/icons/icons';
  import EditButton from '$lib/components/buttons/edit-button.svelte';
  import { goto } from '$app/navigation';

  let { data }: { data: PageData } = $props();

  let teamMember: TeamMember = data.teamMember;

  async function logout() {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      goto('/');
    }
  }
</script>

{#await teamMember}
  <!-- TODO: include a waiting animation -->
  <p>...waiting</p>
{:then teamMember}
  <section>
    <div class="flex w-full justify-center px-4 sm:px-6 lg:px-8">
      <div class="flex w-4/5 flex-col content-center gap-y-4 md:gap-y-6 lg:w-3/4 xl:w-1/2">
        <div class="flex h-12 justify-end gap-x-3 lg:h-10 xl:h-12">
          <EditButton size="small" link="https://lipsum.com" />
          <button
            class="w-12 rounded-md bg-muted-red-500 p-3 lg:w-12 xl:w-12"
            onclick={() => logout()}
          >
            <Icon src={Icons.Logout} color="white" size="100%" />
          </button>
        </div>
        <div class="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <img
            src={teamMember.photo ? teamMember.photo : '/images/default_profile_pic.png'}
            alt="User pic"
            class="h-32 w-32 rounded-lg sm:h-52 sm:w-52"
          />
          <div class="flex flex-grow flex-col">
            <div class="mb-5 flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
              <h3 class="text-2xl font-bold lg:text-lg xl:text-xl 2xl:text-2xl">
                {teamMember.name}
              </h3>
              <IsActiveBadge {teamMember} />
            </div>
            {#if teamMember.bio}
              <p
                class="text-md lg:text-md mb-6 text-center sm:text-left sm:text-base xl:text-lg 2xl:text-xl"
              >
                {teamMember.bio}
              </p>
            {/if}
            <div class="flex justify-center gap-3 sm:justify-start">
              {#if teamMember.github}
                <SocialMediaIcon
                  url={teamMember.github}
                  social="Github"
                  icon={Icons.Github}
                  user={teamMember.name}
                />
              {/if}
              {#if teamMember.linkedin}
                <SocialMediaIcon
                  url={teamMember.linkedin}
                  social="Linkedin"
                  icon={Icons.Linkedin}
                  user={teamMember.name}
                />
              {/if}
              {#if teamMember.websites}
                {#each teamMember.websites as customWebsite, i (customWebsite.url)}
                  <SocialMediaIcon
                    url={customWebsite.url}
                    social="Custom Website"
                    icon={Icons.Globe}
                    user={teamMember.name}
                    iconPath={customWebsite.iconPath}
                  />
                {/each}
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
{/await}
