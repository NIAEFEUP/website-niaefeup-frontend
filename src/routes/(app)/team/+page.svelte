<script lang="ts">
  import TeamMemberHexagon from './_components/team-member-hexagon.svelte';
  import HexagonGrid from '$lib/components/hexagons/hexagon-grid.svelte';

  let { data } = $props();

  let openSection = $state<string | null>('Direção');

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

  const toggleSection = (sectionName: string) => {
    openSection = openSection === sectionName ? null : sectionName;
  };
</script>

<div class="flex w-full flex-col items-center">
  <h1 class="my-2 text-center font-source_code text-xl text-white md:my-4 md:text-3xl">
    &lt&nbsp<strong>Equipa</strong>&nbsp/&gt
  </h1>

  <!-- mobile view -->
  <div class="w-full md:hidden">

    <div class="flex justify-around px-4 py-6">
      {#each groupedSections as section}
        {#if section.accounts.length > 0}
          <button
            onclick={() => toggleSection(section.name)}
            class="text-3xl font-bold transition-opacity {openSection === section.name ? 'opacity-100' : 'opacity-20'}"
          >
            {section.name}
          </button>
        {/if}
      {/each}
    </div>

    <!-- active section content -->
    {#each groupedSections as section}
      {#if section.accounts.length > 0 && openSection === section.name}
        <div class="flex justify-center px-4 pb-8">
          <div class="w-fit max-w-md">
            <HexagonGrid
              items={section.accounts}
              cols={2}
              orientation="horizontal"
              component={TeamMemberHexagon}
              gap="small"
            />
          </div>
        </div>
      {/if}
    {/each}
  </div>

  <!-- desktop view -->
  {#each groupedSections as section}
    {#if section.accounts.length > 0}
      <div class="hidden w-full md:block">
        <h2 class="mb-10 mt-12 text-center text-lg font-bold md:text-2xl">
          {section.name}
        </h2>
        <div class="mx-auto w-full max-w-5xl">
          <HexagonGrid
            items={section.accounts}
            cols={4}
            orientation="horizontal"
            component={TeamMemberHexagon}
          />
        </div>
      </div>
    {/if}
  {/each}
</div>
