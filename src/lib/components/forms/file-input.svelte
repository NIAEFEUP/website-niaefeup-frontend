<script lang="ts">
  interface Props {
    name?: string;
  }

  let { name = '' }: Props = $props();

  let files = $state([]);
  function appendFile(event) {
    files = Array.from(event.target.files);
  }
  function popFile(fileRemove) {
    files = files.filter((file) => file != fileRemove);
  }
</script>

<div class="relative flex items-center space-x-4">
  <label
    for="file-upload"
    class="muted-red cursor-pointer rounded-lg bg-muted-red-400 px-4 py-2 text-white hover:bg-red-500"
  >
    Selecionar ficheiro
  </label>

  <input id="file-upload" type="file" {name} multiple onchange={appendFile} class="hidden" />

  {#if files.length}
    {#each files as file (file.name)}
      <div class="file-item bg-taupe-200 min-w-0 rounded px-2 py-2">
        <span class="text-rose-950 font-bold">{file.name}</span>
        <button
          onclick={() => popFile(file)}
          class=" order-2 rounded bg-taupe-200 px-1 font-bold text-black hover:bg-red-500 md:right-[-5px]"
          >X</button
        >
      </div> 
    {/each}
  {/if}
</div>
