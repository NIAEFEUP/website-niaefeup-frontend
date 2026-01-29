<script lang="ts">
  import TeamMemberHexagon from './_components/team-member-hexagon.svelte';
  import HexagonGrid from '$lib/components/hexagons/hexagon-grid.svelte';

  let { data } = $props();

  const sectionDisplayNames: Record<string, string> = {
    'President': 'Presidente',
    'Board': 'Direção',
    'Member': 'Membros',
    'Recruit': 'Recrutas',
    'Alumni': 'Alumni'
  };
</script>

<div class="flex w-full flex-col items-center">
  <h1 class="my-2 text-center font-source_code text-xl text-white md:my-4 md:text-3xl">
    &lt&nbsp<strong>Equipa</strong>&nbsp/&gt
  </h1>

  {#each data.sections as section}
    {#if section.accounts.length > 0}
      <h2 class="my-4 text-lg font-bold md:text-2xl">{sectionDisplayNames[section.section] || section.section}</h2>
      <HexagonGrid
        items={section.accounts}
        cols={4}
        orientation="horizontal"
        component={TeamMemberHexagon}
      />
    {/if}
  {/each}
</div>
