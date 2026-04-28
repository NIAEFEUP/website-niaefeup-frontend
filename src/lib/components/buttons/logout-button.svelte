<script lang="ts">
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';

  interface Props {
    ariaLabel?: string;
    type?: 'button' | 'submit' | 'reset';
  }

  let { ariaLabel = 'Logout', type = 'button' }: Props = $props();
</script>

<button
  {type}
  aria-label={ariaLabel}
  class="w-10 rounded-md bg-muted-red-500 p-2.5 lg:w-10 xl:w-9"
>
  <Icon src={Icons.Logout} color="white" size="18px" />
</button>