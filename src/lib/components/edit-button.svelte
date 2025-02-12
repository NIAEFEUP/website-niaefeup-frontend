<script lang="ts">
  import Icon from '@/lib/components/icons/icon.svelte';
  import Icons from '@/lib/components/icons/icons';

  export let type: 'button' | 'submit' | 'reset' = 'button',
    size: keyof typeof sizeList,
    link: string;
  const sizeList = {
    small: 'w-12 h-12',
    medium: 'w-20 w-20',
    large: 'w-32 w-32'
  };
</script>

<a href={link}>
  <button
    {type}
    class="flex justify-center bg-muted-red-500 hover:bg-muted-red-300 {sizeList[
      size
    ]} min-w-0 rounded px-2 py-2"
  >
    <div class="flex h-full w-full items-center justify-center">
      <Icon src={Icons.Edit} size={size == 'small' ? 25 : size == 'medium' ? 35 : 45} />
    </div>
  </button>
</a>
