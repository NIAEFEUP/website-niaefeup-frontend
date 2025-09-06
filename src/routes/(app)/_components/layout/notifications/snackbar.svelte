<script lang="ts">
  import { slide, fly } from 'svelte/transition';
  import type { Notification } from '.';
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';

  interface Props {
    notification: Notification;
  }

  let { notification }: Props = $props();
</script>

<div
  out:slide|global
  in:fly|global={{ x: 100 }}
  class="bg-muted-red-700 mb-4 flex h-auto w-80 rounded-lg px-3 py-2"
  role="status"
>
  <div class="m-auto ml-3 font-medium text-white">
    {notification.message}
  </div>
  <div class="ml-1 flex flex-col">
    <button
      class="hover:bg-muted-red-500 rounded-lg p-1.5"
      onclick={() => notification.close()}
      aria-label="Close"
    >
      <Icon src={Icons.Close} color="white" size="18px" />
    </button>
  </div>
</div>
