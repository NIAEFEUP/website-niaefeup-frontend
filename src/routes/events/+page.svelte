<script lang="ts">
    import Title from "$lib/component/Title.svelte";

  export let data: { info: string };
  let logoutMessage = '';

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

<div class="my-20">
    <div class="flex justify-center">
        <Title title="Eventos" />
    </div>
</div>
