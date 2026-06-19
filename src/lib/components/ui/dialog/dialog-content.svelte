<script lang="ts">
  import { Dialog as DialogPrimitive } from 'bits-ui';
  import X from 'lucide-svelte/icons/x';
  import * as Dialog from './index.js';
  import { cn, flyAndScale } from '$lib/utils.js';

  type $$Props = DialogPrimitive.ContentProps;

  interface Props {
    class?: $$Props['class'];
    children?: import('svelte').Snippet;
    [key: string]: any;
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<Dialog.Portal>
  <Dialog.Overlay />
  <DialogPrimitive.Content {...rest}>
    {#snippet child({ props })}
      <div
        {...props}
        transition:flyAndScale={{ duration: 200 }}
        class={cn(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full',
          className
        )}
      >
        {@render children?.()}
        <DialogPrimitive.Close
          class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X class="h-4 w-4" />
          <span class="sr-only">Close</span>
        </DialogPrimitive.Close>
      </div>
    {/snippet}
  </DialogPrimitive.Content>
</Dialog.Portal>
