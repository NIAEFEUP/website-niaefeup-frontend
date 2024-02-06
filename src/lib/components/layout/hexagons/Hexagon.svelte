<script lang="ts">
  import HorizontalHexagon from './internal/HorizontalHexagon.svelte';
  import VerticalHexagon from './internal/VerticalHexagon.svelte';

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
