<script>
  import Icon from '$lib/component/Icon.svelte';
  import Icons from '$lib/component/Icons';
</script>

<a
  href="/#"
  class="grid grid-cols-[1fr_fit-content(100%)] items-center gap-3 rounded-md bg-muted-red-400/60"
>
  <p class="w-full whitespace-nowrap pl-2 font-source_code text-sm text-white">Área Membro</p>
  <div class="rounded-md bg-muted-red-400 px-1 pt-1">
    <Icon src={Icons.User} color="#411315" size="32px" />
  </div>
</a>
