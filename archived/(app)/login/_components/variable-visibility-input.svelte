<script lang="ts">
  import Icon from '@/lib/components/icons/icon.svelte';
  import Icons from '@/lib/components/icons/icons';

  interface Props {
    value: string;
    className?: string;
    [key: string]: unknown;
  }

  let { value = $bindable(), class: className = '', ...rest }: Props = $props();
  let visible = $state(false);
  let type = $derived(visible ? 'text' : 'password');
  let icon = $derived(visible ? Icons.Hidden : Icons.Visible);
</script>

<div class="relative">
  <input
    {...{ type }}
    {...rest}
    class="col-start-1 col-end-3 row-start-1 {className}"
    data-testid="password-input"
    aria-label="Password input"
    bind:value
  />
  <button
    type="button"
    class="absolute inset-y-0 right-0 mr-4"
    onclick={() => (visible = !visible)}
    aria-label={visible ? 'Hide password' : 'Show password'}
    title={visible ? 'Hide password' : 'Show password'}
  >
    <Icon src={icon} size="1.5em" className="fill-rose-950/54" />
  </button>
</div>
