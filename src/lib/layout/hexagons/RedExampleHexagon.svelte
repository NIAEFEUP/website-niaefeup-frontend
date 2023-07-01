<script lang="ts">
  import Hexagon from './Hexagon.svelte';

  type T = $$Generic;

  export let orientation: 'horizontal' | 'vertical';
  export let data: T;
</script>

<Hexagon {orientation}>
  <div class="p-10 font-bold text-red-900">
    {data}
  </div>
</Hexagon>
