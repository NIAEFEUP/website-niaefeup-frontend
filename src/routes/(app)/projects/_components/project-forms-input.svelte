<script lang="ts">
  import LabelInput from '@/lib/components/forms/label-input.svelte';

  interface Props {
    label: string;
    name: string;
    isTextArea?: boolean;
    value?:string;
  }
  let { label = '', name = '', isTextArea = false, value = '' }: Props = $props();
</script>

<LabelInput
  {label}
  {name}
  horizontal
  {isTextArea}
  placeholder="Insira o texto"
  className="flex-col md:flex-row"
  textGap="10"
  bind:value={value}
/>
