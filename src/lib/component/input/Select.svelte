<script lang="ts">
    import Select2 from 'svelte-select/no-styles/Select.svelte';

    const items = [
        {value: 1, label: "Ola"},
        {value: 2, label: "Deus"},
        {value: 3, label: "Siuuuyuuuuu"},
    ]
</script>


<Select2 placeholder="Filtros" items={items} searchable={false} />
