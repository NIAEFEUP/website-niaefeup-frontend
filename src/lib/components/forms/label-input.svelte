<script>
  export let label = '';
  export let id = '';
  export let type = 'text';
  export let placeholder = '';
  export let isTextArea = false;
  export let required = false;
  export let name = '';
  export let horizontal = false; /* 
  export let boxwidth = '[40vw]';
  export let labelwidth = '1/6'; */
</script>

<div
  class="flex w-[38.5vw] flex-{horizontal ? 'row justify-between' : 'col'}"
  class:align-middle={horizontal && !isTextArea}
>
  {#if label}
    <label class="m-1 font-source_code font-bold text-white" for={id}>{label}</label>
  {/if}
  {#if isTextArea}
    <textarea
      aria-label="textarea-input"
      class="mb-2 min-h-[100px] w-[30vw] rounded-lg bg-white p-2 font-source_code text-primary placeholder-primary"
      {id}
      {placeholder}
      {required}
      rows="4"
    />
  {:else}
    <input
      aria-label="text-input"
      class="mb-2 w-[30vw] rounded-lg bg-white p-2 text-primary placeholder-primary"
      {type}
      {id}
      {placeholder}
      {required}
      {name}
    />
  {/if}
</div>
