<script lang="ts">
  import Icon from 'svelte-icons-pack/Icon.svelte';

  export let src: string | { a: { viewBox: string }; c: string } | undefined;
  export let href: string | undefined;
  export let color: string | undefined;
  export let size: string | undefined;

  let link: boolean = false;
  if (href) link = true;
</script>

{#if link}
  <a {href} target="_blank" rel="noreferrer" class="w-min">
    <Icon {src} {color} {size} />
  </a>
{:else}
  <Icon {src} {color} {size} />
{/if}
