<script lang="ts">
  import { cn } from '$lib/utils';

  interface Props {
    value?: string;
    label?: string;
    id?: string;
    name?: string;
    type?: string;
    placeholder?: string;
    isTextArea?: boolean;
    horizontal?: boolean;
    required?: boolean;
    minlength?: number | undefined;
    maxlength?: number | undefined;
    rows?: number;
    class?: string;
    containerClass?: string;
    [key: string]: unknown;
  }

  let {
    value = $bindable(),
    label = '',
    id = '',
    name = '',
    type = 'text',
    placeholder = '',
    isTextArea = false,
    horizontal = false,
    required = false,
    minlength = undefined,
    maxlength = undefined,
    rows = 4,
    class: className = '',
    containerClass = '',
    ...rest
  }: Props = $props();

  const baseInputClasses =
    'w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 font-source-code text-sm text-white placeholder:text-white/40 backdrop-blur-xs transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.12] focus:border-vivid-red-400 focus:bg-white/15 focus:outline-hidden focus:ring-2 focus:ring-vivid-red-400/30 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base';

  let inputClasses = $derived(cn(baseInputClasses, className));
  let textareaClasses = $derived(cn(baseInputClasses, 'min-h-[120px] resize-y py-3', className));
</script>

<div
  class={cn(
    horizontal ? 'flex flex-row items-center gap-3' : 'flex flex-col gap-1.5',
    'mb-4',
    containerClass
  )}
>
  {#if label}
    <label class="font-source-code text-sm font-semibold text-white/90" for={id}>
      {label}
    </label>
  {/if}
  {#if isTextArea}
    <textarea
      aria-label="textarea-input"
      class={textareaClasses}
      {rows}
      {id}
      {placeholder}
      {name}
      {required}
      {minlength}
      {maxlength}
      {...rest}
      bind:value></textarea>
  {:else}
    <input
      aria-label="text-input"
      class={inputClasses}
      {type}
      {id}
      {placeholder}
      {name}
      {required}
      {minlength}
      {maxlength}
      {...rest}
      bind:value
    />
  {/if}
</div>

<style>
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 1000px #2f1313 inset;
    -webkit-text-fill-color: #ffffff;
    caret-color: #ffffff;
  }
</style>
