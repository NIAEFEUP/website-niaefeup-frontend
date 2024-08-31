<script>
  export let label = '';
  export let id = '';
  export let type = 'text';
  export let placeholder = '';
  export let isTextArea = false;
</script>

<label class="m-1 font-source_code font-bold text-white" for={id}>{label}</label><br class="mb-1" />
{#if isTextArea}
  <textarea
    aria-label="textarea-input"
    class="mb-2 w-full rounded-lg p-2 font-source_code text-primary placeholder-primary"
    {id}
    rows="4"
  /><br />
{:else}
  <input
    aria-label="text-input"
    class="mb-2 w-full rounded-lg p-2 text-primary placeholder-primary"
    {type}
    {id}
    {placeholder}
  /><br />
{/if}
