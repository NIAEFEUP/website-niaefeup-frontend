<script>
  export let label = '';
  export let id = '';
  export let type = 'text';
  export let placeholder = '';
  export let isTextArea = false;
  export let horizontal = false;
</script>

<div class="flex flex-{horizontal ? 'row' : 'col'} align-middle">
  {#if label}
    <label class="m-1 font-source_code font-bold text-white" for={id}>{label}</label>
  {/if}
  {#if isTextArea}
    <textarea
      aria-label="textarea-input"
      class="mb-2 min-h-[100px] w-full rounded-lg bg-white p-2 font-source_code text-primary placeholder-primary"
      {id}
      {placeholder}
      rows="4"
    />
  {:else}
    <input
      aria-label="text-input"
      class="mb-2 w-full rounded-lg bg-white p-2 text-primary placeholder-primary"
      {type}
      {id}
      {placeholder}
    />
  {/if}
</div>
