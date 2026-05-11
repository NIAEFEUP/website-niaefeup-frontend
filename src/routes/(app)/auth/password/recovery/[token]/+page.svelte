<script lang="ts">
  import type { PageData, ActionData } from './$types';
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import LabelInput from '$lib/components/forms/label-input.svelte';
  import Button from '$lib/components/buttons/button.svelte';
  import { createNotification } from '@/routes/(app)/_components/layout/notifications';

  let { data, form }: { data: PageData; form: ActionData } = $props();

  const token: string = data.token;

  let password = $state('');
  let confirmpassword = $state('');

  let loading = $state(false);
  let success = $state(false);
  let error = $state(false);

  let buttonText = $derived(
    success ? 'Enviado' : error ? 'Erro' : loading ? 'A enviar...' : 'Enviar'
  );

  $effect(() => {
    if (form?.success) {
      success = true;
      createNotification('Password atualizada com sucesso!');
      setTimeout(() => goto('/login'), 2000);
    } else if (form?.err) {
      error = true;
      createNotification(form.err);
      setTimeout(() => {
        error = false;
      }, 2000);
    }
  });
</script>

<section
  class="flex h-full w-full flex-col items-center justify-center font-raleway text-base font-[700] sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
>
  <form
    method="POST"
    action="?/submitRecovery"
    use:enhance={() => {
      if (loading) return ({ cancel }) => cancel();

      loading = true;
      error = false;
      success = false;

      return async ({ update, result }) => {
        loading = false;

        if (result.type === 'failure') {
          error = true;
        }

        await update();
      };
    }}
  >
    <div class="grid justify-center rounded-[15px] bg-muted-red-500 p-[5dvh] lg:min-w-[60%]">
      <div>
        <input type="text" name="username" autocomplete="username" class="hidden" />
        <h2>Nova Password</h2>
        <LabelInput
          type="password"
          autocomplete="new-password"
          name="password"
          bind:value={password}
          required={true}
        />
      </div>

      <div>
        <h2>Confirmar Password</h2>
        <LabelInput
          type="password"
          autocomplete="new-password"
          name="confirmpassword"
          bind:value={confirmpassword}
          required={true}
        />
      </div>

      <input type="hidden" name="token" value={token} />

      <Button
        type="submit"
        text={buttonText}
        color="primary"
        hoverColor="secondary"
        width="medium"
        disabled={loading || success}
      />
    </div>
  </form>
</section>
