<script lang="ts">
  import type { Component } from 'svelte';

  // Inspired by https://github.com/sveltejs/svelte-virtual-list/blob/master/VirtualList.svelte
  type T = $$Generic;

  interface Props {
    items: T[];
    cols: number;
    gap?: 'small' | 'medium' | 'big';
    orientation: 'horizontal' | 'vertical';
    component: Component<{ orientation: string; data: T }>;
  }

  let { items, cols, gap = 'medium', orientation, component }: Props = $props();

  const gridColumnsStyle = $derived(
    orientation === 'horizontal'
      ? `grid-template-columns: 0.2425fr repeat(${cols}, 0.4805fr 0.2425fr); grid-auto-rows: 0.5fr 0.5fr;`
      : `grid-template-columns: 0.5fr repeat(${cols}, 0.505fr 0.5fr); grid-auto-rows: 0.251fr 0.5fr;`
  );
</script>

<!-- The grid column sizes used are magic numbers that look good with the Hexagon component -->
<ul class="grid gap-{orientation}-{gap}" style={gridColumnsStyle}>
  {#each items as item, index (index)}
    {@const isHorizontal = orientation === 'horizontal'}
    {@const col = index % cols}
    {@const row = (index - col) / cols}
    {@const horizontalColStart = 2 * col + 1}
    {@const colStart = horizontalColStart + (isHorizontal ? 0 : row % 2)}
    {@const verticalRowStart = 2 * row + 1}
    {@const rowStart = verticalRowStart + (isHorizontal ? col % 2 : 0)}
    {@const colEnd = isHorizontal ? 2 * col + 4 : 2 * col + 3 + (row % 2)}
    {@const rowEnd = isHorizontal ? 2 * row + 3 + (col % 2) : 2 * row + 4}

    {@const SvelteComponent = component}
    <li style="grid-column: {colStart} / {colEnd}; grid-row: {rowStart} / {rowEnd}">
      <SvelteComponent {orientation} data={item} />
    </li>
  {/each}
</ul>

<style>
  .gap-horizontal-small {
    column-gap: 1.25rem;
    row-gap: 0.75rem;
  }

  .gap-vertical-small {
    row-gap: 1.25rem;
    column-gap: 0.75rem;
  }

  .gap-horizontal-medium {
    column-gap: 1.75rem;
    row-gap: 1.125rem;
  }

  .gap-vertical-medium {
    row-gap: 1.75rem;
    column-gap: 1.125rem;
  }

  .gap-horizontal-big {
    column-gap: 2.25rem;
    row-gap: 1.5rem;
  }

  .gap-vertical-big {
    row-gap: 2.25rem;
    column-gap: 1.5rem;
  }
</style>
