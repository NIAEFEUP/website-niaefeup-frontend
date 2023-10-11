<script lang="ts">
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

<form on:submit={submitLogin}>
  <input type="text" name="email" placeholder="email" bind:value={email} />
  <br />
  <input type="password" name="password" placeholder="password" bind:value={password} />
  <br />
  <button type="submit">Login</button>
  <br />
  <p>{message}</p>
  <br />
  <button><a href="/profile">Profile</a></button>
</form>
