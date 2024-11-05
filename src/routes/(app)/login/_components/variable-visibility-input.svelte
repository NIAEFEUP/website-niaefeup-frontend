<script lang="ts">
  import Icon from '@/lib/components/icons/icon.svelte';
  import Icons from '@/lib/components/icons/icons';

  let visible = false;
  $: type = visible ? 'text' : 'password';
  $: icon = visible ? Icons.Hidden : Icons.Visible;
</script>

<div class="relative">
  <input
    {type}
    {...$$restProps}
    class="col-start-1 col-end-3 row-start-1 {$$props.class}"
    data-testid="password-input"
    aria-label="Password input"
  />
  <button
    type="button"
    class="absolute inset-y-0 right-0 mr-4"
    on:click={() => (visible = !visible)}
    aria-label={visible ? 'Hide password' : 'Show password'}
    title={visible ? 'Hide password' : 'Show password'}
  >
    <Icon src={icon} size="1.5em" className="fill-rose-950/[.54]" />
  </button>
</div>
