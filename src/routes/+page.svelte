<script>
    import Hexagon from '@/components/Hexagons/Hexagon.svelte';
    import HexagonGrid from '@/components/Hexagons/HexagonGrid.svelte';
</script>

<div class="min-h-screen px-20 py-10 bg-gray-800">
    <HexagonGrid className="gap-x-6 gap-y-4" cols={5} items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} let:item let:col let:row>
            <Hexagon let:isHexagonBeingHovered>
            {@const overlayClasses = isHexagonBeingHovered ? "opacity-30" : "opacity-0"}
            {@const textClasses = isHexagonBeingHovered ? "bottom-20" : "bottom-10"}
            <div class="relative w-full h-full flex items-center justify-center">
                <p class="transition-all absolute {textClasses} mx-auto text-gray-100 font-bold text-center text-lg w-1/2 leading-tight">Bruno Rosendo</p>
                <div class="absolute inset-0 transition-opacity duration-500 text-lg bg-black {overlayClasses}" />
                <img src="/members/bruno-rosendo.png" class="w-full h-full object-cover" />
            </div>
        </Hexagon>

    <!-- <div class="path opacity-50 bg-red-500 flex items-center justify-center col-start-1 col-end-2 row-start-1 row-end-2">
        <p>oi</p>
    </div> -->
    </HexagonGrid>
</div>

<style>
    .path {
        aspect-ratio: 316 / 270; /* from Figma */
        
    }
</style>