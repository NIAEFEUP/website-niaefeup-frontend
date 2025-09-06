<script lang="ts">
  
  interface Props {
    label?: string;
    id?: string;
    type?: string;
    placeholder?: string;
    isTextArea?: boolean;
    horizontal?: boolean;
    textGap?: string;
    required?: boolean;
    name?: string;
    value?: string;
    className?: string;  
  }

  let {
    label = '',
    id = '',
    type = 'text',
    placeholder = '',
    isTextArea = false,
    horizontal = false,
    textGap = "2",
    required = false,
    name = "",
    value = $bindable(""),
    className = '', 
  }: Props = $props();
</script>

<div
  class="flex {horizontal ? 'flex-row justify-between' : 'flex-col'} {className}"
  class:align-middle={horizontal && !isTextArea}
>
  {#if label}
    <div class="w-[{textGap}vw]">
      <label
        class="m-1 flex flex-row font-source_code font-bold text-white"
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
      class="min-h-[100px] w-full rounded-lg bg-white p-2 font-source_code text-primary placeholder-primary"
      {id}
      {name}
      {placeholder}
      {required}
      bind:value
      rows="4"
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
      bind:value
    />
  {/if}
</div>
