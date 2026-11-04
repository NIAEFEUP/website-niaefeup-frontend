<script lang="ts">
  import DepartmentHexagon from './department-hexagon.svelte';
  import HexagonGrid from '@/lib/components/hexagons/hexagon-grid.svelte';

  const logo = {
    type: 'logo',
    image: '/images/logo_ni_white_no-background.svg',
    onselect: () => {
      selectedTitle = defaultTitle;
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
        'O departamento de Imagem é responsável pela identidade visual da NIFEUP. Cria conteúdos gráficos, fotografa os momentos mais marcantes e garante que a nossa presença é reconhecida em todo o lado.'
    },
    {
      name: 'Projetos',
      description:
        'O departamento de Projetos desenvolve soluções tecnológicas para a comunidade académica. Das aplicações web às ferramentas internas, transformamos código em impacto real.'
    },
    {
      name: 'Comunicação',
      description:
        'O departamento de Comunicação é a voz da NIFEUP. Gere as redes sociais, redige conteúdos e assegura que a informação chega a toda a comunidade de forma clara e apelativa.'
    }
  ];

  const defaultTitle = 'Os Nossos Departamentos';
  const defaultDescription =
    'Conheça as equipas dedicadas por trás de cada departamento: Comunicação, Imagem, Projetos e Eventos';
  const texts = [{ name: defaultTitle, description: defaultDescription }, ...departments];

  let selectedTitle = $state(defaultTitle);

  function handleSelect(item: { name?: string; description?: string }) {
    selectedTitle = item.name ?? '';
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
    <!-- all texts are put in the same grid cell so the column always has the height of the longest one -->
    <div class="grid w-full max-w-120 shrink-0 max-lg:max-w-xl">
      {#each texts as text (text.name)}
        <div
          class="col-start-1 row-start-1 flex flex-col max-lg:items-center"
          class:invisible={text.name !== selectedTitle}
        >
          <h2
            class="font-raleway mb-6 text-3xl font-extrabold leading-tight transition-opacity duration-200 sm:text-4xl lg:text-5xl"
          >
            {text.name}
          </h2>
          <p
            class="font-raleway text-base font-normal leading-relaxed text-white/90 transition-opacity duration-200 sm:text-lg lg:text-xl"
          >
            {text.description}
          </p>
        </div>
      {/each}
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
