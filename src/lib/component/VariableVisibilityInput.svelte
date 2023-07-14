<script lang="ts">
  import Icon from './Icon.svelte';
  import Icons from './Icons';

  export let iconColor: string | undefined = 'quaternary54';

  let visible = false;
  $: type = visible ? 'text' : 'password';
  $: icon = visible ? Icons.Hidden : Icons.Visible;
</script>

<div class="grid">
  <input {type} {...$$restProps} class="col-start-1 col-end-3 row-start-1 {$$props.class}" />
  <button
    type="button"
    class="{'fill-' + iconColor} z-40 col-start-2 col-end-3 row-start-1 m-4"
    on:click={() => (visible = !visible)}
  >
    <Icon src={icon} size="1.5em"/>
  </button>
</div>
