<script lang="ts">
  import ErrorPage from './_components/error/error-page.svelte';
  import { page } from '$app/state';
</script>

<ErrorPage
  status={page.status}
  title="Error"
  heading="What went wrong?"
  text={page.error?.message ?? 'Unknown error'}
  buttonText="Voltar"
  buttonWidth="medium"
/>
