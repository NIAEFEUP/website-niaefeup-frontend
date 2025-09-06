<script lang="ts">
  import VariableVisibilityInput from './_components/variable-visibility-input.svelte';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';

  let email = $state('');
  let password = $state('');
  let message = $state('');

  async function submitLogin() {
    const success = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then((res) => res.ok);

    message = success ? 'Login successful' : 'Login failed';
    if (success == true) {
      goto(resolve('/'));
    }
  }
</script>

<section
  class="font-raleway flex h-full w-full flex-col items-center justify-center text-base font-bold sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
>
  <form method="POST" action="">
    <div class="bg-muted-red-500 grid justify-center rounded-[15px] p-[5dvh] lg:min-w-[60%]">
      <h1 class="text-taupe-100">Área Membro</h1>
      <input
        type="text"
        name="email"
        placeholder="email"
        bind:value={email}
        class="bg-taupe-100 my-[2dvh] rounded-[15px] p-[2dvh] text-sm text-rose-950/54 placeholder-rose-950/54 drop-shadow-lg placeholder:capitalize sm:text-sm lg:text-base xl:text-lg 2xl:text-xl"
      />
      <br />
      <VariableVisibilityInput
        name="password"
        placeholder="password"
        bind:value={password}
        class="bg-taupe-100 rounded-[15px] p-[2dvh] text-sm text-rose-950/54 placeholder-rose-950/54 drop-shadow-lg placeholder:capitalize sm:text-sm lg:text-base xl:text-lg 2xl:text-xl"
      />
      <br />
    </div>
    <button
      type="button"
      class="bg-taupe-100 text-muted-red-700 z-20 my-4 w-full rounded-[15px] p-[2dvh]"
      onclick={submitLogin}>Iniciar Sessão</button
    >
    <br />
    <p class="h-[2dvh] text-center">{message}</p>
    <br />
  </form>
</section>
