<script lang="ts">
  import { SvelteSet } from 'svelte/reactivity';
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';
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

  function fileIdentityKey(file: File): string {
    return `${file.name}\0${file.size}\0${file.lastModified}`;
  }

  function isAcceptedFileType(file: File): boolean {
    const tokens = accept
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (tokens.length === 0) return true;
    if (
      tokens.includes('image/*') &&
      (!file.type || file.type === 'application/octet-stream') &&
      /\.(jpe?g|png|gif|webp|bmp|svg)$/i.test(file.name)
    ) {
      return true;
    }
    for (const token of tokens) {
      if (token === 'image/*' && file.type.startsWith('image/')) return true;
      if (token.endsWith('/*')) {
        const prefix = token.slice(0, -1);
        if (file.type.startsWith(prefix)) return true;
      } else if (token.startsWith('.')) {
        if (file.name.toLowerCase().endsWith(token.toLowerCase())) return true;
      } else if (file.type === token) return true;
    }
    return false;
  }

  function appendFile(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const newFiles = Array.from(target.files);
      const existingKeys = new SvelteSet(
        value.filter((f): f is File => f instanceof File).map(fileIdentityKey)
      );
      const seenInSelection = new SvelteSet<string>();
      const uniqueNew = newFiles.filter((file) => {
        const key = fileIdentityKey(file);
        if (existingKeys.has(key) || seenInSelection.has(key)) return false;
        seenInSelection.add(key);
        return true;
      });
      const slotsLeft = maxFiles - value.length;
      if (slotsLeft <= 0) {
        createNotification(notificationMessages.MAX_FILES_REACHED);
        target.value = '';
        return;
      }

      let hadTypeReject = false;
      let hadSizeReject = false;
      const vetted: File[] = [];
      for (const file of uniqueNew) {
        if (vetted.length >= slotsLeft) break;
        if (!isAcceptedFileType(file)) {
          hadTypeReject = true;
          continue;
        }
        if (file.size > maxFileSizeBytes) {
          hadSizeReject = true;
          continue;
        }
        vetted.push(file);
      }

      if (hadTypeReject) {
        createNotification(notificationMessages.NOT_AN_IMAGE);
      }
      if (hadSizeReject) {
        createNotification(notificationMessages.FILE_TOO_LARGE);
      }

      if (vetted.length > 0) {
        value = [...value, ...vetted];
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
          <span class="text-sm font-bold text-rose-950">{getFileName(file)}</span>
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
