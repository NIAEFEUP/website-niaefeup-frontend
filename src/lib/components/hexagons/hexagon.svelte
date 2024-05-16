<script lang="ts">
  import HorizontalHexagon from './internal/horizontal-hexagon.svelte';
  import VerticalHexagon from './internal/vertical-hexagon.svelte';

  export let orientation: 'horizontal' | 'vertical';
</script>

{#if orientation === 'horizontal'}
  <HorizontalHexagon>
    <slot />
  </HorizontalHexagon>
{:else}
  <VerticalHexagon>
    <slot />
  </VerticalHexagon>
{/if}
