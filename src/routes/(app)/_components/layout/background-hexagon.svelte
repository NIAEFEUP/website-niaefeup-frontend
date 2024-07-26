<script lang="ts">
  export let position: string | null = null;
</script>

{#if position === 'right'}
  <img
    alt="NIAEFEUP hexagon logo"
    class="fixed -right-24 -z-10 h-full overflow-hidden pt-20 pb-40 sm:right-0 sm:pb-32"
    src="/images/outline_white.png"
  />
{:else}
  <img
    alt="NIAEFEUP hexagon logo"
    class="pointer-events-none fixed -left-24 -z-10 h-full overflow-hidden pt-20 pb-40"
    src="/images/outline_white_180.png"
  />
{/if}
