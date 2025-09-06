<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import type { IconType } from 'svelte-icons-pack';

  interface Props {
    src: IconType;
    href?: string | undefined;
    color?: string | undefined;
    size: string | undefined;
    ariaLabel?: string | undefined;
    className?: string | undefined;
  }

  let {
    src,
    href = undefined,
    color = undefined,
    size,
    ariaLabel = undefined,
    className = undefined
  }: Props = $props();
</script>

{#if href}
  <a {href} target="_blank" rel="noreferrer noopener" class="w-min" aria-label={ariaLabel}>
    <Icon {src} {color} {size} {className} />
  </a>
{:else}
  <Icon {src} {color} {size} {className} />
{/if}
