<script lang="ts">
  interface Props {
    label?: string;
    id?: string;
    type?: string;
    placeholder?: string;
    isTextArea?: boolean;
    horizontal?: boolean;
    value?: string;
  }

  let {
    label = '',
    id = '',
    type = 'text',
    placeholder = '',
    isTextArea = false,
    horizontal = false,
    value = $bindable()
  }: Props = $props();
</script>

<div class="flex flex-{horizontal ? 'row' : 'col'}">
  {#if label}
    <label class="m-1 w-1/5 font-source_code font-bold text-white" for={id}>{label}</label>
  {/if}
  {#if isTextArea}
    <textarea
      aria-label="textarea-input"
      class="mb-2 min-h-[100px] w-full rounded-lg bg-white p-2 font-source_code text-primary placeholder-primary"
      {id}
      {placeholder}
      rows="4"
      bind:value
    ></textarea>
  {:else}
    <input
      aria-label="text-input"
      class="mb-2 w-full rounded-lg bg-white p-2 text-primary placeholder-primary"
      {type}
      {id}
      {placeholder}
      bind:value
    />
  {/if}
</div>
