<script lang="ts">
  import Icon from './Icon.svelte';
  import Icons from './Icons';

  let visible = false;
  $: type = visible ? 'text' : 'password';
  $: icon = visible ? Icons.Hidden : Icons.Visible;
</script>

<div class="grid">
  <input {type} {...$$restProps} class="col-start-1 col-end-3 row-start-1 {$$props.class}" />
  <button
    type="button"
    class="z-40 col-start-2 col-end-3 row-start-1 mr-4"
    on:click={() => (visible = !visible)}
  >
    <Icon src={icon} size="1.5em" color="fill-quaternary54" />
  </button>
</div>
