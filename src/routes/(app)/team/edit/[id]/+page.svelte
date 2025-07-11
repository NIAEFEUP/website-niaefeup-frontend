<script lang="ts">
    import FormsHeader from '$lib/components/forms-header.svelte';
    import LabelInput from '$lib/components/forms/label-input.svelte';
    import PictureInput from '$lib/components/forms/picture-input.svelte';
    import Button from '$lib/components/buttons/button.svelte';
    import RadioButton from '$lib/components/forms/radio-buttons.svelte';
</script>

<div class = "flex flex-col gap-10">
    <FormsHeader label="Informações Pessoais"/>

    <form
        method="POST"
        enctype="multipart/form-data"
        class="flex md:flex-row md:justify-evenly flex-col"
    >
            
        <div class = "flex flex-col order-1 items-center">

            <PictureInput text = "Foto de perfil" name="image" required = {true} />

            <Button color = "primary" hoverColor = "primary" width = "large" text = "Alterar Senha" />

        </div>

        <div class = "flex flex-col order-2 ml-5 mr-5 gap-5">

            <div class = "flex flex-col  md:flex-row gap-12 justify-evenly">

                <LabelInput label = "Primeiro Nome" placeholder = "John"/>

                <LabelInput label = "Último Nome" placeholder = "Doe"/>

            </div>

            <RadioButton label = "Estatuto" options = {["Ativo", "Inativo"]} selected = "Ativo" />

            <LabelInput label = "Linkdin" placeholder = "Insira o Texto"/>

            <LabelInput label = "Instagram" placeholder = "Insira o Texto"/>

            <LabelInput label = "Website" placeholder = "Insira o Texto"/>

            <LabelInput label = "Github" placeholder = "Insira o Texto"/>

            <LabelInput label = "Bio" placeholder = "Insira o Texto" isTextArea = {true}/>

            <Button
                type="submit"
                color="primary"
                hoverColor="primary"
                width="large"
                text="Guardar Alterações"
                />

        </div>

    </form>

</div>