<script lang="ts">
  import Icon from './Icon.svelte';
  import Icons from './Icons';

  export let iconColor: string | undefined = 'quaternary54';

  let visible = false;
  $: type = visible ? 'text' : 'password';
  $: icon = visible ? Icons.Hidden : Icons.Visible;
</script>

<div class="relative flex flex-row items-stretch">
  <input {type} {...$$restProps} />
  <button
    type="button"
    class=" {'fill-' + iconColor} absolute right-[10%] top-[40%] z-40"
    on:click="{() => (visible = !visible)}"
  >
    <Icon src={icon} size="1.5em" />
  </button>
</div>
