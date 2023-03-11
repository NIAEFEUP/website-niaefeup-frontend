<script lang="ts">
    import { createNotification } from "$lib/notifications";
</script>

<div class="absolute top-1/2 left-1/2 text-white bg-primary rounded-lg py-2 px-3">
    <button on:click={() => createNotification("e que mano ta tudo??")}>Add notification</button>
</div>
