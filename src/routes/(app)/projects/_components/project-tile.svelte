<script lang="ts">
  let windowWidth: number;

  export let name: string;
  const colorList = {
    nijobs: {
      background: 'bg-[#9c342f]',
      text: 'text-gray-200'
    },
    uni: {
      background: 'bg-[#521015]',
      text: 'text-gray-200'
    },
    tts: {
      background: 'bg-[#A8A8A8]',
      text: 'text-gray-900'
    }
  };
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div
  class="{colorList[name.toLowerCase()]
    .background} flex h-44 w-4/5 flex-col justify-center rounded-xl
    {windowWidth < 768 ? 'odd:items-end odd:self-start even:items-start even:self-end' : null}
    md:h-auto md:w-auto md:flex-none md:self-center md:bg-transparent"
>
  <div
    class="md:basis-3/10 mx-5 -mb-3 flex flex-col items-center gap-1 px-4
                py-3 md:justify-between md:gap-4 md:px-0 md:py-0"
  >
    <img
      class="h-20 rounded-xl shadow-lg md:h-72 md:shadow-none"
      src={'/images/projects/' + name.toLowerCase() + (windowWidth >= 768 ? '.png' : '_logo.png')}
      alt="nijobs logo"
    />
    <p
      class="font-raleway text-2xl font-semibold {colorList[name.toLowerCase()].text}
                  md:text-5xl md:text-white"
    >
      {name}
    </p>
  </div>
</div>
