<script>
    import FormsHeader from '$lib/components/forms-header.svelte';
    import LabelInput from '$lib/components/forms/label-input.svelte';
    import PictureInput from '$lib/components/forms/picture-input.svelte';
    import Button from '$lib/components/buttons/button.svelte';
</script>

<div class = "flex flex-col gap-10">
    <FormsHeader label="Informações Pessoais"/>

    <div class = "flex flex-row justify-around">
        
        <div class = "flex flex-col">

            <PictureInput text = "Foto de perfil" name="image" required = {true} />
        
            <Button/>
        </div>

    </div>

</div>