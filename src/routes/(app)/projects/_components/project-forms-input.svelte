<script lang="ts">
  import LabelInput from '@/lib/components/forms/label-input.svelte';

  interface Props {
    label: string;
    name: string;
    horizontal: boolean;
    isTextArea?: boolean;
    value?: string;
  }
  let {
    label = '',
    name = '',
    horizontal = false,
    isTextArea = false,
    value = $bindable('')
  }: Props = $props();
</script>

<LabelInput
  {label}
  {name}
  {horizontal}
  {isTextArea}
  placeholder="Insira o texto"
  className="flex-col md:flex-row"
  textGap="10"
  bind:value
/>
