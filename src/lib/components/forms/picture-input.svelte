<script lang="ts">
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';

  export let text: string;
  let image: string;
  let fileInput: HTMLInputElement;

  const onFileSelected = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      image = e.target?.result?.toString() ?? image;
    };
  };
</script>

<div class="flex flex-col items-center justify-center">
  <div
    class="relative flex h-[200px] w-[200px] items-center justify-center rounded-md bg-muted-red-400 text-center"
  >
    {#if image}
      <img class="h-[200px] w-[200px] object-cover" src={image} alt="Avatar" />
    {:else}
      <p class="font-medium text-white">{text}<span class="text-4xl">*</span></p>
    {/if}
    <button
      type="button"
      aria-label="Upload image"
      class="absolute bottom-0 right-0 m-2 flex h-[15%] w-[15%] cursor-pointer items-center justify-center rounded-md bg-rose-950"
      on:click={() => {
        fileInput.click();
      }}
    >
      <Icon src={Icons.Edit} color="white" size="60%" />
    </button>
    <input
      style="display:none"
      type="file"
      accept=".jpg, .jpeg, .png"
      on:change={(e) => onFileSelected(e)}
      bind:this={fileInput}
    />
  </div>
</div>
