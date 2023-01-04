<script lang="ts">
  import { fetchWithAuth } from '$lib/network';
  import { onMount } from 'svelte';

  let info = 'Loading...';

  onMount(async () => {
    const response = await fetchWithAuth('/auth');
    const json = await response.json();
    info = JSON.stringify(json);
  });
</script>

<div>
  <h1>Profile</h1>
  <p>{info}</p>
</div>
