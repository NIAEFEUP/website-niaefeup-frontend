<script lang="ts">
  import HexagonGrid from '@/lib/components/hexagons/hexagon-grid.svelte';
  import DepartmentHexagon from './_components/DepartmentHexagon.svelte';

  const logo = {
    type: 'logo',
    image: '/images/logo_2018_watermark.svg'   
  };

  const departments = [
    {
      name: 'Eventos',
      image: '/departments/events.jpg',
      href: '/events'
    },
    {
      name: 'Imagem',
      image: '/departments/images.jpg',
      href: '/images'
    },
    {
      name: 'Projetos',
      image: '/departments/projects.jpg',
      href: '/projects'
    },
    {
      name: 'Comunicação',
      image: '/departments/comunicacao.jpg',
      href: '/comunicacao'
    }
  ];

  const items = [logo, ...departments];  
</script>

<section class="departments">
  <div class="text">
    <h2>Os Nossos Departamentos</h2>
    <p>
      Conheça as equipas dedicadas por trás de cada departamento:
      Comunicação, Imagem, Projetos e Eventos
    </p>
  </div>

  <div class="grid">
    <HexagonGrid
      items={items}
      cols={2}
      orientation="vertical"
      gap="medium"
      component={DepartmentHexagon}
    />
  </div>
</section>
<style>
  .departments {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5rem;
    padding: 5rem 2.5rem;
    color: white;
    min-height: 520px;
    gap: 2rem;
  }

  .text {
    max-width: 390px;
    
  }

  .text h2 {
    font-size: 2.9rem;
    line-height: 1.05;
    margin-bottom: 1.5rem;
    font-weight: 700;
  }

  .text p {
    font-size: 1.2rem;
    line-height: 1.6;
    opacity: 0.95;
  }

  .grid {
    width: 425px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    .departments {
      flex-direction: column;
      text-align: center;
      gap: 3rem;
      padding: 4rem 1.5rem;
    }
    
    .text {
      margin-right: 0;
      max-width: 100%;
    }

    .text h2 {
      font-size: 2.45rem;
    }
  }
</style>