<script>
  export let name = '';

  let files = [];
  function append_file(event) {
    files = Array.from(event.target.files);
  }
  function pop_file(fileRemove) {
    files = files.filter((file) => file != fileRemove);
  }
</script>

<div class="relative flex items-center space-x-4">
  <label
    for="file-upload"
    class="muted-red cursor-pointer rounded-lg bg-taupe-200 px-4 py-2 font-bold text-rose-950 hover:bg-red-500"
  >
    Selecionar ficheiro
  </label>

  <input id="file-upload" type="file" {name} multiple on:change={append_file} class="hidden" />

  {#if files.length}
    {#each files as file (file.name)}
      <div class="file-item">
        <span>{file.name}</span>
        <button
          on:click={() => pop_file(file)}
          class=" order-2 rounded bg-white px-1 font-bold text-black hover:bg-red-500 md:right-[-5px]"
          >X</button
        >
      </div>
    {/each}
  {/if}
</div>
