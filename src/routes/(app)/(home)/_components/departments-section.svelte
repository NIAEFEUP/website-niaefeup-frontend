<script lang="ts">
  import DepartmentHexagon from './department-hexagon.svelte';
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
      description:
        'O departamento de Eventos organiza e dinamiza todas as iniciativas da associação — desde workshops e palestras a convívios e competições. É aqui que as ideias ganham vida e a comunidade se une.'
    },
    {
      name: 'Imagem',
      description:
        'O departamento de Imagem é responsável pela identidade visual da NIAEFEUP. Cria conteúdos gráficos, fotografa os momentos mais marcantes e garante que a nossa presença é reconhecida em todo o lado.'
    },
    {
      name: 'Projetos',
      description:
        'O departamento de Projetos desenvolve soluções tecnológicas para a comunidade académica. Das aplicações web às ferramentas internas, transformamos código em impacto real.'
    },
    {
      name: 'Comunicação',
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
  id="departments"
  class="relative mx-auto box-border flex w-full max-w-350 scroll-mt-20 items-center justify-center px-6 py-20 text-white max-lg:flex-col max-lg:gap-14 max-lg:px-8 max-lg:py-16 max-lg:text-center sm:px-12 lg:py-32"
>
  <div class="flex w-full items-center justify-between gap-8 max-lg:flex-col max-lg:gap-14">
    <div
      class="flex w-full max-w-120 shrink-0 flex-col justify-center max-lg:max-w-xl max-lg:items-center"
    >
      <h2
        class="font-raleway mb-6 text-3xl font-extrabold leading-tight transition-opacity duration-200 sm:text-4xl lg:text-5xl"
      >
        {selectedTitle}
      </h2>
      <p
        class="font-raleway text-base font-normal leading-relaxed text-white/90 transition-opacity duration-200 sm:text-lg lg:text-xl"
      >
        {selectedDescription}
      </p>
    </div>

    <div class="flex w-full max-w-165 shrink-0 items-center justify-center max-lg:max-w-125">
      <div class="w-full">
        <HexagonGrid
          {items}
          cols={2}
          orientation="horizontal"
          gap="big"
          component={DepartmentHexagon}
        />
      </div>
    </div>
  </div>
</section>
