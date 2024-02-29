<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from '$lib/component/Icon.svelte';
  import Icons from '$lib/component/Icons';
  import MemberButton from '$lib/layout/MemberButton.svelte';
  import { createNotification } from '$lib/notifications';
  import NotificationMessages from '$lib/notifications/NotificationMessages';

  function copyToClipboard(content: string) {
    navigator.clipboard.writeText(content);
    createNotification(NotificationMessages.COPY_EMAIL);
  }

  const iconHoverOpacity = (
    icon: Element,
    icons: HTMLCollection,
    action: string,
    op_icon: string,
    op_rest: string
  ) => {
    icon.addEventListener(action, (e) => {
      const el = e.target as HTMLElement;
      el.style.opacity = op_icon;
      [...icons]
        .filter((e) => e !== el)
        .map((e) => {
          (e as HTMLElement).style.opacity = op_rest;
        });
    });
  };

  onMount(() => {
    const iconsContainer: NodeListOf<Element> | null = document.querySelectorAll('.footer-icons');
    iconsContainer?.forEach((container) => {
      const icons: HTMLCollection = container.children;

      for (let i of icons) {
        iconHoverOpacity(i, icons, 'mouseover', '1.0', '0.5');
        iconHoverOpacity(i, icons, 'mouseleave', '1.0', '1.0');
      }
    });
  });
</script>

<div class="z-10 w-full bg-transparent p-3 max-sm:hidden">
  <footer class="grid grid-cols-3 justify-between border-t-2 border-muted-red-500 p-2 text-white">
    <div class="footer-icons grid w-fit grid-cols-6 gap-4 self-center p-3">
      <Icon
        src={Icons.Instagram}
        color="white"
        size="24px"
        href="https://www.instagram.com/niaefeup/"
        ariaLabel="Instagram"
      />
      <Icon
        src={Icons.Twitter}
        color="white"
        size="24px"
        href="https://twitter.com/niaefeup"
        ariaLabel="Twitter"
      />
      <Icon
        src={Icons.Facebook}
        color="white"
        size="24px"
        href="https://www.facebook.com/NIAEFEUP"
        ariaLabel="Facebook"
      />
      <Icon
        src={Icons.Github}
        color="white"
        size="24px"
        href="https://github.com/NIAEFEUP"
        ariaLabel="Github"
      />
      <Icon
        src={Icons.Linkedin}
        color="white"
        size="24px"
        href="https://www.linkedin.com/company/nifeup"
        ariaLabel="Linkedin"
      />
      <div
        data-testid="email-icon"
        role="button"
        tabindex="0"
        on:click={() => copyToClipboard('ni@aefeup.pt')}
        on:keydown
        class="cursor-pointer"
      >
        <Icon src={Icons.Mail} color="white" size="24px" />
      </div>
    </div>
    <div class="flex flex-col items-center gap-1">
      <img src="/images/ni_negative_logo.svg" alt="NIAFEUP logo" class="h-auto w-11" />
      <p class="text-sm">NIAEFEUP &copy; 2022</p>
    </div>
    <div class="flex flex-row items-center justify-end gap-4 self-center p-3">
      <MemberButton />
      <div class="text-right text-sm">
        <p class="font-bold">FEUP</p>
        <p>Sala B315</p>
      </div>
    </div>
  </footer>
</div>

<div class="hidden w-full bg-transparent p-3 max-sm:block">
  <footer
    class="flex flex-col justify-between border-t-2 border-muted-red-500 p-2 text-sm text-white"
  >
    <div class="flex w-full flex-row items-center justify-between self-center p-3">
      <span>NIAEFEUP</span>
      <img src="/images/ni_negative_logo.svg" alt="NIAFEUP logo" class="h-auto w-11" />
      <div class="flex flex-row gap-1">
        <span class="font-bold">FEUP</span>
        <span>B315</span>
      </div>
    </div>
    <div
      class="footer-icons grid grid-cols-3 grid-rows-2 items-center justify-items-center gap-4 px-6 py-5"
    >
      <Icon
        src={Icons.Instagram}
        color="white"
        size="24px"
        href="https://www.instagram.com/niaefeup/"
        ariaLabel="Instagram"
      />
      <Icon
        src={Icons.Twitter}
        color="white"
        size="24px"
        href="https://twitter.com/niaefeup"
        ariaLabel="Twitter"
      />
      <Icon
        src={Icons.Facebook}
        color="white"
        size="24px"
        href="https://www.facebook.com/NIAEFEUP"
        ariaLabel="Facebook"
      />
      <Icon
        src={Icons.Github}
        color="white"
        size="24px"
        href="https://github.com/NIAEFEUP"
        ariaLabel="Github"
      />
      <Icon
        src={Icons.Linkedin}
        color="white"
        size="24px"
        href="https://www.linkedin.com/company/nifeup"
        ariaLabel="Linkedin"
      />
      <div
        role="button"
        tabindex="0"
        on:click={() => copyToClipboard('ni@aefeup.pt')}
        on:keydown
        class="cursor-pointer"
      >
        <Icon src={Icons.Mail} color="white" size="24px" />
      </div>
    </div>
    <div class="flex flex-row items-center justify-end gap-4 self-center p-3">
      <MemberButton />
    </div>
  </footer>
</div>
