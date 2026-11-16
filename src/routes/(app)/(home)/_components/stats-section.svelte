<script lang="ts">
  const stats = [
    {
      count: 4,
      line1: 'Projetos em',
      line2: 'Desenvolvimento'
    },
    {
      count: 14,
      line1: 'Eventos',
      line2: 'Dinamizados'
    },
    {
      count: 10,
      line1: 'Eventos',
      line2: 'Presentes'
    }
  ];
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
    {#each stats as { count, line1, line2 } (line1 + line2)}
      <div class="flex flex-col items-center text-center">
        <span
          class="font-raleway mb-3 text-6xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl"
        >
          {count}
        </span>
        <span
          class="font-raleway text-center text-base font-normal leading-snug text-white/90 sm:text-lg md:text-xl"
        >
          {line1}<br />{line2}
        </span>
      </div>
    {/each}
  </div>

  <div class="mt-20 px-4 text-center sm:mt-28">
    <p class="font-raleway text-xl font-normal leading-relaxed text-white sm:text-2xl md:text-3xl">
      Acompanha tudo o que está a acontecer!
    </p>
    <p
      class="font-raleway mt-2 text-xl font-normal leading-relaxed text-white sm:text-2xl md:text-3xl"
    >
      Começa a Explorar melhor
      <a href="/projects" class="font-bold underline transition-opacity hover:opacity-80">
        aqui!
      </a>
    </p>
  </div>

  <div
    id="bottom-building-container"
    class="relative mt-12 flex w-full items-center justify-center sm:mt-16"
  >
    <img
      src="/images/landing_feup_buildings_2.svg"
      alt="Contorno do edifício da FEUP"
      class="pointer-events-none h-auto w-full select-none object-contain"
    />
  </div>
</section>
