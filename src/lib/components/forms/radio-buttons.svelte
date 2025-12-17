<script lang="ts">
  interface Props {
    label?: string;
    options: string[];
    horizontal?: boolean;
    name?: string;
  }

  let { label = '', options, horizontal = false, name = '' }: Props = $props();
  let selected = $state(options[0]);
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
      {name}
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
