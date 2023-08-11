<script lang="ts">
  import Icons from '$lib/component/Icons';
  import Select from '$lib/component/input/Select.svelte';
  import TextField from '$lib/component/input/TextField.svelte';
  import Title from '$lib/component/Title.svelte';

  const searchEvents = (e: SubmitEvent) => {
    console.log(new FormData(e.target as HTMLFormElement));
  };

  const filterOptions = [
    { value: 'sinf', label: 'SINF' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'dinner', label: 'Jantar de curso' }
  ];
  let filterValue = null;
</script>

<div class="my-20">
  <div class="flex justify-center">
    <Title title="Eventos" />
  </div>

  <form class="mt-10 flex flex-wrap justify-center" on:submit={searchEvents}>
    <TextField
      class="mx-5"
      beforeIcon={{ button: true, icon: Icons.Search, type: 'submit' }}
      name="search"
      placeholder="Search"
      value=""
    />

    <Select bind:value={filterValue} options={filterOptions} class="w-52" />
  </form>
</div>
