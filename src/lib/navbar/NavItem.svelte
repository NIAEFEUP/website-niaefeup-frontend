<script lang="ts">
    export let selected: boolean;
</script>

<!-- svelte-ignore a11y-clickw-events-have-key-events -->
<li class="grid grid-cols-[2ch_1fr_3ch] pl-4">
    {#if selected}
        <strong class="contents">
            <span class="justify-self-center">&lt;</span>
            <div class="col-start-2">
                <slot />
            </div>
            <span class="justify-self-center">/&gt;</span>
        </strong>
    {:else}
        <div class="col-start-2">
            <slot />
        </div>
    {/if}
</li>