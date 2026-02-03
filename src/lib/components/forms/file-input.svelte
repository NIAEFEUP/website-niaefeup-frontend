<script lang="ts">
  interface Props {
    name?: string;
    value?: (string | File)[];
  }

  let { name = '', value = $bindable([]) }: Props = $props();

  let files = $state(value);
  let inputElement: HTMLInputElement;

  function updateInputElement() {
    if (!inputElement) return;

    const dataTransfer = new DataTransfer();
    
    files.forEach((file) => {
      if (file instanceof File) {
        dataTransfer.items.add(file);
      }
    });

    inputElement.files = dataTransfer.files;
    
    value = files;
  }

  function appendFile(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const newFiles = Array.from(target.files);
      
      files = [...files, ...newFiles];
      
      updateInputElement();
    }
  }

  function removeFile(fileToRemove: string | File) {
    files = files.filter((file) => file !== fileToRemove);
    updateInputElement();
  }

  function getFileName(file: string | File) {
    if (file instanceof File) return file.name;
    return typeof file === 'string' ? file.split('/').pop() : file;
  }
</script>

<div class="relative flex flex-col items-start gap-4">
  <label
    for="file-upload-{name}"
    class="muted-red cursor-pointer rounded-lg bg-muted-red-400 px-4 py-2 text-white hover:bg-red-500"
  >
    Selecionar ficheiro
  </label>

  <input
    id="file-upload-{name}"
    type="file"
    {name}
    multiple
    onchange={appendFile}
    class="hidden"
    bind:this={inputElement}
  />

  {#if files.length}
    <div class="flex flex-wrap gap-2">
      {#each files as file}
        <div class="file-item flex items-center gap-2 min-w-0 rounded bg-taupe-200 px-2 py-2">
          <span class="font-bold text-rose-950 text-sm">{getFileName(file)}</span>
          <button
            type="button" 
            onclick={() => removeFile(file)}
            class="rounded bg-red-200 px-2 font-bold text-black hover:bg-red-500"
          >
            X
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>