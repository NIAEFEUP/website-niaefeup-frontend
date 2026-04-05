<script lang="ts">
    import LabelInput from '$lib/components/forms/label-input.svelte';
    import { enhance } from '$app/forms';
     interface FailedAccount {
        nome: string;
        email: string;
        errorMsg: string;
    }

    interface CreateAccountsResult {
        success: boolean;
        parseErrors: string[];
        results: { nome: string; email: string; success: boolean }[];
        failed: FailedAccount[];
    }


    let parseErrors = $state<string[]>([]);
    let failedAccounts = $state<FailedAccount[]>([]);
    let successCount = $state(0);

</script>

<section class="flex w-full flex-col gap-4">
    <form class="flex flex-col w-full" 
        method="POST"
        action="?/createAccounts"
        use:enhance={() => {
            parseErrors = [];
            failedAccounts = [];
            successCount = 0;

            return async ({ result, update }) => {
            await update();

                if (result.type === 'success' && result.data) {
                    const data = result.data as unknown as CreateAccountsResult;
                    parseErrors = data.parseErrors ?? [];
                    failedAccounts = data.failed ?? [];
                    successCount = (data.results ?? []).filter(r => r.success).length;
                } else {
                    parseErrors = ['Erro inesperado ao processar o CSV.'];
                }
            };
        }}>
        <LabelInput
            label="CSV text"
            id="csv"
            name="csv"
            isTextArea={true}
            placeholder="Copia aqui o CSV..."
            required={true}
            minlength={10}
            class="rounded-lg bg-white px-4 py-3 text-black"
        />
        <button
            type="submit"
            class="rounded-xl bg-muted-red-700 p-4 text-lg text-white shadow-xl"
        >
            Criar Contas
        </button>
    </form>
    {#if successCount > 0}
        <p class="text-green-500"> {successCount} conta(s) criada(s) com sucesso!</p>
    {/if}

    {#if parseErrors.length > 0}
        <div class="w-full rounded-xl bg-red-900/40 p-4">
            <p class="font-bold text-red-400"> Erros no CSV:</p>
            <ul class="mt-2 list-disc pl-4 text-red-400">
                {#each parseErrors as err}
                    <li>{err}</li>
                {/each}
            </ul>
        </div>
    {/if}
    {#if failedAccounts.length > 0}
        <div class="w-full rounded-xl bg-red-900/40 p-4">
            <p class="font-bold text-red-400"> Contas que falharam:</p>
            <ul class="mt-2 list-disc pl-4 text-red-400">
                {#each failedAccounts as account}
                    <li>{account.nome} ({account.email}) — {account.errorMsg}</li>
                {/each}
            </ul>
        </div>
    {/if}
  
    
</section> 

