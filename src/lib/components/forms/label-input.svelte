<script lang="ts">
  interface Props {
    value?: string;
    label?: string;
    id?: string;
    name?: string;
    type?: string;
    placeholder?: string;
    isTextArea?: boolean;
    horizontal?: boolean;
    required?: boolean;
    minlength?: number | undefined;
    maxlength?: number | undefined;
    [key: string]: unknown;
  }

  let {
    value = $bindable(),
    label = '',
    id = '',
    name = '',
    type = 'text',
    placeholder = '',
    isTextArea = false,
    horizontal = false,
    required = false,
    minlength = undefined,
    maxlength = undefined,
    ...rest
  }: Props = $props();
</script>

<div class="flex flex-{horizontal ? 'row' : 'col'}">
  {#if label}
    <label class="m-1 font-source_code font-bold text-white" for={id}>{label}</label>
  {/if}
  {#if isTextArea}
    <textarea
      aria-label="textarea-input"
      class="mb-2 min-h-[100px] w-full rounded-lg bg-white p-2 font-source_code text-primary placeholder-primary"
      rows="4"
      {id}
      {placeholder}
      {name}
      {required}
      {minlength}
      {maxlength}
      {...rest}
      bind:value></textarea>
  {:else}
    <input
      aria-label="text-input"
      class="mb-2 w-full rounded-lg bg-white p-2 text-primary placeholder-primary"
      {type}
      {id}
      {placeholder}
      {name}
      {required}
      {minlength}
      {maxlength}
      {...rest}
      bind:value
    />
  {/if}
</div>
