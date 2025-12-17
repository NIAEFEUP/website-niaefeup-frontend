<script lang="ts">
  import TeamMemberHexagon from './_components/team-member-hexagon.svelte';
  import HexagonGrid from '$lib/components/hexagons/hexagon-grid.svelte';
  import type { TeamMember } from '@/types/team-member';

  // mock data
  let teamMembers: TeamMember[] = $state([
    {
      email: 'franciscaportugal2005@gmail.com',
      name: 'Francisca Portugal',
      bio: 'Recruta do NIAEFEUP',
      birthDate: new Date('2005-04-19'),
      role: 'Recruta',
      photo: '/images/default_profile_pic.png',
      linkedin: 'https://linkedin.com/in/franciscaportugal',
      github: 'https://github.com/franpts2',
      websites: []
    },
    {
      email: 'maluviieira@gmail.com',
      name: 'Maria Luiza Vieira',
      bio: 'Recruta no NIAEFEUP',
      birthDate: new Date('2005-09-29'),
      role: 'Recruta',
      photo: '/images/default_profile_pic.png',
      linkedin: 'https://linkedin.com/in/marialuizahvieira',
      github: 'https://github.com/maluviieira',
      websites: []
    },
    {
      email: 'franciscaportugal2005@gmail.com',
      name: 'Francisca Portugal',
      bio: 'Recruta do NIAEFEUP',
      birthDate: new Date('2005-04-19'),
      role: 'Recruta',
      photo: '/images/default_profile_pic.png',
      linkedin: 'https://linkedin.com/in/franciscaportugal',
      github: 'https://github.com/franpts2',
      websites: []
    },
    {
      email: 'maluviieira@gmail.com',
      name: 'Maria Luiza Vieira',
      bio: 'Recruta no NIAEFEUP',
      birthDate: new Date('2005-09-29'),
      role: 'Recruta',
      photo: '/images/default_profile_pic.png',
      linkedin: 'https://linkedin.com/in/marialuizahvieira',
      github: 'https://github.com/maluviieira',
      websites: []
    },
    {
      email: 'franciscaportugal2005@gmail.com',
      name: 'Francisca Portugal',
      bio: 'Recruta do NIAEFEUP',
      birthDate: new Date('2005-04-19'),
      role: 'Recruta',
      photo: '/images/default_profile_pic.png',
      linkedin: 'https://linkedin.com/in/franciscaportugal',
      github: 'https://github.com/franpts2',
      websites: []
    },
    {
      email: 'maluviieira@gmail.com',
      name: 'Maria Luiza Vieira',
      bio: 'Recruta no NIAEFEUP',
      birthDate: new Date('2005-09-29'),
      role: 'Recruta',
      photo: '/images/default_profile_pic.png',
      linkedin: 'https://linkedin.com/in/marialuizahvieira',
      github: 'https://github.com/maluviieira',
      websites: []
    },
    {
      email: 'franciscaportugal2005@gmail.com',
      name: 'Francisca Portugal',
      bio: 'Recruta do NIAEFEUP',
      birthDate: new Date('2005-04-19'),
      role: 'Recruta',
      photo: '/images/default_profile_pic.png',
      linkedin: 'https://linkedin.com/in/franciscaportugal',
      github: 'https://github.com/franpts2',
      websites: []
    },
    {
      email: 'maluviieira@gmail.com',
      name: 'Maria Luiza Vieira',
      bio: 'Recruta no NIAEFEUP',
      birthDate: new Date('2005-09-29'),
      role: 'Recruta',
      photo: '/images/default_profile_pic.png',
      linkedin: 'https://linkedin.com/in/marialuizahvieira',
      github: 'https://github.com/maluviieira',
      websites: []
    },
    {
      email: 'franciscaportugal2005@gmail.com',
      name: 'Francisca Portugal',
      bio: 'Recruta do NIAEFEUP',
      birthDate: new Date('2005-04-19'),
      role: 'Recruta',
      photo: '/images/default_profile_pic.png',
      linkedin: 'https://linkedin.com/in/franciscaportugal',
      github: 'https://github.com/franpts2',
      websites: []
    },
    {
      email: 'maluviieira@gmail.com',
      name: 'Maria Luiza Vieira',
      bio: 'Recruta no NIAEFEUP',
      birthDate: new Date('2005-09-29'),
      role: 'Recruta',
      photo: '/images/default_profile_pic.png',
      linkedin: 'https://linkedin.com/in/marialuizahvieira',
      github: 'https://github.com/maluviieira',
      websites: []
    },
    {
      email: 'franciscaportugal2005@gmail.com',
      name: 'Francisca Portugal',
      bio: 'Recruta do NIAEFEUP',
      birthDate: new Date('2005-04-19'),
      role: 'Recruta',
      photo: '/images/default_profile_pic.png',
      linkedin: 'https://linkedin.com/in/franciscaportugal',
      github: 'https://github.com/franpts2',
      websites: []
    },
    {
      email: 'maluviieira@gmail.com',
      name: 'Maria Luiza Vieira',
      bio: 'Recruta no NIAEFEUP',
      birthDate: new Date('2005-09-29'),
      role: 'Recruta',
      photo: '/images/default_profile_pic.png',
      linkedin: 'https://linkedin.com/in/marialuizahvieira',
      github: 'https://github.com/maluviieira',
      websites: []
    }
  ]);
</script>

<div class="flex w-full flex-col items-center">
  <h1 class="my-2 text-center font-source_code text-xl text-white md:my-4 md:text-3xl">
    &lt&nbsp<strong>Equipa</strong>&nbsp/&gt
  </h1>

  <p>Recrutas</p>
  <HexagonGrid
    items={teamMembers}
    cols={4}
    orientation="horizontal"
    component={TeamMemberHexagon}
  />
</div>
