<script lang="ts">
    let windowWidth: number;

    export let
        name: string;
    const colorList = {
        nijobs: {
            background: 'bg-[#9c342f]',
            text: 'text-gray-200'
        },
        uni: {
            background:'bg-[#521015]',
            text: 'text-gray-200'
        },
        tts: {
            background: 'bg-[#A8A8A8]',
            text: 'text-gray-900'
        }
    };
</script>

<svelte:window bind:innerWidth={windowWidth}></svelte:window>

<div class='{colorList[name.toLowerCase()].background} h-44 w-4/5 rounded-xl flex flex-col justify-center
    {windowWidth < 768 ? 'odd:self-start even:self-end odd:items-end even:items-start' : null}
    md:self-center md:w-auto md:h-auto md:flex-none md:bg-transparent '>
    <div class='flex flex-col items-center py-3 px-4 -mb-3 mx-5 gap-1
                md:justify-between md:px-0 md:py-0 md:gap-4 md:basis-3/10'>
        <img class='h-20 shadow-lg rounded-xl md:shadow-none md:h-72' src={'/images/'+ name.toLowerCase() + (windowWidth >= 768 ? '.png' : '_logo.png')} alt='nijobs logo'/>
        <p class='font-raleway font-semibold text-2xl {colorList[name.toLowerCase()].text}
                  md:text-white md:text-5xl'>{name}</p>
    </div>
</div>