<script lang="ts">
  import { login } from '$lib/network';
  let email = '';
  let password = '';
  let message = '';

  async function submitLogin() {
    const success = await login(email, password);
    message = success ? 'Login successful' : 'Login failed';
  }
</script>

<form on:submit={submitLogin}>
  <input type="text" name="email" placeholder="email" bind:value={email} />
  <br />
  <input type="password" name="password" placeholder="password" bind:value={password} />
  <br />
  <button type="submit">Login</button>
  <br />
  <p>{message}</p>
</form>
