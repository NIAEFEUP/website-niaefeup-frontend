<script lang="ts">
    import type { PageData } from './$types';
    import type { Account } from '@/types/account';
    import FormsHeader from '$lib/components/forms-header.svelte';
    import LabelInput from '$lib/components/forms/label-input.svelte';
    import PictureInput from '$lib/components/forms/picture-input.svelte';
    import Button from '$lib/components/buttons/button.svelte';
    import RadioButton from '$lib/components/forms/radio-buttons.svelte';

    export let data: PageData;
    export let account: Account = data.account;

    function toISOLocal(date: string): string {
        const parts = date.match(/(\d+)/g);
        if (!parts || parts.length < 5) return "";
        const adate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]), Number(parts[3]), Number(parts[4]));
        const localdt = new Date(adate.getTime() - adate.getTimezoneOffset() * 60000);
        return localdt.toISOString().slice(0, -1);
    }
</script>

{#await account}
  <p>...waiting</p>
{:then account}
<div class="flex flex-col gap-10">
    <FormsHeader label="Informações Pessoais"/>

    <form method="POST" enctype="multipart/form-data" class="flex md:flex-row md:justify-around flex-col">

        <div class="flex flex-col order-2 md:order-1 ml-5 mr-5 gap-5">
            <LabelInput label="Nome" placeholder="John Doe" value={account.name} textGap={30} />

            <RadioButton label="Is Active" options={["Ativo", "Inativo"]} selected={account.isActive ? "Ativo" : "Inativo"} />

            <LabelInput label="Email" placeholder="Insira o Texto" value={account.email} textGap={30} />
            
            <LabelInput label="Birth Date" type="datetime-local" value={toISOLocal(account.birthDate)} textGap={30} />
            
            <LabelInput label="Linkedin" placeholder="Insira o Texto" value={account.linkedin} textGap={30} />
            
            {#each account.websites as website, index}
            <LabelInput label="Website {index+1} Name" placeholder="Insira o Texto" value={website.label ? website.label : ""} />

            <LabelInput label="Website {index+1} Url" placeholder="Insira o Texto" value={website.url ? website.url : ""} />

            <LabelInput label="Website {index+1} Icon" placeholder="Insira o Texto" value={website.iconPath ? website.iconPath : ""} />
            {/each}

            <LabelInput label="Github" placeholder="Insira o Texto" value={account.github} textGap={30} />

            <LabelInput label="Bio" placeholder="Insira o Texto" isTextArea={true} value={account.bio} textGap={30} />
            
            <Button type="submit" color="primary" hoverColor="primary" width="large" text="Guardar Alterações" />
        </div>

        <div class="flex flex-col order-1 md:order-2 items-center mt-5">
            <PictureInput text="Foto de perfil" name="photo" required={true} source={account.photo} />
            
            <Button color="primary" hoverColor="primary" width="large" text="Alterar Senha" />
        </div>
    </form>
</div>
{/await}