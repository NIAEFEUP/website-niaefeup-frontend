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
    textGap?: string;
    className?: string;
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
    textGap = '2',
    className = '',
    required = false,
    minlength = undefined,
    maxlength = undefined,
    ...rest
  }: Props = $props();
</script>

<div
  class="flex {horizontal ? 'flex-row justify-between' : 'flex-col'} {className}"
  class:align-middle={horizontal && !isTextArea}
>
  {#if label}
    <div class="w-[{textGap}vw]">
      <label class="m-1 flex flex-row font-source_code font-bold text-white" for={id}>
        {label}
        {#if required}
          <span class="text-sm">*</span>
        {/if}
      </label>
    </div>
  {/if}
  {#if isTextArea}
    <textarea
      aria-label="textarea-input"
      class="mb-2 min-h-[100px] w-full rounded-lg bg-white p-2 font-source_code text-primary placeholder-primary"
      rows="4"
      {id}
      {name}
      {placeholder}
      {required}
      {minlength}
      {maxlength}
      {...rest}
      bind:value
    ></textarea>
  {:else}
    <input
      aria-label="text-input"
      class="w-full rounded-lg bg-white p-2 text-primary placeholder-primary"
      {type}
      {id}
      {name}
      {placeholder}
      {required}
      {minlength}
      {maxlength}
      {...rest}
      bind:value
    />
  {/if}
</div>
