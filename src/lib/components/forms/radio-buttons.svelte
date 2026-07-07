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
      class="mx-1 font-source_code font-bold text-white"
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
      class="m-1 justify-self-start rounded-lg bg-taupe-200 px-5 py-1 font-bold text-rose-950"
      for="radio-{label.toLowerCase()}-{option.toLowerCase()}"
    >
      {option}
    </label>
  {/each}
</fieldset>

<style>
  input:checked + label {
    background-color: var(--color-muted-red-400);
    color: var(--color-taupe-100);
  }
</style>
