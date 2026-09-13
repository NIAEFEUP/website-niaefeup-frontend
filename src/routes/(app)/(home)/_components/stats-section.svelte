<script lang="ts">
  interface Props {
    projectsCount?: number;
    eventsDinamizadosCount?: number;
    eventsPresentesCount?: number;
    buildingSrc?: string | null;
    exploreHref?: string;
  }

  let {
    projectsCount = 4,
    eventsDinamizadosCount = 14,
    eventsPresentesCount = 10,
    buildingSrc = '/images/landing_feup_buildings_2.svg',
    exploreHref = '/projects'
  }: Props = $props();
</script>

<section
  id="stats"
  class="relative flex w-full scroll-mt-20 flex-col items-center justify-center pt-20 sm:pt-28 lg:pt-36"
>
  <h2
    class="font-raleway mb-16 px-4 text-center text-3xl font-extrabold text-white sm:mb-20 sm:text-4xl md:text-5xl"
  >
    O ano passado
  </h2>

  <div class="grid w-full max-w-4xl grid-cols-1 gap-12 px-6 sm:grid-cols-3 sm:gap-8 md:gap-16">
    <div class="flex flex-col items-center text-center">
      <span
        class="font-raleway mb-3 text-6xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl"
      >
        {projectsCount}
      </span>
      <span
        class="font-raleway text-center text-base font-normal leading-snug text-white/90 sm:text-lg md:text-xl"
      >
        Projetos em<br />Desenvolvimento
      </span>
    </div>

    <div class="flex flex-col items-center text-center">
      <span
        class="font-raleway mb-3 text-6xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl"
      >
        {eventsDinamizadosCount}
      </span>
      <span
        class="font-raleway text-center text-base font-normal leading-snug text-white/90 sm:text-lg md:text-xl"
      >
        Eventos<br />Dinamizados
      </span>
    </div>

    <div class="flex flex-col items-center text-center">
      <span
        class="font-raleway mb-3 text-6xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl"
      >
        {eventsPresentesCount}
      </span>
      <span
        class="font-raleway text-center text-base font-normal leading-snug text-white/90 sm:text-lg md:text-xl"
      >
        Eventos<br />Presentes
      </span>
    </div>
  </div>

  <div class="mt-20 px-4 text-center sm:mt-28">
    <p class="font-raleway text-xl font-normal leading-relaxed text-white sm:text-2xl md:text-3xl">
      Acompanha tudo o que está a acontecer!
    </p>
    <p
      class="font-raleway mt-2 text-xl font-normal leading-relaxed text-white sm:text-2xl md:text-3xl"
    >
      Começa a Explorar melhor
      <a href={exploreHref} class="font-bold underline transition-opacity hover:opacity-80">
        aqui!
      </a>
    </p>
  </div>

  <div
    id="bottom-building-container"
    class="relative mt-12 flex w-full items-center justify-center sm:mt-16"
  >
    {#if buildingSrc}
      <img
        src={buildingSrc}
        alt="FEUP Building Outline"
        class="h-auto w-full object-contain pointer-events-none select-none"
      />
    {:else}
      <div class="flex min-h-45 sm:min-h-65 md:min-h-85 w-full items-center justify-center"></div>
    {/if}
  </div>
</section>
