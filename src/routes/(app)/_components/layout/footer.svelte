<script lang="ts">
  import { onMount } from 'svelte';
  import { createNotification } from './notifications';
  import NotificationMessages from './notifications/notification-messages';
  import Icon from '$lib/components/icons/icon.svelte';
  import Icons from '$lib/components/icons/icons';

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
      const el = (e.currentTarget || e.target) as HTMLElement;
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

<div class="z-10 w-full bg-transparent p-3 sm:px-6">
  <footer
    class="flex flex-col justify-between gap-6 border-t-2 border-white/90 p-4 text-white sm:p-6 md:flex-row md:items-center"
  >
    <div class="flex max-w-3xl flex-col items-start gap-3 md:flex-row md:items-start md:gap-4">
      <a href="/" aria-label="Início" class="shrink-0">
        <img
          src="/images/ni_negative_logo.svg"
          alt="Logótipo do NIFEUP"
          class="mt-0.5 h-10 w-auto sm:h-11"
        />
      </a>
      <div class="flex flex-col gap-1.5">
        <p class="text-sm font-bold leading-snug sm:text-base">
          NIFEUP - Núcleo de Estudantes de Engenharia Informática da Faculdade de Engenharia da
          Universidade do Porto
        </p>
        <div
          class="flex flex-col gap-1 text-xs text-white/80 sm:text-sm md:flex-row md:items-center md:gap-0"
        >
          <p><span class="font-semibold text-white">NIPC:</span> 519696743</p>
          <span class="mx-1.5 hidden text-white/60 md:inline">&bull;</span>
          <p>
            <span class="font-semibold text-white">Morada:</span> B315, Rua Dr. Roberto Frias S/N, 4200-465,
            Porto, Portugal
          </p>
        </div>
      </div>
    </div>

    <div class="footer-icons flex flex-wrap items-center gap-4 shrink-0 md:grid md:grid-cols-3">
      <Icon
        src={Icons.Instagram}
        color="white"
        size="24px"
        href="https://www.instagram.com/ni.feup/"
        ariaLabel="Instagram"
      />
      <Icon
        src={Icons.Twitter}
        color="white"
        size="24px"
        href="https://twitter.com/nifeup"
        ariaLabel="Twitter"
      />
      <Icon
        src={Icons.TikTok}
        color="white"
        size="24px"
        href="https://www.tiktok.com/@niaefeup"
        ariaLabel="TikTok"
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
        onclick={() => copyToClipboard('geral@nifeup.com')}
        aria-label="Email"
        onkeydown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // Prevent scrolling on space
            copyToClipboard('geral@nifeup.com');
          }
        }}
        class="cursor-pointer"
      >
        <Icon src={Icons.Mail} color="white" size="24px" />
      </div>
    </div>
  </footer>
</div>
