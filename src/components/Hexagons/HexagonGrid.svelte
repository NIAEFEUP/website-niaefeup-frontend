<script lang="ts">
    // Inspired by https://github.com/sveltejs/svelte-virtual-list/blob/master/VirtualList.svelte
    type T = $$Generic;

    export let items: T[];
    export let cols: number;
    // const rows = Math.ceil(items.length / cols);

    export let gap: "small" | "medium" | "big" = "medium";
</script>

<!-- Warning: Very magic, totally eyeballed numbers in the next line -->
<ul class="grid gap-{gap}" style="container-name: hgrid; container-type: inline-size; grid-template-columns: 0.255fr repeat({cols}, 0.492fr 0.255fr); grid-auto-rows: 0.4991fr 0.5fr;"> 
    {#each items as item, index}
        {@const col = index % cols}
        {@const row = (index - col) / cols}
        <li style="grid-column: {2 * col + 1} / {2 * col + 4}; grid-row: {2 * row + 1 + col % 2} / {2 * row + 3 + col % 2}">
            <slot {item} {col} {row} />
        </li>
    {/each}
</ul>

<style>
    .gap-small {
        column-gap: 1%;
        row-gap: 3%;
    }

    .gap-medium {
        column-gap: 2%;
        row-gap: 5.5%;
    }

    .gap-big {
        column-gap: 3%;
        row-gap: 9%;
    }
</style>