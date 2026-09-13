<script lang="ts">
  import DepartmentsSection from './_components/departments-section.svelte';
  import AboutSection from './_components/about-section.svelte';
  import HeroSection from './_components/hero-section.svelte';
  import StatsSection from './_components/stats-section.svelte';
</script>

<svelte:head>
  <title>NIAEFEUP - Núcleo de Informática da AEFEUP</title>
  <meta
    name="description"
    content="NIAEFEUP - Um grupo de estudantes a desenvolver para estudantes."
  />
</svelte:head>

<div class="flex w-full flex-col">
  <HeroSection />
  <AboutSection />
  <DepartmentsSection />
  <StatsSection />
</div>
