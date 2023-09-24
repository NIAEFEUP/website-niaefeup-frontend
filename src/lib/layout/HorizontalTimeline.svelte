<script lang="ts">
    import type {Generation} from "@/model/Generation";
    import Icon from "../component/Icon.svelte";
    import Icons from "../component/Icons";

    export let generations : Generation[];
    //TODO (luisd): make this size reactive?
    const displayedSize = 3;
    let offset = generations.length < displayedSize ? 0 : generations.length - displayedSize;

    $: displayedGenerations = generations.slice(offset, offset + displayedSize);

    const changeDisplayedGenerations = (i:number) => {
        if(generations.length < displayedSize) return;
        if(generations.length - (offset + i) < displayedSize) return;
        if(offset + i < 0){
            offset = 0; 
            return;
        }
        offset += i;
    };

    // by default we select the last generation but we can change it to any generation
    // that is on the list
    export let selectedGeneration : Generation | undefined = generations.at(-1);


</script>

<div class="w-full flex flex-row justify-center items-center gap-1">
    <button class="[&>svg]:text-taupe-300" on:click={() => changeDisplayedGenerations(-1)}>
        <Icon src={Icons.AngleLeft} size="3em" color="white"/>
    </button>
    <div class="w-9/12 grid grid-cols-1 grid-rows-1">
        <!-- Bar -->
        <div class="w-full h-1.5 bg-taupe-300 rounded-lg m-auto z-1 row-span-full col-span-full"></div>
        <!-- Points -->
        <div class="w-full flex flex-row m-auto z-2 row-span-full col-span-full overflow-hidden justify-around ">
            {#each displayedGenerations as generation}
                {#if generation == selectedGeneration}
                <button class="flex flex-col justify-start items-center mb-6" on:click={() => selectedGeneration = generation} data-active>
                    <p class="text-taupe-100">{generation.schoolYear}</p>
                    <div class="w-4 h-4 rounded-full bg-taupe-100">
                    </div>
                </button>
                {:else}
                <button class="flex flex-col justify-start items-center mb-6" on:click={() => selectedGeneration = generation}>
                    <p class="text-taupe-300">{generation.schoolYear}</p>
                    <div class="w-4 h-4 rounded-full bg-taupe-300">
                    </div>
                </button>  
                {/if}
            {/each}
        </div>
    </div>
    <button class="[&>svg]:text-taupe-300" on:click={() => changeDisplayedGenerations(1)}>
        <Icon src={Icons.AngleRight} size="3em" color="white"/>
    </button>
</div>