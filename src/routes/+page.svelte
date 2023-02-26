<script>
    import Hexagon from '@/components/Hexagons/Hexagon.svelte';
    import HexagonGrid from '@/components/Hexagons/HexagonGrid.svelte';
</script>

<div class="min-h-screen px-20 py-10 bg-gray-800">
    <HexagonGrid cols={5} items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} let:item let:col let:row>
        <Hexagon>{item} - {col}, {row}</Hexagon>
    </HexagonGrid>
</div>
