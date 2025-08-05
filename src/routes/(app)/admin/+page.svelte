<script lang="ts">
  import type { PageData } from './$types';
  import Technologies from './_components/technologies.svelte';

  import * as Tabs from '$lib/components/ui/tabs/index.js';

  export let data: PageData;
  export let technologies = data.technologies;
</script>

<section class="flex w-full items-center justify-center">
  <Tabs.Root value="technologies" class="">
    <Tabs.List class="mb-8 flex w-full flex-row gap-x-16 bg-transparent md:gap-x-32">
      <Tabs.Trigger
        class="relative bg-transparent p-0 text-2xl font-bold transition-all duration-300 after:absolute after:bottom-[-5px] after:left-0 after:h-[0.2em] after:bg-red-500 after:content-[''] data-[state=active]:after:w-full"
        value="roles"
      >
        Roles
      </Tabs.Trigger>
      <Tabs.Trigger
        class="relative bg-transparent p-0 text-2xl font-bold transition-all duration-300 after:absolute after:bottom-[-5px] after:left-0 after:h-[0.2em] after:bg-red-500 after:content-[''] data-[state=active]:after:w-full"
        value="technologies"
      >
        Tecnologias
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="roles">Roles</Tabs.Content>
    <Tabs.Content value="technologies">
      <Technologies {technologies} />
    </Tabs.Content>
  </Tabs.Root>
</section>
