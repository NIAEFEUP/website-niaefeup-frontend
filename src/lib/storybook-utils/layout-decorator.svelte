<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div>
  {@render children?.()}
</div>

<style>
  div {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
