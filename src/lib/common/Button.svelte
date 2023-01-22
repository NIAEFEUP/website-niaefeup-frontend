<script lang="ts">
    export let color: string, hover: string, href: string, text: string, width: string;
</script>

<a href={href} class="flex {color} {hover} text-white justify-center font-raleway font-bold {width} min-w-0 m-auto py-2 px-4 rounded">
    <p class="px-5">{text}</p>
</a>