<script lang="ts">
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';
  import { createNotification } from '@/routes/(app)/_components/layout/notifications';
  import notificationMessages from '@/routes/(app)/_components/layout/notifications/notification-messages';

  interface Props {
    text: string;
    name?: string;
    required?: boolean;
    value?: string;
    source?: string | null;
  }

  let { text, name = 'profilePicture', required = false, value = '', source = '' }: Props = $props();
  let image: string | undefined = $state();
  let fileInput: HTMLInputElement | undefined = $state();

  const onFileSelected = (e) => {
    const file = e.target.files[0];

    // ensure the file is an image
    if (file?.type?.split('/')[0] !== 'image') {
      createNotification(notificationMessages.NOT_AN_IMAGE);
      return;
    }

    // update the image
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      image = e.target?.result?.toString() ?? image;
    };
  };
</script>

<div class="flex flex-col items-center justify-center gap-y-2">
  <input
    class="opacity-0"
    type="file"
    {name}
    {value}
    {required}
    accept="image/*"
    onchange={(e) => onFileSelected(e)}
    bind:this={fileInput}
  />
  <button
    type="button"
    aria-label="Upload image"
    class="relative flex h-[200px] w-[200px] items-center justify-center rounded-md bg-muted-red-400 text-center"
    onclick={() => {
      fileInput.click();
    }}
  >
    {#if image || source}
      <img
        class="h-[200px] w-[200px] rounded-md object-cover"
        src={image ? image : source}
        alt="Selected {name.replace(/([A-Z])/g, ' $1').toLowerCase()}"
      />
    {:else}
      <p class="font-medium text-white">{text}<span class="text-2xl">*</span></p>
    {/if}
    <div
      class="absolute bottom-0 right-0 m-2 flex h-[15%] w-[15%] cursor-pointer items-center justify-center rounded-md bg-rose-950"
    >
      <Icon src={Icons.Edit} color="white" size="60%" />
    </div>
  </button>
  <button
    type="button"
    aria-label="Remove image"
    class="{image ? 'visible' : 'invisible'} text-sm font-bold text-white hover:underline"
    onclick={() => {
      fileInput.value = image = '';
    }}
  >
    Remover imagem
  </button>
</div>
