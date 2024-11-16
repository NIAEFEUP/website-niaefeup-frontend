<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import TeamMemberHexagon from './_components/team-member-hexagon.svelte'; // Caminho para o componente
  import type { TeamMember } from '@/types/team-member';
  import HexagonGrid from '@/lib/components/hexagons/hexagon-grid.svelte';

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
    },
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


    const alumniMembers: TeamMember[] = [
 
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

<section class="flex flex-col justify-center gap-32">
  <section class="mb-4 flex flex-col text-center font-raleway text-white">
    <h1 class="text-3xl font-bold">&lt; Equipa /&gt;</h1>
  </section>

  <section class="flex flex-col justify-center items-center">
    <div class="justify-center max-w-5xl">
        <div class="grid grid-cols-5 w-full mb-6">   
            <div class="col-span-1"></div>
            <h2 class="text-3xl font-bold pl-4 col-span-1 place-self-center">Direção</h2>
            <div class="col-span-1"></div>
        </div>
        <HexagonGrid
            items={boardMembers}
            cols={5}
            gap="small"
            orientation="horizontal"
            component={TeamMemberHexagon}
            class=""
        />
    </div>
    
  </section>

  <section class="flex flex-col justify-center items-center">
    <div class="justify-center max-w-5xl">
        <div class="grid grid-cols-5 w-full mb-6">   
            <div class="col-span-3"></div>
            <h2 class="text-3xl font-bold col-span-1 pr-4 place-self-center">Membros</h2>
            <div class="col-span-1"></div>
        </div>
        <HexagonGrid
            items={teamMembers}
            cols={5}
            gap="small"
            orientation="horizontal"
            component={TeamMemberHexagon}
            class=""
        />
    </div>
    
  </section>  

  <section class="flex flex-col justify-center items-center">
    <div class="justify-center max-w-5xl">
        <div class="grid grid-cols-5 w-full mb-6">   
            <div class="col-span-1"></div>
            <h2 class="text-3xl font-bold pl-4 col-span-1 place-self-center">Recrutas</h2>
            <div class="col-span-1"></div>
        </div>
        <HexagonGrid
            items={recruitMembers}
            cols={5}
            gap="small"
            orientation="horizontal"
            component={TeamMemberHexagon}
            class=""
        />
    </div>
    
  </section>

    <section class="flex flex-col justify-center items-center">
        <div class="justify-center max-w-5xl">
            <div class="grid grid-cols-5 w-full mb-6">   
                <div class="col-span-3"></div>
                <h2 class="text-3xl font-bold col-span-1 pr-4 place-self-center">Alumni</h2>
                <div class="col-span-1"></div>
            </div>
            <HexagonGrid
                items={alumniMembers}
                cols={5}
                gap="small"
                orientation="horizontal"
                component={TeamMemberHexagon}
                class=""
            />
        </div>
        
    </section>  

  
</section>

