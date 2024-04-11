<script lang="ts">
  import { slide, fly } from 'svelte/transition';
  import type { Notification } from '.';
  import Icon from '$lib/component/Icon.svelte';
  import Icons from '$lib/component/Icons';

  export let notification: Notification;
</script>

<div
  out:slide|global
  in:fly|global={{ x: 100 }}
  class="mb-4 flex h-auto w-80 rounded-lg bg-muted-red-700 px-3 py-2"
  role="status"
>
  <div class="m-auto ml-3 font-medium text-white">
    {notification.message}
  </div>
  <div class="ml-1 flex flex-col">
    <button
      class="rounded-lg p-1.5 hover:bg-muted-red-500"
      on:click={() => notification.close()}
      aria-label="Close"
    >
      <Icon src={Icons.Close} color="white" size="18px" />
    </button>
  </div>
</div>
