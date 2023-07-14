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
    <div class="mb-4 grid justify-center rounded-[15px] bg-secondary pl-8 px-10 py-10">
      <h1 class="self-start text-lightRed">Área Membro</h1>
        <input
          type="text"
          name="email"
          placeholder="email"
          bind:value={email}
          class="ml-4 my-6 rounded-[15px] bg-lightRed p-4 text-quaternary54 placeholder-quaternary54 drop-shadow-lg placeholder:capitalize"
        />
        <br />
        <VariableVisibilityInput
          name="password"
          placeholder="password"
          bind:value={password} iconColor="red"
          class="ml-4 rounded-[15px] bg-lightRed p-4 text-quaternary54 placeholder-quaternary54 drop-shadow-lg placeholder:capitalize"
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
