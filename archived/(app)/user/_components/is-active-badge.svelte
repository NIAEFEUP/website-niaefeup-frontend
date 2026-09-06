<script lang="ts">
  import type { TeamMember } from '@/types/team-member';

  interface Props {
    teamMember: TeamMember;
  }

  let { teamMember }: Props = $props();
</script>

<div>
  {#if teamMember.isActive}
    <div class="flex items-center rounded-2xl bg-green-200/20 px-5 py-2">
      <div class="mr-2 h-4 w-4 rounded-full bg-green-200"></div>
      <p class="text-sm font-semibold text-white sm:text-base">Membro ativo</p>
    </div>
  {:else}
    <div class="flex items-center rounded-2xl bg-red-200/20 px-5 py-2">
      <div class="mr-2 h-4 w-4 rounded-full bg-red-500"></div>
      <p class="text-sm font-semibold text-white sm:text-base">Membro não ativo</p>
    </div>
  {/if}
</div>
