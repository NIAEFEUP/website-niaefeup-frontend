<script lang="ts">
    export let selected: boolean;
    export let onSelect: () => void;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<li on:click={onSelect}>
    {#if selected}
        <strong>
            <p>&lt;</p>
            <slot />
            <p>&gt;</p>
        </strong>
    {:else}
        <slot />
    {/if}
</li>