<script>
    export const options = [
        "test1",
        "test2"
    ]
    let selectedOption = "";
</script>

<div>
    <p>Estatutos</p>
    <ul class ="radio-buttons">
        {#each options as option}
            <input id="radio-input-{option}" class="radio-input" type="radio" bind:group={selectedOption} value={option}>
            <label class="radio-label" for="radio-input-{option}">{option}</label>
        {/each}
    </ul>
</div>

<style>
    .radio-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 25%;
    }

    .radio-label {
        text-align: center;
        display: inline-block;
        min-width: 160px;
        margin: 5px;
        padding: 10px 20px;
        border: 1px solid #ccc;
        border-radius: 20px;
        cursor: pointer;
        background-color: #561919;
        transition: background-color 0.3s, border-color 0.3s;
    }

    .radio-input{
        display: none;
    }

    .radio-input:checked + .radio-label {
        background-color: #FFE9E9;
        color: #561919;
    }
</style>