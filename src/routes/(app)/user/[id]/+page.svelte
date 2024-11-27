<script lang="ts">
  import Icon from '@/lib/components/icons/icon.svelte';
  import Icons from '@/lib/components/icons/icons';
</script>

<section>
  <div class="flex w-full justify-center px-4 sm:px-6 lg:px-8">
    <div class="flex w-4/5 flex-col content-center gap-y-4 md:gap-y-6 lg:w-3/4 xl:w-1/2">
      <div class="flex h-10 justify-end lg:h-10 xl:h-12">
        <div class="rounded-md bg-muted-red-500 p-3">
          <a href="https://www.lipsum.com/">
            <Icon src={Icons.Pencil} color="white" size="100%" />
          </a>
        </div>
      </div>
      <div class="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <img
          src="/images/default_profile_pic.png"
          alt="User pic"
          class="h-32 w-32 rounded-lg sm:h-52 sm:w-52"
        />
        <div class="flex flex-grow flex-col">
          <div class="mb-5 flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
            <h3 class="text-2xl font-bold lg:text-lg xl:text-xl 2xl:text-2xl">Vasco Guedes</h3>
            <div class="flex items-center rounded-2xl bg-green-200/20 px-5 py-2">
              <div class="mr-2 h-4 w-4 rounded-full bg-green-200"></div>
              <p class="text-sm font-semibold sm:text-base">Membro ativo</p>
            </div>
          </div>
          <p
            class="text-md lg:text-md mb-6 text-center sm:text-left sm:text-base xl:text-lg 2xl:text-xl"
          >
            No meu tempo livre gosto de perseguir arco-íris, porque alguém tem que encontrar o pote
            de ouro, certo?
          </p>
          <div class="flex justify-center gap-3 sm:justify-start">
            <div class="h-12 w-12 rounded-md bg-white/20 p-3 sm:h-14 sm:w-14 sm:p-4">
              <a href="https://www.lipsum.com/">
                <Icon src={Icons.Linkedin} color="white" size="100%" />
              </a>
            </div>
            <div class="h-12 w-12 rounded-md bg-white/20 p-3 sm:h-14 sm:w-14 sm:p-4">
              <a href="https://www.lipsum.com/">
                <Icon src={Icons.Linkedin} color="white" size="100%" />
              </a>
            </div>
            <div class="h-12 w-12 rounded-md bg-white/20 p-3 sm:h-14 sm:w-14 sm:p-4">
              <a href="https://www.lipsum.com/">
                <Icon src={Icons.Linkedin} color="white" size="100%" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
