<script lang="ts">
  export let selected: boolean;
</script>

<li class="grid cursor-pointer grid-cols-[2ch_1fr_3ch] pl-4">
  {#if selected}
    <div class="contents font-semibold">
      <span class="justify-self-center">&lt;</span>
      <div class="col-start-2">
        <slot />
      </div>
      <span class="justify-self-center">/&gt;</span>
    </div>
  {:else}
    <div class="col-start-2">
      <slot />
    </div>
  {/if}
</li>
