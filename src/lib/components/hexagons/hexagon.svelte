<script lang="ts">
  import HorizontalHexagon from './internal/horizontal-hexagon.svelte';
  import VerticalHexagon from './internal/vertical-hexagon.svelte';

  interface Props {
    orientation: 'horizontal' | 'vertical';
    children?: import('svelte').Snippet;
  }

  let { orientation, children }: Props = $props();
</script>

{#if orientation === 'horizontal'}
  <HorizontalHexagon>
    {@render children?.()}
  </HorizontalHexagon>
{:else}
  <VerticalHexagon>
    {@render children?.()}
  </VerticalHexagon>
{/if}
