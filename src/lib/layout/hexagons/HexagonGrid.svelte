<script lang="ts">
  // Inspired by https://github.com/sveltejs/svelte-virtual-list/blob/master/VirtualList.svelte
  type T = $$Generic;

  export let items: T[];
  export let cols: number;

  export let gap: 'small' | 'medium' | 'big' = 'medium';
  export let orientation: 'horizontal' | 'vertical';

  const gridColumnsStyle =
    orientation === 'horizontal'
      ? `grid-template-columns: 0.2425fr repeat(${cols}, 0.4805fr 0.2425fr); grid-auto-rows: 0.5fr 0.5fr;`
      : `grid-template-columns: 0.5fr repeat(${cols}, 0.505fr 0.5fr); grid-auto-rows: 0.251fr 0.5fr;`;
</script>

<!-- The grid column sizes used are magic numbers that look good with the Hexagon component -->
<ul class="grid gap-{orientation}-{gap}" style={gridColumnsStyle}>
  {#each items as item, index}
    {#if orientation === 'horizontal'}
      {@const col = index % cols}
      {@const row = (index - col) / cols}
      {@const colStart = 2 * col + 1}
      {@const colEnd = 2 * col + 4}
      {@const rowStart = 2 * row + 1 + (col % 2)}
      {@const rowEnd = 2 * row + 3 + (col % 2)}
      <li style="grid-column: {colStart} / {colEnd}; grid-row: {rowStart} / {rowEnd}">
        <slot {item} {col} {row} />
      </li>
    {:else}
      {@const col = index % cols}
      {@const row = (index - col) / cols}
      {@const rowStart = 2 * row + 1}
      {@const rowEnd = 2 * row + 4}
      {@const colStart = 2 * col + 1 + (row % 2)}
      {@const colEnd = 2 * col + 3 + (row % 2)}
      <li style="grid-column: {colStart} / {colEnd}; grid-row: {rowStart} / {rowEnd}">
        <slot {item} {col} {row} />
      </li>
    {/if}
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
