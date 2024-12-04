<script lang="ts">
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';

  export let text: string;
  let avatar: string;
  let fileinput: HTMLInputElement;

  const onFileSelected = (e) => {
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      if (e.target?.result) {
        avatar = e.target.result.toString();
      }
    };
  };
</script>

<div id="app" class="flex flex-col items-center justify-center">
  <div class="relative flex h-[200px] w-[200px] items-center justify-center rounded-md bg-muted-red-400 text-center">
    {#if avatar}
      <img class="h-[200px] w-[200px] object-cover" src={avatar} alt="Avatar" />
    {:else}
      <p class="font-medium text-white">{text}<span class="text-4xl">*</span></p>
    {/if}
    <button
      type="button"
      aria-label="Change Avatar"
      class="absolute bottom-0 right-0 m-2 flex h-[15%] w-[15%] cursor-pointer items-center justify-center rounded-md bg-rose-950"
      on:click={() => {
        fileinput.click();
      }}
      on:keydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          fileinput.click();
        }
      }}
    >
      <Icon src={Icons.Edit} color="white" size="60%" />
    </button>
    <input
      style="display:none"
      type="file"
      accept=".jpg, .jpeg, .png"
      on:change={(e) => onFileSelected(e)}
      bind:this={fileinput}
    />
  </div>
</div>
