<script lang="ts">
  import Icon from '@/lib/components/icons/icon.svelte';
  import type { IconType } from '@/lib/components/icons/icon';

  export let url: string;
  export let social: string;
  export let icon: IconType;
  export let user: string;
  export let iconPath: string | null = null;
</script>

<div class="h-12 w-12 rounded-md bg-white/20 p-3 sm:h-14 sm:w-14 sm:p-4">
  <a href={url} aria-label="{user}'s {social}">
    {#if iconPath}
      <img src={iconPath} alt="Icon of {user}'s {social}" class="icon h-full w-full object-cover" />
    {:else}
      <Icon src={icon} color="white" size="100%" />
    {/if}
  </a>
</div>
