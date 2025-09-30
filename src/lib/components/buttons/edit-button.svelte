<script lang="ts">
  import Icon from '@/lib/components/icons/icon.svelte';
  import Icons from '@/lib/components/icons/icons';

  interface Props {
    type?: 'button' | 'submit' | 'reset';
    size: keyof typeof sizeList;
    link: string;
  }

  let { type = 'button', size, link }: Props = $props();
  const sizeList = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-32 h-32'
  };
</script>

<a href={link}>
  <button
    aria-label="Edit"
    {type}
    class="flex justify-center bg-muted-red-500 hover:bg-muted-red-300 {sizeList[
      size
    ]} min-w-0 rounded px-2 py-2"
  >
    <div class="flex h-full w-full items-center justify-center">
      <Icon
        src={Icons.Edit}
        size={size == 'small' ? '24px' : size == 'medium' ? '42px' : '62px'}
        color="white"
      />
    </div>
  </button>
</a>
