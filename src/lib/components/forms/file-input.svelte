<script lang="ts">
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';
  import { getFileDisplayName, processAppendFiles } from '$lib/components/forms/file-input-logic';
  import { createNotification } from '@/routes/(app)/_components/layout/notifications';
  import notificationMessages from '@/routes/(app)/_components/layout/notifications/notification-messages';

  const DEFAULT_MAX_FILE_BYTES = 5 * 1024 * 1024;
  const DEFAULT_MAX_FILES = 30;

  interface Props {
    name?: string;
    value?: (string | File)[];
    accept?: string;
    maxFileSizeBytes?: number;
    maxFiles?: number;
  }

  let {
    name = '',
    value = $bindable([]),
    accept = 'image/*',
    maxFileSizeBytes = DEFAULT_MAX_FILE_BYTES,
    maxFiles = DEFAULT_MAX_FILES
  }: Props = $props();

  let inputElement = $state<HTMLInputElement | undefined>(undefined);
  let filesDeleted: string[] = $state([]);

  $effect(() => {
    void value;
    void inputElement;
    updateInputElement();
  });

  function updateInputElement() {
    const el = inputElement;
    if (!el) return;
    const dataTransfer = new DataTransfer();
    value.forEach((file) => {
      if (file instanceof File) {
        dataTransfer.items.add(file);
      }
    });
    el.files = dataTransfer.files;
  }

  function appendFile(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const newFiles = Array.from(target.files);
      const result = processAppendFiles({
        newFiles,
        value,
        accept,
        maxFiles,
        maxFileSizeBytes
      });

      if (result.outcome === 'max_files') {
        createNotification(notificationMessages.MAX_FILES_REACHED);
        target.value = '';
        return;
      }

      if (result.hadTypeReject) {
        createNotification(notificationMessages.NOT_AN_IMAGE);
      }
      if (result.hadSizeReject) {
        createNotification(notificationMessages.FILE_TOO_LARGE);
      }

      if (result.vetted.length > 0) {
        value = [...value, ...result.vetted];
      }
      updateInputElement();
    }
    target.value = '';
  }

  function removeFile(fileToRemove: string | File) {
    if (typeof fileToRemove === 'string') {
      filesDeleted = [...filesDeleted, fileToRemove];
    }

    value = value.filter((file) => file !== fileToRemove);
    updateInputElement();
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
    {accept}
    multiple
    onchange={appendFile}
    class="hidden"
    bind:this={inputElement}
  />

  {#each filesDeleted as deletedUrl (deletedUrl)}
    <input type="hidden" name="{name}_to_delete" value={deletedUrl} />
  {/each}

  {#if value.length}
    <div class="flex flex-wrap gap-2">
      {#each value as file (file)}
        <div class="file-item flex min-w-0 items-center gap-2 rounded bg-taupe-200 px-2 py-2">
          <span class="text-sm font-bold text-rose-950">{getFileDisplayName(file)}</span>
          <button
            type="button"
            aria-label="Remover ficheiro"
            onclick={() => removeFile(file)}
            class="flex items-center justify-center rounded bg-red-200 p-1.5 text-black hover:bg-red-500"
          >
            <Icon src={Icons.Close} size="16" className="shrink-0" />
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>
