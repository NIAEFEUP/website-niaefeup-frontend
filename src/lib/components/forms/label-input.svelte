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
    class?: string;
    [key: string]: unknown;
  }
  function changeColor() {
    const input = document.getElementById(id) as HTMLInputElement | null;
    if (!input) return;
    const inputValue = input.value;
    if (inputValue) {
      input.classList.add('text-primary');
      input.classList.remove('text-secondary');
      return;
    }
    input.classList.remove('text-primary');
    input.classList.add('text-secondary');
  }

  let {
    value = $bindable(),
    label = '',
    id = '',
    name = '',
    type = 'text',
    placeholder = '',
    isTextArea = false,
    required = false,
    minlength = undefined,
    maxlength = undefined,
    class: className = '',
    ...rest
  }: Props = $props();
</script>

<div class="flex} {className}">
  {#if label}
    <div style="width: 20em">
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
      {required}
      {minlength}
      {maxlength}
      {...rest}
      bind:value
    ></textarea>
  {:else}
    <input
      oninput={changeColor}
      aria-label="text-input"
      class="w-full rounded-lg bg-white p-2 text-primary placeholder-secondary"
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
