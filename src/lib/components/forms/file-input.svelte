<script lang="ts">
  interface Props {
    name?: string;
    value?: (string | File)[];
  }

  let { name = '', value = $bindable([]) }: Props = $props();

  let files = $state(value);
  let inputElement: HTMLInputElement;
  let filesDeleted: string[] = $state([]);

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
    if (typeof fileToRemove === 'string') {
      filesDeleted.push(fileToRemove);
    }

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

  {#each filesDeleted as deletedUrl (deletedUrl)}
    <input type="hidden" name="{name}_to_delete" value={deletedUrl} />
  {/each}

  {#if files.length}
    <div class="flex flex-wrap gap-2">
      {#each files as file (getFileName(file))}
        <div class="file-item flex min-w-0 items-center gap-2 rounded bg-taupe-200 px-2 py-2">
          <span class="text-sm font-bold text-rose-950">{getFileName(file)}</span>
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
