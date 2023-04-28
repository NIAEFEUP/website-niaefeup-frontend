<script lang="ts">
    import Icon from "$lib/component/Icon.svelte";
    import IconButton from "$lib/component/IconButton.svelte";
    import type { IconsType } from "../Icons";

    export let name: string;
    export let placeholder: string;
    export let value: string;
    export let beforeIcon: IconOptions | undefined = undefined
    export let afterIcon: IconOptions | undefined = undefined
</script>

<script lang="ts" context="module">
    export type IconOptions = {
        button: boolean
        type: "button" | "submit" | "reset"
        onClick?: Function
        icon: IconsType
    };
</script>

<div class="m-2 flex text-xl text-white focus-within:outline-none focus-within:ring focus-within:ring-tertiary px-2 rounded-lg bg-stone-400/25">
    {#if beforeIcon }
        <span class="p-1">
            {#if beforeIcon.button}
                <IconButton
                    src={beforeIcon.icon}
                    color="white"
                    size="24px"
                    onClick={beforeIcon.onClick}
                    type={beforeIcon.type}
                /> 
            {:else}
                <Icon
                    src={beforeIcon.icon}
                    color="white"
                    size="24px"
                />
            {/if}
        </span>
    {/if}
    <input
        class="appearance-none focus:outline-none bg-transparent"
        type="text"
        name={name}
        placeholder={placeholder}

        bind:value={value}
    />

    {#if afterIcon }
        <span class="p-1">
            {#if afterIcon.button}
                <IconButton
                    src={afterIcon.icon}
                    color="white"
                    size="24px"
                    onClick={afterIcon.onClick}
                    type={afterIcon.type}
                /> 
            {:else}
                <Icon
                    src={afterIcon.icon}
                    color="white"
                    size="24px"
                />
            {/if}
        </span>
    {/if}
</div>
