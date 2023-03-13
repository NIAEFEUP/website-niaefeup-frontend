<script lang="ts">
  import Icon from '$lib/component/Icon.svelte';
  import Icons from '$lib/component/Icons';
  import { slide, fly } from 'svelte/transition';
  import type { Notification } from '.';

  export let notification: Notification;
</script>

<div
  out:slide
  in:fly={{ x: 100 }}
  class="mb-4 flex h-auto w-80 rounded-lg bg-primary px-4 py-2"
  role="status"
>
  <div class="m-auto ml-3 font-medium text-white">
    {notification.message}
  </div>
  <div class="flex flex-col justify-center">
    <button
      class="ml-auto rounded-lg p-1.5 hover:bg-secondary"
      on:click={() => notification.close()}
      aria-label="Close"
    >
      <Icon src={Icons.Times} color="white" size="18px" />
    </button>
  </div>
</div>
