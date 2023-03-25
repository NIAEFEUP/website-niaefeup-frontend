<script lang="ts">
  // Inspired by https://github.com/sveltejs/svelte-virtual-list/blob/master/VirtualList.svelte
  type T = $$Generic;

  export let items: T[];
  export let cols: number;

  export let gap: 'small' | 'medium' | 'big' = 'medium';
</script>

<!-- Warning: Very magic, totally eyeballed numbers in the next line -->
<ul
  class="grid gap-{gap}"
  style="grid-template-columns: 0.2425fr repeat({cols}, 0.4805fr 0.2425fr); grid-auto-rows: 0.5fr 0.5fr;"
>
  {#each items as item, index}
    {@const col = index % cols}
    {@const row = (index - col) / cols}
    {@const colStart = 2 * col + 1}
    {@const colEnd = 2 * col + 4}
    {@const rowStart = 2 * row + 1 + (col % 2)}
    {@const rowEnd = 2 * row + 3 + (col % 2)}
    <li
      style="grid-column: {colStart} / {colEnd}; grid-row: {rowStart} / {rowEnd}"
    >
        <slot {item} {col} {row} />
    </li>
  {/each}
</ul>

<style>
  .gap-small {
    column-gap: 1.25rem;
    row-gap: 0.75rem;
  }

  .gap-medium {
    column-gap: 1.75rem;
    row-gap: 1.125rem;
  }

  .gap-big {
    column-gap: 2.25rem;
    row-gap: 1.5rem;
  }
</style>
