<script lang="ts">
  export let align: string, heading: string, text: string;
</script>

<section class="flex flex-col text-white {align} gap-3 break-normal">
  <h1 class="font-raleway text-2xl font-bold md:text-4xl 2xl:text-5xl">{heading}</h1>
  <h2 class="text-xl font-medium md:text-3xl 2xl:text-4xl">{text}</h2>
</section>
