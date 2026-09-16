<script lang="ts">
  import { Dialog as DialogPrimitive } from 'bits-ui';
  import { fade } from 'svelte/transition';
  import { cn } from '$lib/utils.js';

  type $$Props = DialogPrimitive.OverlayProps;

  interface Props {
    class?: $$Props['class'];
    [key: string]: any;
  }

  let { class: className = undefined, ...rest }: Props = $props();
</script>

<DialogPrimitive.Overlay {...rest}>
  {#snippet child({ props })}
    <div
      {...props}
      transition:fade={{ duration: 150 }}
      class={cn('fixed inset-0 z-50 bg-background/80 backdrop-blur-xs', className)}
    ></div>
  {/snippet}
</DialogPrimitive.Overlay>
