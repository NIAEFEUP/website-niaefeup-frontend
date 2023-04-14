<script>
    import BlueExampleHexagon from "@/lib/layout/hexagons/BlueExampleHexagon.svelte";
    import HexagonGrid from "@/lib/layout/hexagons/HexagonGrid.svelte";
    import RedExampleHexagon from "@/lib/layout/hexagons/RedExampleHexagon.svelte";

</script>
<div class="p-20">
    <HexagonGrid 
        orientation="vertical" 
        gap="big" 
        items={[1,2,3,4,5,6,7,8,9]}
        cols={5}
        component={RedExampleHexagon} 
    >
    </HexagonGrid>
    <HexagonGrid 
    orientation="vertical" 
    gap="big" 
    items={[1,2,3,4,5,6,7,8,9]}
    cols={5}
    component={BlueExampleHexagon} 
>
</HexagonGrid>
</div>
