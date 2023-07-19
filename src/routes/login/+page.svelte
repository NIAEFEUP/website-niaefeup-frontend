<script lang="ts">
  import VariableVisibilityInput from '@/lib/component/VariableVisibilityInput.svelte';

  let email = '';
  let password = '';
  let message = '';

  async function submitLogin() {
    const success = await fetch('/api/auth/new', {
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

<section
  class="absolute mx-auto flex h-full w-full min-w-[40%] flex-col items-center justify-center font-raleway text-base font-[700] sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
>
  <form on:submit={submitLogin}>
    <div class="mb-4 grid justify-center rounded-[15px] bg-secondary px-10 py-10 pl-8">
      <h1 class="self-start text-lightRed">Área Membro</h1>
      <input
        type="text"
        name="email"
        placeholder="email"
        bind:value={email}
        class="my-6 ml-4 rounded-[15px] bg-lightRed p-4 text-sm text-quaternary54 placeholder-quaternary54 drop-shadow-lg placeholder:capitalize sm:text-sm lg:text-base xl:text-lg 2xl:text-xl"
      />
      <br />
      <VariableVisibilityInput
        name="password"
        placeholder="password"
        bind:value={password}
        class="ml-4 rounded-[15px] bg-lightRed p-4 text-sm text-quaternary54 placeholder-quaternary54 drop-shadow-lg placeholder:capitalize sm:text-sm lg:text-base xl:text-lg 2xl:text-xl"
      />
      <br />
    </div>
    <button type="submit" class="my-4 w-full rounded-[15px] bg-white p-4 text-primary"
      >Iniciar Sessão</button
    >
    <br />
    <p>{message}</p>
    <br />
  </form>
</section>
