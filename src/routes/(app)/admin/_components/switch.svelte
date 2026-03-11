<script lang="ts">
  let {
    checked = $bindable(false),
    onchange
  }: {
    checked?: boolean;
    onchange?: (state: boolean) => void;
  } = $props();
</script>

<button
  aria-label="Toggle switch"
  type="button"
  role="switch"
  aria-checked={checked}
  onclick={(e) => {
    checked = !checked;
    e.currentTarget.blur();
    if (onchange) onchange(checked);
  }}
  class="relative h-6 w-8 cursor-pointer overflow-hidden rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
>
  <div
    class="absolute left-1 top-1 h-4 w-4 rounded-full shadow-[0_0_0_99px_white,inset_0_1.5px_3px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-in-out {checked
      ? 'translate-x-2'
      : 'translate-x-0'}"
  ></div>
</button>
