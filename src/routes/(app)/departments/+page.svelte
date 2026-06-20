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

<section
  class="box-border flex min-h-[568px] w-full items-center justify-between overflow-hidden py-16 pl-[10%] text-white max-lg:flex-col max-lg:gap-0 max-lg:px-10 max-lg:py-12 max-lg:text-center"
>
  <div class="ml-[5%] max-w-[38%] max-lg:max-w-full">
    <h2
      class="mb-6 text-[2.9rem] font-extrabold leading-[1.05] transition-opacity duration-200 max-lg:text-[2.45rem]"
    >
      {selectedTitle}
    </h2>
    <p class="text-[1.2rem] leading-[1.6] opacity-95 transition-opacity duration-200">
      {selectedDescription}
    </p>
  </div>

  <div
    class="mr-[15%] mt-[-15rem] w-[57%] shrink-0 origin-right scale-[0.55] max-lg:mx-auto max-lg:mb-0 max-lg:mt-12 max-lg:w-[900px] max-lg:scale-100 max-lg:[zoom:calc(100vw_/_900px_*_0.85)]"
  >
    <HexagonGrid
      {items}
      cols={2}
      orientation="horizontal"
      gap="big"
      component={DepartmentHexagon}
    />
  </div>
</section>
