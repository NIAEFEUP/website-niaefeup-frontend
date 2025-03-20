
<script>
    import PictureInput from '$lib/components/forms/picture-input.svelte';
    import LabelInput from '$lib/components/forms/label-input.svelte';
    import Button from '$lib/components/button.svelte';
    import Header from '$lib/components/header.svelte';
</script>



<div class="h-full flex flex-col">
    
    <Header label = 'Novo Evento'/>

    <div class="flex flex-col md:flex-row justify-around flex-grow w-[100]">

        <form method="POST" class="flex flex-col font-semibold justify-center content-start ml-5 gap-10 order-2 md:order-1">
            
            <LabelInput label = "Título" id = "caixa de texto1" type = "text" placeholder = "Insira o texto" required horizontal textGap = 25 className="flex-col ml-5 mr-5 md:flex-row md:ml-0 md:mr-0"/>
            <LabelInput label = "Data/Hora" id = "caixa de texto2" type = "date" placeholder = "Insira o texto" required horizontal textGap = 25 className="flex-col ml-5 mr-5 md:flex-row md:ml-0 md:mr-0"/>
            <LabelInput label = "Descrição" id = "caixa de texto3" type = "text" placeholder = "Insira o texto" required horizontal textGap = 25 className="flex-col ml-5 mr-5 md:flex-row md:ml-0 md:mr-0"/>
            <LabelInput label = "Inscrição" id = "caixa de texto4" type = "text" placeholder = "Insira o texto" required horizontal textGap = 25 className="flex-col ml-5 mr-5 md:flex-row md:ml-0 md:mr-0"/>
            <LabelInput label = "Localização" id = "caixa de texto5" type = "text" placeholder = "Insira o texto" horizontal textGap = 25 className="flex-col ml-5 mr-5 md:flex-row md:ml-0 md:mr-0"/>
            <div class = "flex flex-row gap-16 ml-5 mr-5 md:flex-row md:ml-0">
                <Button type = "button" color = "primary" hoverColor = "secondary" width = "large" text = "Selecionar Ficheiros"/>
                <p class = "font-semibold flex items-center justify-center">Nenhum Ficheiro Selecionado</p>
            </div>
            <div class = "flex flex-row ml-5 mr-5 md:ml-0">
                <Button type = "submit" color = "primary" hoverColor = "primary" width = "large" text = "Guardar Alterações"/>
            </div>
        </form>

        <div class="flex flex-col align-top mt-20 order-1 md:order-2 ">
            <PictureInput text="Insira a Imagem" name="Profile Picture"/>
        </div>
    </div>
</div>