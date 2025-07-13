<script lang="ts">
  export let label: string = '';
  export let options: string[];
  export let horizontal: boolean = false;
  export let selected: string = '';
</script>

<fieldset class="flex flex-row align-middle">
  {#if label}
    <legend
      class="mx-1 font-source_code font-bold text-white"
      class:float-left={horizontal}
      class:self-center={horizontal}
    >
      {label}
    </legend>
  {/if}
  {#each options as option}
    <input
      id="radio-{label.toLowerCase()}-{option.toLowerCase()}"
      class="hidden text-center"
      type="radio"
      name={label}
      value={option}
      bind:group={selected}
    />
    <label
      class="m-1 justify-self-start rounded-lg px-5 py-1 font-bold {selected === option
        ? 'bg-muted-red-400 text-taupe-100'
        : 'bg-taupe-200 text-rose-950'}"
      for="radio-{label.toLowerCase()}-{option.toLowerCase()}"
    >
      {option}
    </label>
  {/each}
</fieldset>
