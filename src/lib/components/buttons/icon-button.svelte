<script lang="ts">
  import type { IconType } from 'svelte-icons-pack';
  import Icon from '@/lib/components/icons/icon.svelte';

  interface Props {
    type?: 'button' | 'submit' | 'reset';
    size?: 'small' | 'medium' | 'large' | 'responsive';
    link: string | undefined;
    icon: IconType;
    iconSize: string | undefined;
    ariaLabel?: string;
    color?: string;
    onClick: (() => void) | undefined;
    children?: import('svelte').Snippet;
  }

  let {
    type = 'button',
    size = 'small',
    link,
    icon,
    iconSize,
    ariaLabel = '',
    color = 'white',
    onClick,
    children
  }: Props = $props();

  const sizeList = {
    small: 'w-10 h-10 px-1 py-1 sm:w-12 sm:h-12 sm:px-2 sm:py-2',
    medium: 'w-16 h-16 px-2 py-2 sm:w-20 sm:h-20 sm:px-4 sm:py-4',
    large: 'w-24 h-24 px-4 py-4 sm:w-32 sm:h-32 sm:px-6 sm:py-6',
    responsive:
      'w-8 h-8 px-0.5 py-0.5 sm:w-10 sm:h-10 sm:px-1 sm:py-1 md:w-12 md:h-12 md:px-2 md:py-2'
  };

  const defaultIconSizes = {
    small: '20px',
    medium: '32px',
    large: '48px',
    responsive: '16px'
  };

  const computedIconSize = iconSize ?? defaultIconSizes[size] ?? '20px';
</script>

<svelte:element
  this={link ? 'a' : 'button'}
  href={link}
  type={!link ? type : undefined}
  aria-label={ariaLabel}
  role={link && onClick ? 'button' : undefined}
  class="flex min-w-0 items-center justify-center rounded bg-muted-red-500 hover:bg-muted-red-300 {sizeList[
    size
  ]}"
  onclick={onClick ? onClick : undefined}
>
  <Icon src={icon} size={computedIconSize} {color} />
  {@render children?.()}
</svelte:element>
