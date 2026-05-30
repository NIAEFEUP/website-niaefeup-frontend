<script lang="ts">
  import TeamMemberHexagon from './team-member-hexagon.svelte';
  import HexagonGrid from '$lib/components/hexagons/hexagon-grid.svelte';
  import type { TeamMember } from '@/types/team-member';

  interface Props {
    section: { name: string; accounts: TeamMember[] };
    cols: number;
    gap?: 'small' | undefined;
    showTitle?: boolean;
  }

  let { section, cols, gap, showTitle = false }: Props = $props();
</script>

{#if section.accounts.length > 0}
  {#if showTitle}
    <h2 class="mb-10 mt-12 text-center text-lg font-bold md:text-2xl">
      {section.name}
    </h2>
  {/if}
  <div class={showTitle ? 'mx-auto w-full max-w-5xl' : 'w-fit max-w-md'}>
    <HexagonGrid
      items={section.accounts}
      {cols}
      orientation="horizontal"
      component={TeamMemberHexagon}
      {gap}
    />
  </div>
{/if}
