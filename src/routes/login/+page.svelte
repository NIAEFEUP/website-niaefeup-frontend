<script lang="ts">
  import VariableVisibilityInput from '@/lib/component/VariableVisibilityInput.svelte';

  let email = '';
  let password = '';
  let message = '';

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
  }
</script>

<!-- Colocar a página toda scrollable incluindo footer, ver container queries -->

<section
  class="flex w-full flex-col items-center justify-center font-raleway text-base font-[700] sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
>
  <form on:submit={submitLogin}>
    <div class="grid justify-center rounded-[15px] bg-muted-red-500 p-[5dvh] lg:min-w-[60%]">
      <h1 class="text-taupe-100">Área Membro</h1>
      <input
        type="text"
        name="email"
        placeholder="email"
        bind:value={email}
        class="my-[2dvh] rounded-[15px] bg-taupe-100 p-[2dvh] text-sm text-rose-950/[.54] placeholder-rose-950/[.54] drop-shadow-lg placeholder:capitalize sm:text-sm lg:text-base xl:text-lg 2xl:text-xl"
      />
      <br />
      <VariableVisibilityInput
        name="password"
        placeholder="password"
        bind:value={password}
        class="rounded-[15px] bg-taupe-100 p-[2dvh] text-sm text-rose-950/[.54] placeholder-rose-950/[.54] drop-shadow-lg placeholder:capitalize sm:text-sm lg:text-base xl:text-lg 2xl:text-xl"
      />
      <br />
    </div>
    <button
      type="submit"
      class="z-20 my-4 w-full rounded-[15px] bg-taupe-100 p-[2dvh] text-muted-red-700"
      >Iniciar Sessão</button
    >
    <br />
    <p>{message}</p>
    <br />
  </form>
</section>
