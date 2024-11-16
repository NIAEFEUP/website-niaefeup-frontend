<script>
    export const options = [
        "test1",
        "test2"
    ];
    let selectedOption;
</script>

<div>
    {#each options as option}
        <input id="radio-{option}" class="radio-button hidden" type="radio" bind:group={selectedOption} value={option}>
        <label
            class="m-1 justify-self-start rounded-lg bg-taupe-200 px-5 py-1 text-rose-950"
            for="radio-{option}"
        >
            {option}
        </label>
    {/each}
</div>

<style>
    .radio-button:checked + label {
        background-color: theme('colors.muted-red.400');
        color: theme('colors.taupe.100');
    }
</style>
