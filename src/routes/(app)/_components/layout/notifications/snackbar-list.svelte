<script lang="ts">
  import Snackbar from './snackbar.svelte';
  import { notifications } from './index';
</script>

<div class="fixed right-10 bottom-4 z-20">
  {#each $notifications as notification (notification.id)}
    <Snackbar {notification} />
  {/each}
</div>
