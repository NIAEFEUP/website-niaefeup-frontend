<script lang="ts">
  import { guidGenerator } from '$lib/utils'

  export let value = '';
  export let label = '';
  export let id = `labelinput-${guidGenerator()}`;
  export let type = 'text';
  export let placeholder = '';
  export let isTextArea = false;
  export let required = false;
  export let horizontal = false;
  export let textGap;
  export let name = '';
  
  function changeColor() {
    const input = document.getElementById(id) as HTMLInputElement | null;
    if (!input) return
    const inputValue = input.value;
    if(inputValue){
      input.classList.add('text-primary')
      input.classList.remove('text-secondary')  
      return
    }
    input.classList.remove('text-primary')
    input.classList.add('text-secondary')
  }

  import { onMount } from 'svelte';

  onMount(() => {
    changeColor();
  });

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
      class="min-h-[100px] w-full rounded-lg bg-white p-2 font-source_code text-secondary"
      {id}
      {name}
      {placeholder}
      {required}
      rows="4"
    >
    </textarea>
  {:else}
    <input
      on:input={changeColor}
      aria-label="text-input"
      class="w-full rounded-lg bg-white p-2 placeholder-secondary"
      {type}
      {id}
      {name}
      {placeholder}
      {required}
      {value}
    />
  {/if}
</div>
