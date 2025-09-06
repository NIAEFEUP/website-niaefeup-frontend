<script>
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';
  import { resolve } from '$app/paths';

  const loginUrl = resolve('/login');
</script>

<a
  href={loginUrl}
  class="bg-muted-red-400/60 grid grid-cols-[1fr_fit-content(100%)] items-center gap-3 rounded-md"
>
  <p class="font-source_code w-full pl-2 text-sm whitespace-nowrap text-white">Área Membro</p>
  <div class="bg-muted-red-400 rounded-md px-1 pt-1">
    <Icon src={Icons.User} color="#411315" size="32px" />
  </div>
</a>
