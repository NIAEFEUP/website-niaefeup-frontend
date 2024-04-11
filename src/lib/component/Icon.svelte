<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import type {IconType} from 'svelte-icons-pack';

  export let src: IconType;
  export let href: string | undefined = undefined;
  export let color: string | undefined;
  export let size: string | undefined;
  export let ariaLabel: string | undefined = undefined;
</script>

{#if href}
  <a {href} target="_blank" rel="noreferrer" class="w-min" aria-label={ariaLabel}>
    <Icon {src} {color} {size} />
  </a>
{:else}
  <Icon {src} {color} {size} />
{/if}
