<script lang="ts">
  interface Props {
    registerUrl?: string;
    label?: string;
    disabled?: boolean;
    onClick?: () => void;
  }

  let {
    registerUrl = '',
    label = 'Inscrever',
    disabled = false,
    onClick = undefined
  }: Props = $props();

  const shapePath =
    'M12 2H196.035C196.426 7.53476 200.034 12.1813 205 14.0807V51.9193C199.737 53.9321 196 59.0296 196 65H10C10 59.4152 6.72989 54.5942 2 52.3473V15.4202C7.78298 13.6991 12 8.34204 12 2Z';

  let isDisabled = $derived(disabled || !registerUrl);
</script>

<button
  class="group relative flex w-full items-center justify-center px-6 py-4 transition-all disabled:cursor-not-allowed disabled:opacity-50"
  disabled={isDisabled}
  onclick={onClick}
  aria-label={label}
>
  <svg
    class="absolute inset-0 -z-10 h-full w-full text-muted-red-500/60 transition-colors {isDisabled
      ? ''
      : 'group-hover:text-muted-red-500/70'}"
    viewBox="0 0 207 67"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d={shapePath}
      fill="currentColor"
      stroke="white"
      stroke-width="2"
      vector-effect="non-scaling-stroke"
    />
  </svg>

  <span class="text-lg font-semibold uppercase tracking-wider text-white">
    {label}
  </span>
</button>
