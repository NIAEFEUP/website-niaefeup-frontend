<script lang="ts">
  import Icon from 'svelte-icons-pack/Icon.svelte';

  export let src: string | { a: { viewBox: string }; c: string } | undefined;
  export let color: string | undefined;
  export let size: string | undefined;
  export let onClick: Function | undefined = undefined;
  export let type: "button" | "submit" | "reset" | null | undefined = "button"

</script>

<button class="flex" on:click={() => onClick && onClick()} type={type}>
    <Icon {src} {color} {size} />
</button>
