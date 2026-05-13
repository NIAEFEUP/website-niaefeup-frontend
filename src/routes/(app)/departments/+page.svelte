<script lang="ts">
  import DepartmentHexagon from './_components/DepartmentHexagon.svelte';
  import HexagonGrid from '@/lib/components/hexagons/hexagon-grid.svelte';

  const logo = {
    type: 'logo',
    image: '/images/logo_2018_watermark.svg',
    onselect: () => {
      selectedTitle = defaultTitle;
      selectedDescription = defaultDescription;
    }
  };
 
  const departments = [
    {
      name: 'Eventos',
      image: '/departments/events.jpg',
      description:
        'O departamento de Eventos organiza e dinamiza todas as iniciativas da associação — desde workshops e palestras a convívios e competições. É aqui que as ideias ganham vida e a comunidade se une.'
    },
    {
      name: 'Imagem',
      image: '/departments/images.jpg',
      description:
        'O departamento de Imagem é responsável pela identidade visual da NIAEFEUP. Cria conteúdos gráficos, fotografa os momentos mais marcantes e garante que a nossa presença é reconhecida em todo o lado.'
    },
    {
      name: 'Projetos',
      image: '/departments/projects.jpg',
      description:
        'O departamento de Projetos desenvolve soluções tecnológicas para a comunidade académica. Das aplicações web às ferramentas internas, transformamos código em impacto real.'
    },
    {
      name: 'Comunicação',
      image: '/departments/comunicacao.jpg',
      description:
        'O departamento de Comunicação é a voz da NIAEFEUP. Gere as redes sociais, redige conteúdos e assegura que a informação chega a toda a comunidade de forma clara e apelativa.'
    }
  ];

  const defaultTitle = 'Os Nossos Departamentos';
  const defaultDescription =
    'Conheça as equipas dedicadas por trás de cada departamento: Comunicação, Imagem, Projetos e Eventos';

  let selectedTitle = $state(defaultTitle);
  let selectedDescription = $state(defaultDescription);

  function handleSelect(item: (typeof departments)[0]) {
    selectedTitle = item.name;
    selectedDescription = item.description;
  }

  const items = [
    logo,
    { ...departments[0], onselect: handleSelect },
    { ...departments[1], onselect: handleSelect },
    { ...departments[2], onselect: handleSelect },
    { ...departments[3], onselect: handleSelect }
  ];
</script>

<section class="departments">
  <div class="text">
    <h2>{selectedTitle}</h2>
    <p>{selectedDescription}</p>
  </div>

  <div class="grid">
    <HexagonGrid
      {items}
      cols={2}
      orientation="horizontal"
      gap="big"
      component={DepartmentHexagon}
    />
  </div>
</section>

<style>
  .departments {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    min-height: 520px;
    padding: 4rem 0 4rem 10%;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
  }

  .text {
    max-width: 38%;
    margin-left: 5%;
  }

  .text h2 {
    font-size: 2.9rem;
    line-height: 1.05;
    margin-bottom: 1.5rem;
    font-weight: 800;
    transition: opacity 0.2s;
  }

  .text p {
    font-size: 1.2rem;
    line-height: 1.6;
    opacity: 0.95;
    transition: opacity 0.2s;
  }

  .grid {
    width: 55%;
    flex-shrink: 0;
    transform: scale(0.55);
    transform-origin: right center;
    margin-right: 15%;
  }

  @media (max-width: 932px) {
    .departments {
      flex-direction: column;
      text-align: center;
      gap: 0;
      padding: 3rem 2.5rem 2rem;
    }

    .text {
      max-width: 100%;
    }

    .text h2 {
      font-size: 2.45rem;
    }

    .grid {
      width: clamp(200%, calc(910px / 100vw * 100%), 260%);
      position: relative;
      margin-top: -15rem;
      margin-left: 240%;
      transform:  translateX(-50%)  scale(0.45);
      transform-origin: center;
    }
  }
</style>

