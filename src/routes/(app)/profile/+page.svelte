<script lang="ts">
  interface Props {
    data: { info: string };
  }

  let { data }: Props = $props();
  let logoutMessage = $state('');

  async function logout() {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    logoutMessage = response.ok ? 'Logout successful' : 'Logout failed';
  }
</script>

<div>
  <h1>Profile</h1>
  <p>{data.info}</p>
  <br />
  <button onclick={() => logout()}>Logout</button>
  <p>{logoutMessage}</p>
  <br />
  <button><a href="/login">Login</a></button>
</div>
