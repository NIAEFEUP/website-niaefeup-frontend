<script lang="ts">
    export let type: "button" | "submit" | "reset" = "button", color: keyof typeof colorList, hoverColor: keyof typeof colorList, width: keyof typeof widthList, text: string;
    const colorList = {
        primary: { "main": "bg-primary", "hover": "hover:bg-primary" },
        secondary: { "main": "bg-secondary", "hover": "hover:bg-secondary" },
        red: { "main": "bg-red-500", "hover": "hover:bg-red-500" },
        green: { "main": "bg-green-500", "hover": "hover:bg-green-500" },
        blue: { "main": "bg-blue-500", "hover": "hover:bg-blue-500" },
    }
    const widthList = {
        small: "w-20",
        medium: "w-32",
        large: "w-52",
    }
</script>

<button type={type} class="flex {colorList[color]["main"]} {colorList[hoverColor]["hover"]} text-white justify-center font-raleway font-bold {widthList[width]} min-w-0 py-2 px-4 rounded">
    <p class="px-5">{text}</p>
</button>