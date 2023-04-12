<script>
  import Icon from '$lib/component/Icon.svelte';
  import FaBrandsInstagram from 'svelte-icons-pack/fa/FaBrandsInstagram';
  import FaBrandsTwitter from 'svelte-icons-pack/fa/FaBrandsTwitter';
  import FaBrandsFacebook from 'svelte-icons-pack/fa/FaBrandsFacebook';
  import FaBrandsGithub from 'svelte-icons-pack/fa/FaBrandsGithub';
  import IoMail from 'svelte-icons-pack/io/IoMail';
  import FaBrandsLinkedin from 'svelte-icons-pack/fa/FaBrandsLinkedin';
  import { copyToClipboard } from '$lib/utils';

  const coords = [
    [1, 1],
    [6, 3],
    [2, 5],
    [10, 6],
    [1, 8],
    [7, 8]
  ];
  const lines = [
    [0, 2],
    [2, 1],
    [1, 5],
    [5, 3],
    [2, 4]
  ];
  let innerWidth = 0;
  let coefficient = 8;
  const iconSize = 8;

  const socials = [
    { url: 'https://www.instagram.com/niaefeup/', icon: FaBrandsInstagram },
    { url: 'https://github.com/NIAEFEUP', icon: FaBrandsGithub },
    { url: 'https://www.facebook.com/NIAEFEUP', icon: FaBrandsFacebook },
    { url: 'ni@aefeup.pt', icon: IoMail },
    { url: 'https://www.linkedin.com/company/nifeup', icon: FaBrandsLinkedin },
    { url: 'https://twitter.com/niaefeup', icon: FaBrandsTwitter }
  ];
</script>

<svelte:window bind:innerWidth />

<svg style="height: 400px; min-width: 350px" viewBox="0 0 87 80" xmlns="http://www.w3.org/2000/svg">
  <!-- Draw graph edges. -->
  {#each lines as line}
    <line
      x1={coords[line[0]][0] * coefficient}
      y1={coords[line[0]][1] * coefficient}
      x2={coords[line[1]][0] * coefficient}
      y2={coords[line[1]][1] * coefficient}
      class="stroke-primary"
    />
  {/each}

  <!-- Draw graph nodes. -->
  {#each coords as coord, index}
    <foreignObject
      x={coord[0] * coefficient - (iconSize + 2) / 2}
      y={coord[1] * coefficient - (iconSize + 2) / 2}
      width={iconSize + 2}
      height={iconSize + 2}
    >
      {#if socials[index].url.slice(0, 5) == 'https'}
        <div class="flex h-full w-full items-center justify-center rounded bg-white bg-opacity-30">
          <Icon
            src={socials[index].icon}
            color="white"
            size={iconSize.toString()}
            href={socials[index].url}
          />
        </div>
      {:else}
        <div
          class="flex h-full w-full items-center justify-center rounded bg-white bg-opacity-30"
          on:click={() => copyToClipboard(socials[index].url)}
          on:keydown
        >
          <Icon src={socials[index].icon} color="white" size={iconSize.toString()} />
        </div>
      {/if}
    </foreignObject>
  {/each}
</svg>
