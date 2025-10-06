<script lang="ts">
  import { onMount } from 'svelte';
  import TeamMemberHexagon from './_components/team-member-hexagon.svelte';
  import type { PageData } from './$types';
  import type { Generation } from '@/types/generation';
  import type { TeamMember } from '@/types/team-member';
  import HexagonGrid from '@/lib/components/hexagons/hexagon-grid.svelte';

  let { data }: { data: PageData } = $props();
  const generation: Generation = data.generation;
  console.log(generation);

  // lib/utils/get-cols.ts
  function getColsFromWidth(width: number): number {
    if (width >= 1280) return 6; // xl
    if (width >= 1024) return 5; // lg
    if (width >= 768) return 4; // md
    if (width >= 640) return 3; // sm
    return 2; // default / mobile
  }

  onMount(() => {
    updateCols();

    window.addEventListener('resize', updateCols);

    return () => {
      window.removeEventListener('resize', updateCols);
    };
  });

  let cols = getColsFromWidth(typeof window !== 'undefined' ? window.innerWidth : 1024); // default to `md`

  const updateCols = () => {
    cols = getColsFromWidth(window.innerWidth);
    console.log(`Updated cols to: ${cols}`); // Debugging log
  };

  const boardMembers: TeamMember[] = [
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      role: 'Presidente',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      role: 'Presidente',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      role: 'Co-Gestor de Projetos',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      role: 'Co-Gestor de Projetos',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      role: 'Co-Gestor de Projetos',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      role: 'Co-Gestor de Projetos',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      role: 'Co-Gestor de Projetos',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      role: 'Co-Gestor de Projetos',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      role: 'Co-Gestor de Projetos',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      role: 'Co-Gestor de Projetos',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    }
  ];

  const recruitMembers: TeamMember[] = [
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    },
    {
      name: 'Bruno Rosendo',
      email: 'brunorosendo@gmail.com',
      photo: 'images/previews/bruno_rosendo.png',
      linkedin: 'https://pt.linkedin.com/',
      gitHub: 'https://github.com/',
      websites: [{ url: 'https://www.facebook.com/' }]
    }
  ];
</script>

<div class="flex flex-col justify-center">
  <h1 class="mb-4 flex flex-col text-center font-raleway text-4xl font-bold text-white lg:text-5xl">
    &lt; Equipa /&gt;
  </h1>

  <section class="mb-6 flex w-full flex-col items-center justify-center p-6">
    <h2 class="mb-16 text-center text-3xl font-bold lg:text-4xl">Direção</h2>
    {#key cols}
      <HexagonGrid
        items={boardMembers}
        {cols}
        gap="small"
        orientation="horizontal"
        component={TeamMemberHexagon}
      />
    {/key}
  </section>

  <section class="mb-6 flex w-full flex-col items-center justify-center p-6">
    <h2 class="mb-16 text-center text-4xl font-bold">Membros</h2>
    {#key cols}
      <HexagonGrid
        items={teamMembers}
        {cols}
        gap="small"
        orientation="horizontal"
        component={TeamMemberHexagon}
      />
    {/key}
  </section>

  <section class="flex w-full flex-col items-center justify-center p-6">
    <div class="mb-6 grid w-full grid-cols-5">
      <div class="col-span-1"></div>
      <h2 class="col-span-1 place-self-center pl-4 text-3xl font-bold">Recrutas</h2>
      <div class="col-span-1"></div>
    </div>

    <HexagonGrid
      items={recruitMembers}
      {cols}
      gap="small"
      orientation="horizontal"
      component={TeamMemberHexagon}
    />
  </section>
</div>
