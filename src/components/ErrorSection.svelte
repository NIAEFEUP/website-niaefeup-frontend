<script lang="ts">
    export let align: string, heading: string, text: string;
</script>

<section class="flex flex-col text-white {align} break-normal gap-3">
    <h1 class="text-2xl md:text-5xl font-raleway font-bold">{heading}</h1>
    <h2 class="text-xl md:text-4xl font-medium">{text}</h2>
</section>