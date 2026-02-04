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

<div class="flex flex-{horizontal ? 'row' : 'col'} {$$props.className}">
  {#if label}
    <div style="width: {textGap ? textGap : '20'}em;">
      <label
        class="m-1 flex flex-row font-source_code font-bold text-white"
        class:flex-row={required}
        for={id}
      >
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
      {name}
      {required}
      {minlength}
      {maxlength}
      {...rest}
      bind:value
    ></textarea>
  {:else}
    <input
      on:input={changeColor}
      aria-label="text-input"
      class="w-full rounded-lg bg-white p-2 placeholder-secondary"
      {type}
      {id}
      {name}
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
