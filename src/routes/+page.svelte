<script lang="ts">
    import { createNotification } from "$lib/notifications";

    const mockNotifications = [
        "e que mano ta tudo??",
        "esta noticação é tao grande meu deus do ceu ela nao vai acabar... Olha para ela, ainda está a ir. Ninguém a para meu filho, ninguém a para.",
        "boas"
    ];
</script>

<div class="absolute top-1/2 left-1/2 text-white bg-primary rounded-lg py-2 px-3">
    <button on:click={() => createNotification(mockNotifications[Math.floor(Math.random() * mockNotifications.length)])}>Add notification</button>
</div>
