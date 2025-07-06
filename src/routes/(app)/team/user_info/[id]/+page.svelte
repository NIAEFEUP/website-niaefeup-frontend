<script lang="ts">
    import FormsHeader from '$lib/components/forms-header.svelte';
    import LabelInput from '$lib/components/forms/label-input.svelte';
    import PictureInput from '$lib/components/forms/picture-input.svelte';
    import Button from '$lib/components/buttons/button.svelte';
    import Estatute from '../../_components/switch_color_button.svelte';
    import { LucideTableRowsSplit } from 'lucide-svelte';
    let selectedStatus: 'ativo' | 'inativo' = 'ativo';
</script>

<div class = "flex flex-col gap-10">
    <FormsHeader label="Informações Pessoais"/>

    <div class = "flex flex-row justify-evenly">
        
        <div class = "flex flex-col">

            <PictureInput text = "Foto de perfil" name="image" required = {true} />
            
            <Button color = "primary" hoverColor = "primary" width = "large" text = "Alterar Senha" />

        </div>

        <div class = "flex flex-col gap-5">

            <div class = "flex flex-row gap-12">
                <LabelInput label = "Primeiro Nome" placeholder = "John"/>

                <LabelInput label = "Último Nome" placeholder = "Doe"/>

            </div>
            
            <Estatute label = "Estatuto" color1 = "primary" color2 = "secondary" width="large" text1 = "Membro Ativo" text2 = "Membro Inativo" gap = "20" bind:selected={selectedStatus}/>

        </div>

    </div>

</div>