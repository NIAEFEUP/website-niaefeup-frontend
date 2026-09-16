<script lang="ts">
  import Snackbar from './snackbar.svelte';
  import { notifications } from './index';
</script>

<div class="fixed bottom-4 right-10 z-20">
  {#each $notifications as notification (notification.id)}
    <Snackbar {notification} />
  {/each}
</div>
