<script lang="ts">
    import Icon from "$lib/component/Icon.svelte";
    import Icons from "$lib/component/Icons";

    export let message: string;
</script>

<div class="flex px-4 py-2 mb-4 bg-primary rounded-lg w-80 fixed bottom-4 right-10 z-20" role="alert">
    <div class="ml-3 font-medium text-white m-auto">
        {message}
    </div>
    <button class="ml-auto rounded-lg p-1.5 hover:bg-secondary" aria-label="Close">
        <Icon src={Icons.Times} color="white" size="18px" />
    </button>
</div>
