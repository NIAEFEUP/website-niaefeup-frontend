<script lang="ts">
  import TeamMemberHexagon from './_components/team-member-hexagon.svelte';
  import HexagonGrid from '$lib/components/hexagons/hexagon-grid.svelte';

  let { data } = $props();

 
  const groupedSections = $derived.by(() => {
    const result: Array<{ name: string; accounts: any[] }> = [];

    const president = data.sections.find((s: any) => s.section === 'President');
    const board = data.sections.find((s: any) => s.section === 'Board');
    
    if (president || board) {
      result.push({
        name: 'Direção',
        accounts: [...(president?.accounts || []), ...(board?.accounts || [])]
      });
    }
    
  
    const otherSections = data.sections.filter((s: any) => 
      s.section !== 'President' && s.section !== 'Board'
    );
    
    for (const section of otherSections) {
      const displayName = section.section === 'Member' ? 'Membros' :
                         section.section === 'Recruit' ? 'Recrutas' :
                         section.section === 'Alumni' ? 'Alumni' :
                         section.section;
      result.push({
        name: displayName,
        accounts: section.accounts
      });
    }
    
    return result;
  });
</script>

<div class="flex w-full flex-col items-center">
  <h1 class="my-2 text-center font-source_code text-xl text-white md:my-4 md:text-3xl">
    &lt&nbsp<strong>Equipa</strong>&nbsp/&gt
  </h1>

  {#each groupedSections as section}
    {#if section.accounts.length > 0}
      <h2 class="mb-10 mt-12 text-lg font-bold md:text-2xl">{section.name}</h2>
      <div class="w-full max-w-5xl">
        <HexagonGrid
          items={section.accounts}
          cols={4}
          orientation="horizontal"
          component={TeamMemberHexagon}
        />
      </div>
    {/if}
  {/each}
</div>
