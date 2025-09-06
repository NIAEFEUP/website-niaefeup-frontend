<script lang="ts">
  interface Props {
    label?: string;
    options: string[];
    horizontal?: boolean;
  }

  let { label = '', options, horizontal = false }: Props = $props();
</script>

<fieldset class="flex flex-row align-middle">
  {#if label}
    <legend
      class="font-source_code mx-1 font-bold text-white"
      class:float-left={horizontal}
      class:self-center={horizontal}
    >
      {label}
    </legend>
  {/if}
  {#each options as option (option)}
    <input
      id="radio-{label.toLowerCase()}-{option.toLowerCase()}"
      class="hidden text-center"
      type="radio"
      name={label}
      value={option}
    />
    <label
      class="bg-taupe-200 m-1 justify-self-start rounded-lg px-5 py-1 font-bold text-rose-950"
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
