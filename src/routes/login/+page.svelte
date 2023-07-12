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
  class="absolute mx-auto flex h-full w-full flex-col items-center justify-center font-raleway font-[700]"
>
  <form on:submit={submitLogin} class="w-[600px]">
    <div class="mb-4 flex flex-col items-stretch justify-center rounded-[15px] bg-secondary p-8">
      <h1 class="self-start text-2xl text-lightRed">Área Membro</h1>

      <input
        type="text"
        name="email"
        placeholder="email"
        bind:value={email}
        class="mx-8 my-6 flex-grow rounded-[15px] bg-lightRed p-4 text-xl text-quaternary54 placeholder-quaternary54 drop-shadow-lg placeholder:capitalize"
      />
      <br />
      <VariableVisibilityInput
        name="password"
        placeholder="password"
        bind:value={password}
        class="mx-8 my-6 flex-grow rounded-[15px] bg-lightRed p-4 text-xl text-quaternary54 placeholder-quaternary54 drop-shadow-lg placeholder:capitalize"
      />
      <br />
    </div>
    <button type="submit" class="my-4 w-full rounded-[15px] bg-white p-4 text-2xl text-primary"
      >Iniciar Sessão</button
    >
    <br />
    <p>{message}</p>
    <br />
  </form>
</section>
