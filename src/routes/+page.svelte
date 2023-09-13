<script lang="ts">
  import TeamMemberHexagon from '@/lib/layout/hexagons/TeamMemberHexagon.svelte';
  import HexagonGrid from '@/lib/layout/hexagons/HexagonGrid.svelte';
  import type { TeamMember } from '@/model/TeamMember';

  let teamMember: TeamMember = {
    name: 'Bruno Rosendo',
    email: 'brunorosendo@gmail.com',
    photo: 'images/previews/bruno_rosendo.png',
    role: 'Co-Gestor de Projetos',
    linkedin: 'hjfhbd',
    gitHub: 'sdjhfbfr',
    websites: [{ url: 'guhrutgh' }]
  };
  let teamMember2: TeamMember = {
    name: 'Bruno Rosendo',
    email: 'brunorosendo2@gmail.com',
    role: 'Co-Gestor de Projetos'
  };
</script>

<HexagonGrid
  gap="medium"
  orientation="horizontal"
  cols={2}
  items={[teamMember, teamMember2]}
  component={TeamMemberHexagon}
/>
