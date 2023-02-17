<script lang="ts">
  export let position: string | null = null;
</script>

{#if position === 'right'}
  <img
    alt="NIAEFEUP hexagon logo"
    class="fixed h-full sm:pb-32 overflow-hidden -right-24 sm:right-0 pt-20 pb-40"
    src="/images/outline_white.png"
  />
{:else}
  <img
    alt="NIAEFEUP hexagon logo"
    class="fixed h-full overflow-hidden -left-24 pt-20 pb-40 pointer-events-none"
    src="/images/outline_white_180.png"
  />
{/if}
