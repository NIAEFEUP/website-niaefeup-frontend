<script lang="ts">
  interface Props {
    position?: string | null;
  }

  let { position = null }: Props = $props();
</script>

{#if position === 'right'}
  <img
    alt="NIAEFEUP hexagon logo"
    class="fixed -right-24 -z-10 h-full overflow-hidden pb-40 pt-20 sm:right-0 sm:pb-32"
    src="/images/outline_white.png"
  />
{:else}
  <img
    alt="NIAEFEUP hexagon logo"
    class="pointer-events-none fixed -left-24 -z-10 h-full overflow-hidden pb-40 pt-20"
    src="/images/outline_white_180.png"
  />
{/if}
