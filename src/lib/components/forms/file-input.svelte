<script>
  let files = []; //criamos uma lista vazia?

  //Fazer funćao de dar append
  function append_file(event) {
    files = Array.from(event.target.files);
  }
  //Fazer funćao de remover
  function pop_file(fileRemove) {
    files = files.filter((file) => file != fileRemove);
  }
</script>

<div class="relative flex items-center space-x-4">
  <label
    for="file-upload"
    class="muted-red cursor-pointer rounded-lg px-4 py-2 text-white hover:bg-red-600"
  >
    Selecionar ficheiro
  </label>

  <!-- no input deve colocar a funcao de adicionar no array -->
  <input id="file-upload" type="file" multiple on:change={append_file} class="hidden" />

  {#if files.length}
    {#each files as file (file.name)}
      <div class="file-item">
        <span>{file.name}</span>
        <!-- colocar a funcao de remover o file no button -->
        <button
          on:click={() => pop_file(file)}
          class=" order-2 rounded bg-red-600 px-1 font-bold text-white hover:bg-muted-red-400 md:right-[-5px]"
          >X</button
        >
      </div>
    {/each}
  {/if}
</div>

<!-- <script>
    let files = null;
    $: () => {
      if (files) {
        console.log(files);
        for (const file of files) {
          console.log(`${file.name}: ${file.size} bytes`);
        }
      } else console.log("No Files")
    };
    
    
</script>
  
  <div class="relative flex items-center space-x-4">
   <label
      for="file-upload"
      class="muted-red cursor-pointer rounded-lg px-4 py-2 text-white hover:bg-red-600"
    >
      Selecionar ficheiro
    </label>
    <input type="file" id="file-upload" multiple bind:files class="hidden" />


    {#if files}
      {#each files as file}
      <button class="md:absolute md:top-[-5px] md:right-[-5px] order-2 px-1 text-white font-bold bg-red-600 rounded hover:bg-muted-red-400" 
    on:click={() => {
      files = Array.from(files).slice(0, -1);
      files[0]
      }}> x </button>
        <div class="rounded-lg bg-taupe-200 px-4 py-2 text-rose-950 order-1">
          <p>{file.name}</p>
        </div>
      {/each}
    {/if}
  </div> -->
