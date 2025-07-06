<script lang="ts">
    import { stringify } from "postcss";

  export let type: 'button' | 'submit' | 'reset' = 'button',
    selected: 'ativo' | 'inativo' = 'ativo',
    label : string,
    color1: keyof typeof colorList,
    color2: keyof typeof colorList,
    width: string,
    text1: string,
    text2: string;
  const colorList = {
    primary: { main: 'bg-muted-red-700'},
    secondary: { main: 'bg-muted-red-500'},
    red: { main: 'bg-red-500'},
    green: { main: 'bg-green-500'},
    blue: { main: 'bg-blue-500'}
  };
  
  let button1_color = color1;
  let button2_color = color2;
  function changeColor(button : keyof typeof colorList) {
    if(button !== color1){
      const temp = button1_color;
      button1_color = button2_color;
      button2_color = temp;
      selected = selected === 'ativo' ? 'inativo' : 'ativo';
    }
  }
</script>

<div class = "flex flex-col gap-5">
    <p>
        {label}
    </p>

    <div class="flex flex-row justify-evenly ">
        <button on:click={() => changeColor(button1_color)}
        {type}
        class="flex {colorList[button1_color]['main']} 
        ]} justify-center font-raleway font-bold text-white w-{width} min-w-0 rounded-lg px-4 py-2">
        <p class="px-5">{text1}</p>
        </button>

        <button on:click={() => changeColor(button2_color)}
        {type}
        class="flex {colorList[button2_color]['main']} 
        ]} justify-center font-raleway font-bold text-white w-{width} min-w-0 rounded-lg px-4 py-2">
        <p class="px-5">{text2}</p>
        </button>

    </div>

</div>