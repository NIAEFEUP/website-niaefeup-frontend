<script lang="ts">
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';
  import { createNotification } from '@/routes/(app)/_components/layout/notifications';
  import notificationMessages from '@/routes/(app)/_components/layout/notifications/notification-messages';

  export let text: string;
  export let name: string = 'profilePicture';
  let image: string;
  let fileInput: HTMLInputElement;

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

<div class="flex flex-col items-center justify-center gap-y-2 self-start">
  <input
    style="display:none"
    type="file"
    {name}
    accept="image/*"
    on:change={(e) => onFileSelected(e)}
    bind:this={fileInput}
  />
  <button
    type="button"
    aria-label="Upload image"
    class="relative flex h-[200px] w-[200px] items-center justify-center rounded-md bg-muted-red-400 text-center"
    on:click={() => {
      fileInput.click();
    }}
  >
    {#if image}
      <img
        class="h-[200px] w-[200px] rounded-md object-cover"
        src={image}
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
    on:click={() => {
      fileInput.value = image = '';
    }}
  >
    Remover imagem
  </button>
</div>
