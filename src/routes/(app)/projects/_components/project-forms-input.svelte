<script lang="ts">
  import LabelInput from '@/lib/components/forms/label-input.svelte';

  interface Props {
    label: string;
    name: string;
    horizontal: boolean;
    isTextArea?: boolean;
    value?: string;
    type?: string;
    required?: boolean;
    minlength?: number;
    maxlength?: number;
  }
  let {
    label = '',
    name = '',
    horizontal = false,
    isTextArea = false,
    value = $bindable(''),
    type = 'text',
    required = false,
    minlength = undefined,
    maxlength = undefined
  }: Props = $props();
</script>

<LabelInput
  {label}
  {name}
  {type}
  {horizontal}
  {isTextArea}
  placeholder="Insira o texto"
  className="flex-col md:flex-row"
  textGap="10"
  {required}
  {minlength}
  {maxlength}
  bind:value
/>
