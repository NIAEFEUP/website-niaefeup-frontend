<script lang="ts">
    import { notifications } from "./index";
    import Snackbar from "$lib/notifications/Snackbar.svelte";
</script>

<div class="fixed bottom-4 right-10 z-20">
    {#each $notifications as notification (notification.id)}
        <Snackbar {notification} />
    {/each}
</div>
