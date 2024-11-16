<script>
	let files = null;
  
	$: () => {
	  if (files) {
		console.log(files);
		for (const file of files) {
		  console.log(`${file.name}: ${file.size} bytes`);
		}
	  }
	};
</script>
  
<div class="flex items-center space-x-4">
<label
	for="file-upload"
	class="muted-red text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-red-600">
	Selecionar ficheiro
</label>

<input
	id="file-upload"
	multiple
	type="file"
	bind:files
	class="hidden"
/>

{#if files}
	{#each Array.from(files) as file}
		<div class="bg-taupe-200 text-rose-950 py-2 px-4 rounded-lg">
			<p>{file.name}</p>
		</div>
	{/each}
{/if}
</div>
  