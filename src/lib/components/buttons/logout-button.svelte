<script lang="ts">
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';
  import { goto, invalidateAll } from '$app/navigation';

  interface Props {
    ariaLabel?: string;
    type?: 'button' | 'submit' | 'reset';
  }

  let { ariaLabel = 'Logout', type = 'button' }: Props = $props();

  async function logout() {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      await invalidateAll();
      goto('/');
    }
  }
</script>

<button
  {type}
  aria-label={ariaLabel}
  class="w-10 rounded-md bg-muted-red-500 p-2.5 lg:w-10 xl:w-9"
  onclick={logout}
>
  <Icon src={Icons.Logout} color="white" size="18px" />
</button>
