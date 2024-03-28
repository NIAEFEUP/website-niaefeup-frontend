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
    class="text-primary placeholder-primary mb-2 w-full rounded-lg p-2 font-source_code"
    {id}
    rows="4"
  /><br />
{:else}
  <input
    class="text-primary placeholder-primary mb-2 w-full rounded-lg p-2"
    {type}
    {id}
    {placeholder}
  /><br />
{/if}
