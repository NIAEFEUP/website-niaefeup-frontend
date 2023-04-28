<script lang="ts">
    import Icons from "$lib/component/Icons";
  import TextField from "$lib/component/input/TextField.svelte";
  import Title from "$lib/component/Title.svelte";

  const searchEvents = (e: SubmitEvent) => {
    console.log(new FormData(e.target as HTMLFormElement))
  }

</script>

<div class="my-20">
    <div class="flex justify-center">
        <Title title="Eventos" />
    </div>

    <form class="flex flex-wrap justify-around mt-10" on:submit={searchEvents}>
        <TextField
            beforeIcon={{button: true, icon: Icons.Search, type: "submit"}}
            name="search"
            placeholder="Search"
            value=""
        />
    </form>
</div>
