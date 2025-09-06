<script lang="ts">
  import Icon from '@/lib/components/icons/icon.svelte';
  import type { IconType } from '@/lib/components/icons/icon';
  import { resolve } from '$app/paths';

  interface Props {
    url: string;
    social: string;
    icon: IconType;
    user: string;
    iconPath?: string | null;
  }

  let { url, social, icon, user, iconPath = null }: Props = $props();

  const resolvedUrl = resolve(url);
</script>

<div class="h-12 w-12 rounded-md bg-white/20 p-3 sm:h-14 sm:w-14 sm:p-4">
  <a href={resolvedUrl} target="_blank" rel="noopener noreferrer" aria-label="{user}'s {social}">
    {#if iconPath}
      <img src={iconPath} alt="Icon of {user}'s {social}" class="icon h-full w-full object-cover" />
    {:else}
      <Icon src={icon} color="white" size="100%" />
    {/if}
  </a>
</div>
