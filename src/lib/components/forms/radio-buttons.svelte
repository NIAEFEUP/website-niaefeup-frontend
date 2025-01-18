<script lang="ts">
  export let label: string;
  export let options: string[];
  export let horizontal: boolean = false;
</script>

<fieldset class="flex flex-row align-middle">
  <legend
    class="m-1 font-source_code font-bold text-white {horizontal ? 'float-left self-center' : ''}"
    >{label}</legend
  >
  {#each options as option}
    <input
      id="radio-{label.toLowerCase()}-{option.toLowerCase()}"
      class="hidden text-center"
      type="radio"
      name={label}
      value={option}
    />
    <label
      class="m-1 justify-self-start rounded-lg bg-taupe-200 px-5 py-1 font-bold text-rose-950"
      for="radio-{label.toLowerCase()}-{option.toLowerCase()}"
    >
      {option}
    </label>
  {/each}
</fieldset>

<style>
  input:checked + label {
    background-color: theme('colors.muted-red.400');
    color: theme('colors.taupe.100');
  }
</style>
