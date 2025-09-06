<script lang="ts">
  interface Props {
    label?: string;
    id?: string;
    type?: string;
    placeholder?: string;
    isTextArea?: boolean;
    horizontal?: boolean;
  }

  let {
    label = '',
    id = '',
    type = 'text',
    placeholder = '',
    isTextArea = false,
    horizontal = false
  }: Props = $props();
</script>

<div class="flex flex-{horizontal ? 'row' : 'col'}">
  {#if label}
    <label class="font-source_code m-1 font-bold text-white" for={id}>{label}</label>
  {/if}
  {#if isTextArea}
    <textarea
      aria-label="textarea-input"
      class="font-source_code text-primary placeholder-primary mb-2 min-h-[100px] w-full rounded-lg bg-white p-2"
      {id}
      {placeholder}
      rows="4"
    ></textarea>
  {:else}
    <input
      aria-label="text-input"
      class="text-primary placeholder-primary mb-2 w-full rounded-lg bg-white p-2"
      {type}
      {id}
      {placeholder}
    />
  {/if}
</div>
