<script lang="ts">
  import ErrorSection from './error-section.svelte';
  import Button from '@/lib/components/buttons/button.svelte';

  interface Props {
    status: string | number;
    title: string;
    heading: string;
    text: string;
    buttonText: string;
    buttonWidth: 'small' | 'medium' | 'large';
  }

  let { status, title, heading, text, buttonText, buttonWidth = 'medium' }: Props = $props();
</script>

<main class="mx-10 my-20 flex flex-col justify-center gap-20 font-source_code">
  <section class="flex flex-col gap-10 break-normal text-center text-white">
    <h1 class="text-7xl font-extrabold 2xl:text-huge">{status}</h1>
    <h2 class="text-3xl font-semibold md:text-4xl 2xl:text-6xl">{title}</h2>
  </section>
  <ErrorSection align="text-center" {heading} {text} />
  <form class="m-auto" method="GET" action="/">
    <Button
      type="submit"
      color="primary"
      hoverColor="secondary"
      text={buttonText}
      width={buttonWidth}
    />
  </form>
</main>
