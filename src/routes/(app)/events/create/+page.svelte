
<script>
    import PictureInput from '$lib/components/forms/picture-input.svelte';
    import LabelInput from '$lib/components/forms/label-input.svelte';
</script>



<div>
    
    <div class="flex flex-row">
        <p class="font-bold text-5xl ml-11">
            Novo Evento
        </p>
    </div>

    <div class="my-8 mx-auto w-[97%] h-1 bg-red-500"></div>

    <div class="flex flex-row">

        <div class="flex flex-col gap-10 ml-60 mr-40 mt-10 font-semibold">
            
            <LabelInput label = "Título*" id = "caixa de texto1" type = "text" placeholder = "Insira o texto" isTextArea = {false} horizontal = {true}/>
            <LabelInput label = "Data / Hora*" id = "caixa de texto2" type = "text" placeholder = "Insira o texto" isTextArea = {false} horizontal = {true}/>
            <LabelInput label = "Localização*" id = "caixa de texto3" type = "text" placeholder = "Insira o texto" isTextArea = {false} horizontal = {true}/>
            <LabelInput label = "Descrição" id = "caixa de texto4" type = "text" placeholder = "Insira o texto" isTextArea = {false} horizontal = {true}/>
            <LabelInput label = "Inscrição" id = "caixa de texto5" type = "text" placeholder = "Insira o texto" isTextArea = {false} horizontal = {true}/>
            <div class = "flex flex-row mt-5 gap-16">
                <div class="w-48 h-10 bg-red-400 rounded-lg flex items-center justify-center font-semibold">Selecionar Ficheiros</div>
                <p class = "font-semibold flex items-center justify-center">Nenhum Ficheiro Selecionado</p>
            </div>
            <div class="w-48 h-12 bg-red-500 rounded-lg flex items-center justify-center font-bold">Guardar Alterações</div>
        </div>

        <div class="flex flex-col ml-80 mt-20">
            <PictureInput text="Insira a Imagem" name="Profile Picture"/>
        </div>
    </div>
</div>