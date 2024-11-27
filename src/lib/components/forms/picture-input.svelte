<script lang='ts'>
    import Icon from '$lib/components/icons/icon.svelte';
    import Icons from '$lib/components/icons/icons';

    export let text: string;
	let avatar, fileinput;
	
	const onFileSelected =(e)=>{
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
            avatar = e.target.result;    
        };
    }
</script>

<div id="app" class="flex items-center justify-center flex-col">
  
        {#if avatar}
        <div class="flex h-[200px] w-[200px] rounded-md overflow-hidden relative">
            <img class="h-[200px] w-[200px] object-cover" src="{avatar}" alt="Avatar" />
            <button type="button" aria-label="Change Avatar" class="bg-rose-950 rounded-md h-[15%] w-[15%] flex items-center justify-center cursor-pointer absolute bottom-0 right-0 m-2" on:click={() => { fileinput.click(); }} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { fileinput.click(); } }}>
                <Icon src={Icons.Edit} color="white" size="70%" />
            </button>
            <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e) => onFileSelected(e)} bind:this={fileinput}>
        </div>
        {:else}
        <div class="bg-muted-red-400 flex items-center justify-center rounded-md h-[200px] w-[200px] text-center relative">
            <p class="text-white font-medium">{text}<span class="text-4xl">*</span></p>
            <button type="button" aria-label="Change Avatar" class="bg-rose-950 rounded-md h-[15%] w-[15%] flex items-center justify-center cursor-pointer absolute bottom-0 right-0 m-2" on:click={() => { fileinput.click(); }} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { fileinput.click(); } }}>
                <Icon src={Icons.Edit} color="white" size="60%" />
            </button>
            <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e) => onFileSelected(e)} bind:this={fileinput}>
        </div>
        {/if}

</div>
