<script lang="ts">
    import Hexagon from "./Hexagon.svelte";

    type T = $$Generic;

    export let orientation: 'horizontal' | 'vertical';
    export let data: T
</script>

<div>
    <div class="text-blue">
        Blue
    </div>
</div>
<Hexagon orientation={orientation}>

</Hexagon>
