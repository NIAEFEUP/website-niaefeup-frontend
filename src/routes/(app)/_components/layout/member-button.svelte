<script lang="ts">
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';

  interface Props {
    userId?: string | number | null;
  }

  let { userId = null }: Props = $props();
</script>

<a
  href={userId ? `/user/${userId}` : '/login'}
  class="grid grid-cols-[1fr_fit-content(100%)] items-center gap-3 rounded-md bg-muted-red-400/60"
>
  <p class="w-full whitespace-nowrap pl-2 font-source_code text-sm text-white">Área Membro</p>
  <div class="rounded-md bg-muted-red-400 px-1 pt-1">
    <Icon src={Icons.User} color="#411315" size="32px" />
  </div>
</a>
