<script>
  import HorizontalTimeline from '@/lib/layout/HorizontalTimeline.svelte';
</script>

<section
  class="absolute mx-auto flex h-screen w-full min-w-[40%] flex-col items-center justify-center gap-10"
>
  <h1 class="font-source_code text-3xl font-medium text-white">
    &lt; <span class="font-bold">Equipa</span> /&gt;
  </h1>
  <HorizontalTimeline
    generations={[
      { schoolYear: '18/19' },
      { schoolYear: '19/20' },
      { schoolYear: '20/21' },
      { schoolYear: '21/22' },
      { schoolYear: '22/23' }
    ]}
  />
</section>
