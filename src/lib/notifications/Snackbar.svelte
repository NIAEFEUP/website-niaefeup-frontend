<script lang="ts">
    import Icon from "$lib/component/Icon.svelte";
    import Icons from "$lib/component/Icons";
    import { slide, fly } from "svelte/transition";
    import type { Notification } from ".";

    export let notification: Notification;
</script>

<div out:slide in:fly={{x: 100}} class="flex px-4 py-2 mb-4 bg-primary rounded-lg w-80 h-auto" role="alert">
    <div class="ml-3 font-medium text-white m-auto">
        {notification.message}
    </div>
    <button class="ml-auto rounded-lg p-1.5 hover:bg-secondary" on:click={() => notification.close()} aria-label="Close">
        <Icon src={Icons.Times} color="white" size="18px" />
    </button>
</div>
