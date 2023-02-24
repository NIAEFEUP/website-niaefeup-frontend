<script lang="ts">
  import Icon from '$lib/component/Icon.svelte';
  import Icons from '$lib/component/Icons';

  function copyToClipboard(content: string) {
    navigator.clipboard.writeText(content);
  }
</script>

<div class="w-full bg-transparent p-3 max-sm:hidden z-10">
  <footer class="p-2 text-white grid grid-cols-3 justify-between border-t-2 border-secondary">
    <div class="flex p-3 self-center gap-3">
      <Icon
        src={Icons.Instagram}
        color="white"
        size="24px"
        href="https://www.instagram.com/niaefeup/"
      />
      <Icon src={Icons.Twitter} color="white" size="24px" href="https://twitter.com/niaefeup" />
      <Icon
        src={Icons.Facebook}
        color="white"
        size="24px"
        href="https://www.facebook.com/NIAEFEUP"
      />
      <Icon src={Icons.Github} color="white" size="24px" href="https://github.com/NIAEFEUP" />
      <Icon
        src={Icons.Linkedin}
        color="white"
        size="24px"
        href="https://www.linkedin.com/company/nifeup"
      />
      <div on:click={() => copyToClipboard('ni@aefeup.pt')} on:keydown class="cursor-pointer">
        <Icon src={Icons.Mail} color="white" size="24px" href={undefined} />
      </div>
    </div>
    <div class="flex flex-col items-center gap-1">
      <img src="/images/ni_negative_logo.svg" alt="NIAFEUP logo" class="w-11 h-auto" />
      <p class="text-sm">NIAEFEUP &copy; 2022</p>
    </div>
    <div class="flex flex-row justify-end p-3 self-center items-center gap-4">
      <a
        href="/#"
        class="grid grid-cols-[1fr_fit-content(100%)] items-center gap-3 bg-tertiary60 rounded-md"
      >
        <p class="pl-2 font-source-code text-sm w-full">Área Membro</p>
        <div class="bg-tertiary rounded-md pt-1 px-1">
          <Icon src={Icons.User} color="#411315" size="32px" href={undefined} />
        </div>
      </a>
      <div class="text-sm text-right">
        <p class="font-bold">FEUP</p>
        <p>Sala B315</p>
      </div>
    </div>
  </footer>
</div>

<div class="hidden w-full bg-transparent p-3 max-sm:block">
  <footer class="p-2 text-white flex flex-col justify-between border-t-2 text-sm border-secondary">
    <div class="flex flex-row p-3 self-center justify-between w-full items-center">
      <span>NIAEFEUP</span>
      <img src="/images/ni_negative_logo.svg" alt="NIAFEUP logo" class="w-11 h-auto" />
      <div class="flex flex-row gap-1">
        <span class="font-bold">FEUP</span>
        <span>B315</span>
      </div>
    </div>
    <div class="grid grid-cols-3 grid-rows-2 items-center px-6 gap-4 py-5 justify-items-center">
      <Icon
        src={Icons.Instagram}
        color="white"
        size="24px"
        href="https://www.instagram.com/niaefeup/"
      />
      <Icon src={Icons.Twitter} color="white" size="24px" href="https://twitter.com/niaefeup" />
      <Icon
        src={Icons.Facebook}
        color="white"
        size="24px"
        href="https://www.facebook.com/NIAEFEUP"
      />
      <Icon src={Icons.Github} color="white" size="24px" href="https://github.com/NIAEFEUP" />
      <Icon
        src={Icons.Linkedin}
        color="white"
        size="24px"
        href="https://www.linkedin.com/company/nifeup"
      />
      <div on:click={() => copyToClipboard('ni@aefeup.pt')} on:keydown class="cursor-pointer">
        <Icon src={Icons.Mail} color="white" size="24px" href={undefined} />
      </div>
    </div>
    <div class="flex flex-row justify-end p-3 self-center items-center gap-4">
      <a
        href="/#"
        class="grid grid-cols-[fit-content(100%)_1fr] items-center gap-3 bg-tertiary60 rounded-md"
      >
        <div class="bg-tertiary rounded-md pt-1 px-1">
          <Icon src={Icons.User} color="#411315" size="32px" href={undefined} />
        </div>
        <p class="pr-2 font-source-code text-sm w-full">Área Membro</p>
      </a>
    </div>
  </footer>
</div>
