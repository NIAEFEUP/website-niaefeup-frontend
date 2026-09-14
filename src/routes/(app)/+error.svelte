<script lang="ts">
  import ErrorPage from './_components/error/error-page.svelte';
  import { page } from '$app/state';
</script>

<ErrorPage
  status={page.status}
  title="Erro"
  heading="O que correu mal?"
  text={page.error?.message ?? 'Erro desconhecido'}
  buttonText="Voltar"
  buttonWidth="medium"
/>
