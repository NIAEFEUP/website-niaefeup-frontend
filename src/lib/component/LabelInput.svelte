<script>
  export let label = '';
  export let id = '';
  export let type = 'text';
  export let placeholder = '';
  export let isTextArea = false;
</script>

<label class="m-1 text-white font-source_code font-bold" for={id}>{label}</label><br class="mb-1">
{#if isTextArea}
<textarea class="rounded-lg mb-2 p-1 w-full text-primary font-source_code placeholder-primary" id={id} rows="4"></textarea><br>
{:else}
<input class="rounded-lg mb-2 p-1 text-primary placeholder-primary w-full" type={type} id={id} placeholder={placeholder}><br>
{/if}
