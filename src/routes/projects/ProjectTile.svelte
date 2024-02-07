<script lang="ts">
    let windowWidth: number;

    export let
        name: string;
    const colorList = {
        nijobs: 'bg-[#DC4F47]',
        uni: 'bg-[#75171E]',
        tts: 'bg-[#E7E7E7]'
    };
</script>

<svelte:window bind:innerWidth={windowWidth}></svelte:window>

<div class='bg-muted-red-500 h-40 rounded-xl flex flex-col justify-end w-4/5 py-3 odd:self-start even:self-end odd:items-end md:self-center md:w-auto md:h-auto md:py-0 md:flex-none md:bg-transparent md:basis-3/10 md:justify-between md:items-center md:gap-4'>
    <img class='h-20 md:h-72' src={'/images/'+ name.toLowerCase() + (windowWidth >= 768 ? '.png' : '_logo.png')} alt='nijobs logo'/>
    <p class='font-raleway font-semibold text-gray-200 text-2xl md:text-white md:text-5xl'>{name}</p>
</div>